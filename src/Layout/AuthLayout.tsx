import { ChatIcon } from "../assets/svg";

type AuthLayoutType = {
  children: React.ReactNode;
};

function AuthLayout({ children }: AuthLayoutType) {
  return (
    <div className='flex overflow-hidden h-full w-full'>
      <div className='bg-auth_banner flex-[0.4] bg-no-repeat bg-cover relative hidden md:block'>
        <div className='bg-auth_overlay absolute top-0 left-0 w-full h-full opacity-[0.85] flex justify-center items-center flex-col'>
          <div className='mb-8 -mt-8'>
            <ChatIcon />
          </div>
          <h2 className='text-[#fff] text-3xl text-center md:w-[70%] mx-auto'>
            Converse with anyone with any language
          </h2>
        </div>
      </div>
      <div className='w-full  md:flex-[0.6]'>{children}</div>
    </div>
  );
}

export default AuthLayout;
