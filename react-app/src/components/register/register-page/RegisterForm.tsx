import { RegisterButton } from "./RegisterButton";
import { RegisterLinks } from "./RegisterLinks";

export const RegisterForm = () => {
  return (
    <form className=" grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-6 ">
      <div className="col-span-1">
        <label className="block text-sm font-medium text-[#3e2a19]">
          Vārds
        </label>
        <input
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
          placeholder="Ievadi savu vārdu"
        />
      </div>

      <div className="col-span-1">
        <label className="block text-sm font-medium text-[#3e2a19]">
          Uzvārds
        </label>
        <input
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
          placeholder="Ievadi savu uzvārdu"
        />
      </div>

      <div className="col-span-1 md:col-span-2">
        <label className="block text-sm font-medium text-[#3e2a19]">
          Lietotājvārds
        </label>
        <input
          type="text"
          id="username"
          className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm"
          placeholder="Ievadi savu lietotājvārdu"
        />
      </div>

      <div className="col-span-1 md:col-span-2">
        <label className="block text-sm font-medium text-[#3e2a19]">
          E-pasts
        </label>
        <input
          type="email"
          className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm"
          placeholder="Ievadi savu e-pastu"
        />
      </div>

      <div className="col-span-1">
        <label className="block text-sm font-medium text-[#3e2a19]">
          Parole
        </label>
        <input
          type="password"
          className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm"
          placeholder="Izveido savu paroli"
        />
      </div>

      <div className="col-span-1">
        <label className="block text-sm font-medium text-[#3e2a19]">
          Atkārtota parole
        </label>
        <input
          type="password"
          className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm"
          placeholder="Ievadi atkārtotu paroli"
        />
      </div>

      <div className="col-span-1 md:col-span-2">
        <label className="block text-sm font-medium text-[#3e2a19]">
          Augšupielādēt attēlu (nav obligāts)
        </label>
        <input
          type="file"
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <RegisterButton />
      <div className="col-span-1 md:col-span-2">
        <RegisterLinks />
      </div>
    </form>
  );
};
