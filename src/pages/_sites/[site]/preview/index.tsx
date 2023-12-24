// PhotoPreviewPage.tsx

import { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import downloadPhoto from '../../../../utils/downloadPhoto'

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
                                        <button
                                            onClick={() =>
                                                downloadPhoto(
                                                    `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${id}`,
                                                    `${id}.jpg`
                                                )
                                            }
                                            className="rounded-full bg-black/50 p-2 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white"
                                            title="Download fullsize version"
                                        >
                                            <>downloadPhoto</>
                                        </button>
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
                                        <form
                                            className="mt-20 rounded-2xl border bg-white border-zinc-100 p-6 dark:border-zinc-700/40"
                                            action="/thank-you"
                                        >
                                            <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                                                <svg
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    aria-hidden="true"
                                                    className="h-6 w-6 flex-none"
                                                >
                                                    <path
                                                        d="M2.75 7.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
                                                        className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
                                                    ></path>
                                                    <path
                                                        d="m4 6 6.024 5.479a2.915 2.915 0 0 0 3.952 0L20 6"
                                                        className="stroke-zinc-400 dark:stroke-zinc-500"
                                                    ></path>
                                                </svg>
                                                <span className="ml-3">Stay up to date</span>
                                            </h2>
                                            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                                                Get notified when I publish something new, and unsubscribe at any time.
                                            </p>
                                            <div className="mt-6 flex">
                                                <input
                                                    type="email"
                                                    placeholder="Email address"
                                                    aria-label="Email address"
                                                    required
                                                    className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10 sm:text-sm"
                                                />
                                                <button
                                                    className="inline-flex items-center gap-2 justify-center rounded-md py-2 px-3 text-sm outline-offset-2 transition active:transition-none bg-zinc-800 font-semibold text-zinc-100 hover:bg-zinc-700 active:bg-zinc-800 active:text-zinc-100/70 dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:active:bg-zinc-700 dark:active:text-zinc-100/70 ml-4 flex-none"
                                                    type="submit"
                                                >
                                                    Join
                                                </button>
                                            </div>
                                        </form>
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