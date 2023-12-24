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

const Home: NextPage = ({ currentPhoto }: { currentPhoto: ImageProps }) => {
  const router = useRouter();
  const { photoId } = router.query;
  let index = Number(photoId);

  // Check if currentPhoto is truthy before accessing its properties
  const currentPhotoUrl = currentPhoto
    ? `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_2560/${currentPhoto.public_id}.${currentPhoto.format}`
    : '';

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

export default Home;

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  const { photoId } = params;

  const results = await getResults(); // Adjust this line based on your actual data fetching logic

  let reducedResults: ImageProps[] = [];
  let i = 0;

  for (let result of results.resources) {
    // Check if the required properties exist
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

  const currentPhoto = reducedResults.find(
    (img) => img.id === Number(photoId)
  );

  if (!currentPhoto) {
    // Handle the case where the specified photoId is not found
    console.error(`Photo with ID ${photoId} not found`);
    return {
      notFound: true,
    };
  }

  return {
    props: {
      currentPhoto,
    },
  };
};



export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getWorkspacePaths();
  const siteWorkspace = await getSiteWorkspace(/* add your site parameter here */);

  if (!siteWorkspace || !siteWorkspace.slug) {
    // Handle the case where siteWorkspace is null or undefined
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
};