import { getProviders, getSession } from 'next-auth/react'
import { signIn } from 'next-auth/react'


const SignIn = ({
  providers,
}) => {






  return (
    <>  <button
      onClick={() =>
        signIn('github', {
          callbackUrl: '/',
        })
      }
      className="w-full py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-gray-800 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
    >
      Continue with Github
    </button>
    </>
  )
}
export const getServerSideProps = async (
  context
) => {
  const session = await getSession(context);

  if (session?.user) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }

  const providers = await getProviders();

  return {
    props: { providers },
  };
};
export default SignIn
