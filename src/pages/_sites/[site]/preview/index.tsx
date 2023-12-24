// PhotoPreviewPage.tsx
import cloudinary from '../../../../utils/cloudinary';
import type { GetStaticProps, NextPage } from 'next';
import { ImageProps } from '../../../../utils/types'; // Import the type definition

const PhotoPreviewPage: NextPage<{ currentPhoto?: ImageProps }> = ({ currentPhoto }) => {
    // Render loading state
    if (!currentPhoto) {
        return <p>Loading...</p>;
    }

    // Render the larger view of the photo
    return (
        <div>
            <Image
                src={currentPhoto.secure_url} // Use secure_url property from Cloudinary response
                className="pointer-events-none object-contain h-full w-full"
                sizes="(min-width: 808px) 50vw, 100vw"
                style={{
                    objectFit: 'cover', // cover, contain, none
                }}
            />

            {/* Render the Carousel component with the fetched photo data */}
            <Carousel index={0} currentPhoto={currentPhoto} />
        </div>
    );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { id } = params;

    // Use Cloudinary API to fetch details about the image
    try {
        const response = await cloudinary.v2.api.resource(id, { type: 'upload' });

        // Ensure the necessary properties are present in the Cloudinary API response
        if (response.secure_url && response.format && response.height && response.width && response.public_id) {
            const currentPhoto: ImageProps = {
                id,
                secure_url: response.secure_url,
                format: response.format,
                height: response.height,
                width: response.width,
                public_id: response.public_id,
                blurDataUrl: response.blurDataUrl, // Assuming blurDataUrl is provided by Cloudinary
            };

            return {
                props: {
                    currentPhoto,
                },
                revalidate: 60, // In seconds, controls the maximum time between revalidations
            };
        } else {
            console.error('Incomplete response from Cloudinary API:', response);
            return {
                notFound: true, // If the resource is not found, return a 404 page
            };
        }
    } catch (error) {
        console.error('Error fetching photo data:', error);
        return {
            notFound: true, // If the resource is not found, return a 404 page
        };
    }
};

export default PhotoPreviewPage;
