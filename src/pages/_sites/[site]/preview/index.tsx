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
    const { id } = router.query;

    // Check if id exists
    if (!id) {
        return <PhotoNotFound />;
    }

    // Render the larger view of the photo
    return (

        <>      {/* Put your header here. */}
            <div className="flex min-h-full flex-col font-sans text-zinc-900 bg-zinc-50 dark:text-zinc-100 dark:bg-black"><div className="text-center">
                Header  </div>



                <section>
                    <div className="max-w-screen-3xl px-4 py-8 mx-auto sm:py-12 sm:px-6 lg:px-8">
                        <section className="shadow-lg">

                            <div>
                                <Image
                                    src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${id}`}
                                    className="pointer-events-none h-full w-full"
                                    sizes="(min-width: 808px) 50vw, 100vw"
                                    style={{
                                        objectFit: 'contain', // cover, contain, none
                                    }}
                                />
                            </div>

                            {/* Put the rest of your page here. */}
                        </section>
                        <div className="text-center mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
                            Cta Banner

                            <div>
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">


                                </div>
                            </div>
                        </div>
                        <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">

                            <div className="">


                                <article className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
                                    <div className="text-center">
                                        content

                                    </div>
                                </article>
                            </div>
                        </main>
                        <div className="text-center mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
                            Header  </div>
                        <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">

                            <div className="">


                                <article className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
                                    <div className="text-center">
                                        content
                                    </div>
                                </article>
                            </div>
                        </main>

                    </div>
                </section>



            </div>

        </>
    );
};

export default PhotoPreviewPage;