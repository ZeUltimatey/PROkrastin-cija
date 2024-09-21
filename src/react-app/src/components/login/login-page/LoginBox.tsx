import { BackgroundImage } from "./BackgroundImage";
import { LoginForm } from "./LoginForm";

export const LoginBox = () => {
  return (
    <div className="relative flex items-center justify-center h-screen">
      <BackgroundImage />
      <div className="relative flex flex-col bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-[#3e2a19]">
          Ienāc savā profilā!
        </h2>
        <LoginForm />
      </div>
    </div>
  );
};
