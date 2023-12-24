// PhotoPreviewPage.tsx

import { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Carousel from '../../../../components/Carousel';
import cloudinary from '../../../../utils/cloudinary'; // Import your Cloudinary instance
import React from 'react';

const PhotoNotFound: React.FC = () => {
    return (
        <div>
            <h1>Photo Not Found</h1>
            <p>Sorry, the requested photo could not be found.</p>
        </div>
    );
};

const PhotoPreviewPage: NextPage = () => {
    const router = useRouter();
    const { id } = router.query;

    // Use a state to manage the fetched photo data
    const [currentPhoto, setCurrentPhoto] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchPhotoData = async () => {
            try {
                // Perform a search to get details about the specific image
                const results = await cloudinary.v2.search
                    .expression(`public_id:${id}`)
                    .execute();

                if (results.resources && results.resources.length > 0) {
                    const resource = results.resources[0];
                    // Extract the required properties
                    const { height, width, public_id, format, secure_url } = resource;

                    setCurrentPhoto({ id, height, width, public_id, format, secure_url });
                } else {
                    console.error('No resources found for the given ID');
                }
            } catch (error) {
                console.error('Error fetching photo data:', error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchPhotoData();
        }
    }, [id]);

    // Render loading state
    if (loading) {
        return <p>Loading...</p>;
    }

    // Check if id exists
    if (!id || !currentPhoto) {
        return <PhotoNotFound />;
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

export default PhotoPreviewPage;
