import { Outlet } from "react-router-dom";

export const LoginLayout = () => {
  return (
    <div className="relative bg-login-bg-image bg-cover flex items-center justify-center h-screen">
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-transparent"></div>
      <Outlet />
    </div>
  );
};
