// PhotoDetailPage.tsx

import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';

const PhotoDetailPage: NextPage = () => {
    const router = useRouter();
    const { photoId } = router.query;

    // Fetch the photo details using photoId and display them

    return (
        <div>
            {/* Display the larger view of the clicked photo */}
            {photoId && (
                <div>
                    {/* Fetch the photo details using photoId and display them */}
                    <Image
                        // Use the appropriate properties to display the larger view of the photo
                        src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/large/${photoId}`}
                        alt="Larger view of the photo"
                        width={/* Set the appropriate width */}
                        height={/* Set the appropriate height */}
                    />
                </div>
            )}
        </div>
    );
};

export default PhotoDetailPage;
