import { LoginButton } from "./LoginButton";
export const LoginLinks = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <a href="#" className="text-sm text-[#3e2a19] hover:underline">
          Aizmirsi paroli?
        </a>
      </div>
      <LoginButton />
      <p className="text-sm text-center text-gray-500">
        Tev vēl nav profila?{" "}
        <a href="/register" className="text-[#3e2a19] hover:underline font-semibold">
          Izveidot profilu
        </a>
      </p>
    </>
  );
};
