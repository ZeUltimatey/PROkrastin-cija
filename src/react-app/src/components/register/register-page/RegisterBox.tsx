import { BackgroundImage } from "../../login/login-page/BackgroundImage";
import { RegisterForm } from "./RegisterForm";

export const RegisterBox = () => {
  return (
    <div className="relative flex items-center justify-center h-screen">
      <BackgroundImage />

      <div className="relative flex flex-col bg-white rounded-lg shadow-lg p-6 w-full max-w-md md:max-w-xl space-y-4 mt-10 md:mt-4 lg:mt-2">
        <h2 className="text-2xl font-bold text-center mb-4 text-[#3e2a19]">
          Izveido savu profilu!
        </h2>
        <RegisterForm />
      </div>
    </div>
  );
};
