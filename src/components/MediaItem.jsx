
// MediaItem.js
import React from 'react';
import Link from 'next/link';

const MediaItem = ({ id, public_id, format, blurDataUrl }) => {
    const isVideo = format === 'mp4';

    if (isVideo) {
        return (
            <div className="group relative cursor-zoom-in absolute inset-0 rounded-lg shadow-highlight">
                <video
                    className="transform object-cover rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
                    autoPlay
                    loop
                    muted
                    playsInline
                >
                    <source
                        src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload/${public_id}.mp4`}
                        type="video/mp4"
                    />
                    Your browser does not support the video tag.
                </video>
            </div>
        );
    } else {
        return (
            <Link
                href={`/preview?id=${public_id}&assetId=${id}`}
                as={`/preview?id=${public_id}&assetId=${id}`}
                id={`photo-${id}`}
                shallow
                className="group relative cursor-zoom-in absolute inset-0 rounded-lg shadow-highlight"
            >
                <img
                    alt="Next.js Conf photo"
                    className="transform object-cover rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
                    src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_720/${public_id}.${format}`}
                />
            </Link>
        );
    }
};

export default MediaItem;
