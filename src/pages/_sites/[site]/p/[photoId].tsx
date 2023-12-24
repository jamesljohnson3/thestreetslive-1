// pages/_sites/[site]/p/[photoId].tsx
import type { GetStaticProps, GetStaticPaths, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Carousel from '../../../../components/Carousel';
import getResults from '../../../../utils/cachedImages';
import cloudinary from '../../../../utils/cloudinary';
import getBase64ImageUrl from '../../../../utils/generateBlurPlaceholder';
import type { ImageProps } from '../../../../utils/types';

// Add your Prisma imports here
import { getSiteWorkspace, getWorkspacePaths } from '../../../../../prisma/services/workspace';

const PhotoNotFound: React.FC = () => {
  return (
    <div>
      <h1>Photo Not Found</h1>
      <p>Sorry, the requested photo could not be found.</p>
    </div>
  );
};

const Home: NextPage = ({ currentPhoto, error }: { currentPhoto: ImageProps; error?: { message: string } }) => {
  const router = useRouter();
  const { photoId } = router.query;
  let index = Number(photoId);

  if (error) {
    return <PhotoNotFound />;
  }

  if (!currentPhoto || !currentPhoto.public_id || !currentPhoto.format || !currentPhoto.blurDataUrl) {
    console.error("Invalid currentPhoto object:", currentPhoto);
    return null;
  }

  const currentPhotoUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_2560/${currentPhoto.public_id}.${currentPhoto.format}`;

  return (
    <>
      <Head>
        <title>Next.js Conf 2022 Photos</title>
        <meta property="og:image" content={currentPhotoUrl} />
        <meta name="twitter:image" content={currentPhotoUrl} />
      </Head>
      <main className="mx-auto max-w-[1960px] p-4">
        <Carousel currentPhoto={currentPhoto} index={index} />
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const { params } = context;
    const { photoId } = params;

    const results = await getResults();

    let reducedResults: ImageProps[] = [];
    let i = 0;

    for (let result of results.resources) {
      if (result && result.public_id && result.format) {
        const blurDataUrl = await getBase64ImageUrl({
          id: i,
          height: result.height,
          width: result.width,
          public_id: result.public_id,
          format: result.format,
        });

        reducedResults.push({
          id: i,
          height: result.height,
          width: result.width,
          public_id: result.public_id,
          format: result.format,
          blurDataUrl,
        });
        i++;
      }
    }

    const currentPhoto = reducedResults.find((img) => img.id === Number(photoId));

    if (!currentPhoto) {
      return {
        props: {
          error: {
            message: `Photo with ID ${photoId} not found`,
          },
        },
      };
    }

    return {
      props: {
        currentPhoto,
      },
    };
  } catch (error) {
    console.error("Error in getStaticProps:", error);
    return {
      props: {
        error: {
          message: "An error occurred while fetching data.",
        },
      },
    };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const paths = await getWorkspacePaths();
    const siteWorkspace = await getSiteWorkspace(/* add your site parameter here */);

    if (!siteWorkspace || !siteWorkspace.slug) {
      console.error("Site workspace not found");
      return {
        paths: [],
        fallback: true,
      };
    }

    const results = await cloudinary.v2.search
      .expression(`folder:${siteWorkspace.slug}/*`)
      .sort_by('public_id', 'desc')
      .max_results(400)
      .execute();

    let fullPaths = [];
    for (let i = 0; i < results.resources.length; i++) {
      fullPaths.push({ params: { photoId: i.toString() } });
    }

    return {
      paths: fullPaths,
      fallback: true,
    };
  } catch (error) {
    console.error("Error in getStaticPaths:", error);
    return {
      paths: [],
      fallback: true,
    };
  }
};

export default Home;
