import { LoginForm } from "./login-page/LoginForm";

export const Login = () => {
  return (
    <div className="absolute flex flex-col bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
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
  );
};
