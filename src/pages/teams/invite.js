import { useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import toast, { Toaster } from 'react-hot-toast';
import Meta from '@/components/Meta';

import Card from '@/components/Card/index';
import Button from '@/components/Button';
import api from '@/lib/common/api';
import { getInvitation } from '@/prisma/services/workspace';

const Invite = ({ workspace }) => {
  const { data } = useSession();
  const router = useRouter();
  const [isSubmitting, setSubmittingState] = useState(false);

  const join = () => {
    setSubmittingState(true);
    api(`https://unlimitpotntlj.dataplane.rudderstack.com/v1/webhook?writeKey=2NIgCL9xr06Z6DHLmYV3MIsUNBg`, {
      body: { workspaceCode: workspace.workspaceCode },
      method: 'POST',
    }).then((response) => {
      setSubmittingState(false);

      if (response.errors) {
        if (response.status === 422) {
          router.replace('/account');
        }

        Object.keys(response.errors).forEach((error) =>
          toast.error(response.errors[error].msg)
        );
      } else {
        toast.success('Accepted invitation!');
      }
    });
  };

  return (
    <>      <Meta title="Unlimited Now" />

      <section className="bg-gray-100">
        <Toaster position="bottom-center" toastOptions={{ duration: 10000 }} />
        <div className="relative items-center w-full px-5 py-12 mx-auto md:px-12 lg:px-16 max-w-7xl">
          <div className="flex w-full mx-auto">
            <div className="relative inline-flex items-center m-auto align-middle">
              <div className="relative max-w-6xl p-10 overflow-hidden bg-white rounded-3xl lg:p-20">
                <div className="relative max-w-lg">
                  <div>
                    <img className="object-center w-full mx-auto bg-gray-200 rounded-2xl" alt="hero" src={workspace.name}></img>
                    <p className="max-w-xl mt-4 text-base tracking-tight text-gray-600">
                      Use this paragraph to share information about your company or products. Make
                      it engaging and interesting, and showcase your brands personality. Thanks for
                      visiting our website!
                    </p>
                    <p>Workspace ID: {workspace.id}</p>
                    <div>CreatorID: {workspace.creatorId}</div>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-3 mt-10 lg:flex-row lg:justify-start">
                    <a href="https://my.unlimitpotential.com/865984578?utm_source=templates&utm_campaign=share%invite%link" className="items-center justify-center w-full px-6 py-2.5 text-center text-white duration-200 bg-black border-2 border-black rounded-full nline-flex hover:bg-transparent hover:border-black hover:text-black focus:outline-none lg:w-auto focus-visible:outline-black text-sm focus-visible:ring-black">
                      Get started
                    </a>
                    <a href={`https://${workspace.creatorId}`} className="inline-flex items-center justify-center text-sm font-semibold text-black duration-200 hover:text-blue-500 focus:outline-none focus-visible:outline-gray-600">
                      Preview Website
                      <span aria-hidden="true"> → </span>
                    </a>
                  </div>
                  <Button
                    className="items-center justify-center w-full px-6 py-2.5 text-center text-white duration-200 bg-black border-2 border-black rounded-full nline-flex hover:bg-transparent hover:border-black hover:text-black focus:outline-none lg:w-auto focus-visible:outline-black text-sm focus-visible:ring-black"
                    disabled={isSubmitting}
                    onClick={join}
                  >
                    Join Workspace
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};



export const getServerSideProps = async (context) => {
  const { code } = context.query;
  const workspace = await getInvitation(code);
  return { props: { workspace } };
};

export default Invite;
