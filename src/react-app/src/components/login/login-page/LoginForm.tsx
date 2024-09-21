import { LoginLinks } from "./LoginLinks";
export const LoginForm = () => {
  return (
    <form className="space-y-8">
      <div>
        <label className="block text-sm font-medium text-[#3e2a19]">
          E-pasts
        </label>
        <input
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
          placeholder="tavs@epasts.lv"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-[#3e2a19]">
          Parole
        </label>
        <input
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
          placeholder="••••••••"
        />
      </div>
      <LoginLinks />
    </form>
  );
};
