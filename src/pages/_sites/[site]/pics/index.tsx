// Import necessary modules...
import { useEffect } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Script from 'next/script';
import Modal from '../../../../components/Modal';
import cloudinary from '../../../../utils/cloudinary';
import getBase64ImageUrl from '../../../../utils/generateBlurPlaceholder';
import { getSiteWorkspace, getWorkspacePaths } from '../../../../../prisma/services/workspace';
import { useLastViewedPhoto } from '../../../../utils/useLastViewedPhoto';
import type { ImageProps } from '../../../../utils/types';

export const getStaticPaths = async () => {
  const paths = await getWorkspacePaths();
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async ({ params }) => {
  const { site } = params;
  const siteWorkspace = await getSiteWorkspace(site, site.includes('.'));
  const results = await cloudinary.v2.search
    .expression(`folder:${siteWorkspace.slug}/*`)
    .sort_by('public_id', 'desc')
    .max_results(1000)
    .execute();

  let reducedResults: ImageProps[] = [];

  let i = 0;
  for (let result of results.resources) {
    reducedResults.push({
      id: i,
      height: result.height,
      width: result.width,
      public_id: result.public_id,
      format: result.format,
    });
    i++;
  }

  const blurImagePromises = results.resources.map((image: ImageProps) => {
    return getBase64ImageUrl(image);
  });

  const imagesWithBlurDataUrls = await Promise.all(blurImagePromises);

  for (let i = 0; i < reducedResults.length; i++) {
    reducedResults[i].blurDataUrl = imagesWithBlurDataUrls[i];
  }

  return {
    props: {
      images: reducedResults,
    },
    revalidate: 10,
  };
};

const DynamicPage: NextPage = ({ images }: { images: ImageProps[] }) => {
  const router = useRouter();
  const { photoId } = router.query;
  const [lastViewedPhoto, setLastViewedPhoto] = useLastViewedPhoto();

  useEffect(() => {
    if (lastViewedPhoto && !photoId) {
      document
        .querySelector(`#photo-${lastViewedPhoto}`)
        .scrollIntoView({ block: 'center' });

      setLastViewedPhoto(null);
    }
  }, [photoId, lastViewedPhoto, setLastViewedPhoto]);

  return (
    <>
      <Script src="https://cdn.tailwindcss.com" strategy="beforeInteractive" />

      <Head>
        <title>Your Page Title</title>
        <meta property="og:image" content="" />
        <meta name="twitter:image" content="" />
      </Head>

      <main>
        <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
          <img
            src="https://res.cloudinary.com/unlimitpotential/image/upload/v1703396793/replicate-prediction-aulhnmbbpq5n63qtru2a3kedmu_orh5x9.png"
            alt=""
            className="w-full h-full object-center object-cover"
          />
        </div>

        {photoId && (
          <Modal
            images={images}
            onClose={() => {
              setLastViewedPhoto(photoId);
            }}
          />
        )}

        <div className="flex min-h-full flex-col font-sans text-zinc-900 bg-zinc-50 dark:text-zinc-100 dark:bg-black">
          <div className="text-center">
            Header
          </div>
          <section>
            <div className="max-w-screen-3xl px-4 py-8 mx-auto sm:py-12 sm:px-6 lg:px-8">
              <section className="shadow-lg">
                Content
                {/* Put the rest of your page here. */}
              </section>

              <div className="text-center mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
                Cta Banner
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                  {Array.isArray(images) && images.length > 0 ? (
                    images.map(({ id, public_id, format, blurDataUrl }) => (
                      <Link
                        key={id}
                        href={`/preview?id=${public_id}&assetId=${id}`}
                        as={`/preview?id=${public_id}&assetId=${id}`}
                        id={`photo-${id}`}
                        shallow
                        className="group relative cursor-zoom-in overflow-hidden rounded-lg shadow-highlight"
                      >
                        {public_id.endsWith('.mp4') ? (
                          // Render video
                          <video
                            className="w-full h-full object-cover"
                            autoPlay
                            loop
                            muted
                            playsInline
                          >
                            <source src={cloudinary.v2.url(public_id)} type="video/mp4" />
                          </video>
                        ) : (
                          // Render image
                          <Image
                            alt="Next.js Conf photo"
                            className="transform object-cover rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
                            style={{ transform: 'translate3d(0, 0, 0)' }}
                            placeholder="blur"
                            blurDataURL={blurDataUrl}
                            src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_720/${public_id}.${format}`}
                            width={720}
                            height={720}
                            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, (max-width: 1536px) 33vw, 25vw"
                          />
                        )}
                      </Link>
                    ))
                  ) : (
                    <p>No images available.</p>
                  )}
                </div>
              </div>

              <main>
                <div>
                  <article>
                    <div>Content</div>
                  </article>
                </div>
              </main>

              <div>
                Header
              </div>

              <main>
                <div>
                  <article>
                    <div>Content</div>
                  </article>
                </div>
              </main>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default DynamicPage;
