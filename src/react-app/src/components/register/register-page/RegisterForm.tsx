import { useState } from "react";

export const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  return (
    <form className="flex flex-col gap-4">
      <div className="flex lg:flex-row flex-col lg:justify-between gap-4">
        <div className="w-full">
          <label className="font-medium text-dark-brown">Vārds</label>
          <input
            className="mt-1  w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
            placeholder="Ievadi savu vārdu"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div className="w-full">
          <label className="font-medium text-dark-brown">Uzvārds</label>
          <input
            className="mt-1  w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
            placeholder="Ievadi savu uzvārdu"
            value={formData.surname}
            onChange={(e) =>
              setFormData({ ...formData, surname: e.target.value })
            }
          />
        </div>
      </div>
      <div className="">
        <label className="font-medium text-dark-brown">Lietotājvārds</label>
        <input
          type="text"
          id="username"
          className="mt-1  w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
          placeholder="Ievadi savu lietotājvārdu"
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
        />
      </div>
      <div className="">
        <label className="font-medium text-dark-brown">E-pasts</label>
        <input
          type="email"
          className="mt-1  w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
          placeholder="Ievadi savu e-pastu"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>
      <div className="flex lg:flex-row flex-col gap-4">
        <div className="w-full">
          <label className="font-medium text-dark-brown">Parole</label>
          <input
            type="password"
            className="mt-1  w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
            placeholder="Izveido savu paroli"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </div>

        <div className="w-full">
          <label className="font-medium text-dark-brown">
            Atkārtota parole
          </label>
          <input
            type="password"
            className="mt-1  w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
            placeholder="Ievadi atkārtotu paroli"
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
          />
        </div>
      </div>
      <div className="mt-2">
        <button className="w-full bg-light-brown text-white font-semibold py-2 px-4 rounded-md hover:bg-medium-brown transition-all">
          Reģistrēties
        </button>
      </div>
      <div className="">
        <div className="text-center">
          <p className=" text-gray-500">Tev jau ir profils?</p>
          <a
            href="/auth/login"
            className="text-dark-brown hover:underline font-semibold"
          >
            Ienāc šeit
          </a>
        </div>
      </div>
    </form>
  );
};
