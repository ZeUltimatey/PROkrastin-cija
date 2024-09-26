import { LoginForm } from "./LoginForm";

export const LoginBox = () => {
  return (
    <div className="relative flex items-center justify-center h-full">
      <img
        src={"../login_bg.jpg"}
        alt="Login background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-transparent"></div>
      <div className="relative flex flex-col bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <div className="flex">
          <a href="/">
            <i className="fa-solid fa-arrow-left text-2xl hover:cursor-pointer"></i>
          </a>
          <span className="text-2xl font-bold text-center mb-4 text-dark-brown grow">
            Ienāc savā profilā!
          </span>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};
