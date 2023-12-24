// PhotoPreviewPage.tsx

import { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';

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
    const { photoId } = router.query;

    // Check if photoId exists and render the larger view
    if (photoId) {
        return (
            <div>
                <Image
                    src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${photoId}`}
                    className="pointer-events-none h-full w-full"
                    sizes="(min-width: 808px) 50vw, 100vw"
                    style={{
                        objectFit: 'cover', // cover, contain, none
                    }}
                />
            </div>
        );
    }

    return <PhotoNotFound />;
};

export default PhotoPreviewPage;
