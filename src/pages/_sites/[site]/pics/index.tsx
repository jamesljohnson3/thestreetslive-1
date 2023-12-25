import { useEffect } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Script from 'next/script';
import { useRouter } from 'next/router';
import Modal from '../../../../components/Modal';
import { getSiteWorkspace, getWorkspacePaths } from '../../../../../prisma/services/workspace';
import { useLastViewedPhoto } from '../../../../utils/useLastViewedPhoto';
import MediaItem from '../../../../components/MediaItem'; // Import your MediaItem component
import type { ImageProps } from '../../../../utils/types';
import cloudinary from '../../../../utils/cloudinary';
import getBase64ImageUrl from '../../../../utils/generateBlurPlaceholder';


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

  console.log('Cloudinary Search Results:', results);

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
        <meta property="og:image" content="your_image_url_here" />
        <meta name="twitter:image" content="your_image_url_here" />
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
          <div className="text-center">Header</div>

          <section>
            <div className="max-w-screen-3xl px-4 py-8 mx-auto sm:py-12 sm:px-6 lg:px-8">
              <section className="shadow-lg">
                {/* Content */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                  {images.map(({ id, public_id, format, blurDataUrl }) => (
                    <MediaItem
                      key={id}
                      id={id}
                      public_id={public_id}
                      format={format}
                      blurDataUrl={blurDataUrl}
                    />
                  ))}
                </div>
                {/* Put the rest of your page content here. */}
              </section>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default DynamicPage;
