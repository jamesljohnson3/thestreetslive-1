// PhotoPreviewPage.tsx

import { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Carousel from '../../../../components/Carousel';

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

    // Check if id exists
    if (!id) {
        return <PhotoNotFound />;
    }

    const currentPhoto = {
        id: 1, // Replace with the actual photo ID
        blurDataUrl: 'url-to-blurred-image', // Replace with the actual blurred image URL
    };

    return (
        <div>
            {/* Render the larger view of the photo */}
            <Image
                src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${id}`}
                className="pointer-events-none object-contain h-full w-full"
                sizes="(min-width: 808px) 50vw, 100vw"
                style={{
                    objectFit: 'cover', // cover, contain, none
                }}
            />

            {/* Render the Carousel component with the blurred background */}
            <Carousel index={0} currentPhoto={currentPhoto} />
        </div>
    );
};

export default PhotoPreviewPage;
