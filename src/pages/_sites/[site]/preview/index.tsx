// PhotoPreviewPage.tsx

import { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Carousel from '../../../../components/Carousel';
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

    // Fetch photo data when the component mounts
    React.useEffect(() => {
        const fetchPhotoData = async () => {
            try {
                const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/resources/${id}`);
                const data = await response.json();

                if (data.resources && data.resources.length > 0) {
                    const resource = data.resources[0];
                    // Extract the required properties
                    const { height, width, public_id, format } = resource;

                    setCurrentPhoto({ id, height, width, public_id, format, blurDataUrl: resource.secure_url });
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
