import { Navbar } from "../universal/Navbar";
import { LoginBox } from "./login-page/LoginBox";

export const Login = () => {
  return (
    <div className="h-screen">
      <Navbar />
      <LoginBox />
    </div>
  );
};
