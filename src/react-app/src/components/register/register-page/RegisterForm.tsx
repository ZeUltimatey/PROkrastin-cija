import { useState } from "react";
import { FormInput } from "../../universal/FormInput";
import { Constants } from "../../universal/Constants";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../universal/Toast";
import { Spinner } from "../../universal/Spinner";

export const RegisterForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    display_name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const showToast = useToast();

  const onSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsLoading(true);
    if (!/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(formData.email)) {
      showToast(false, "Lūdzu, ievadiet pareizu e-pastu!");
      setIsLoading(false);
      return;
    }
    if (!formData.password) {
      showToast(false, "Lūdzu, ievadiet paroli!");
      setIsLoading(false);
      return;
    }
    if (formData.password !== formData.password_confirmation) {
      showToast(false, "Paroles nesakrīt!");
      setIsLoading(false);
      return;
    }
    if (!formData.name || !formData.surname || !formData.display_name) {
      showToast(false, "Lūdzu, aizpildiet visus laukus!");
      setIsLoading(false);
      return;
    }
    await fetch(`${Constants.API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then(async (response) => {
        if (response.ok) {
          showToast(true, "Reģistrācija veiksmīga!");
          setTimeout(() => navigate("/auth/login"), 1000);
        } else {
          const data = await response.json();
          console.log(data);
          showToast(
            false,
            data.error ?? data.errors[Object.keys(data.errors)[0]][0]
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
    setIsLoading(false);
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4 font-poppins">
      <div className="flex lg:flex-row flex-col lg:justify-between gap-4">
        <div className="w-full">
          <label htmlFor="name" className="font-medium text-dark-brown">
            Vārds
          </label>
          <FormInput
            id="name"
            placeholder="Ievadi savu vārdu"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div className="w-full">
          <label htmlFor="surname" className="font-medium text-dark-brown">
            Uzvārds
          </label>
          <FormInput
            id="surname"
            placeholder="Ievadi savu uzvārdu"
            value={formData.surname}
            onChange={(e) =>
              setFormData({ ...formData, surname: e.target.value })
            }
          />
        </div>
      </div>
      <div>
        <label htmlFor="username" className="font-medium text-dark-brown">
          Lietotājvārds
        </label>
        <FormInput
          id="username"
          placeholder="Ievadi savu lietotājvārdu"
          value={formData.display_name}
          onChange={(e) =>
            setFormData({ ...formData, display_name: e.target.value })
          }
        />
      </div>
      <div className="">
        <label htmlFor="email" className="font-medium text-dark-brown">
          E-pasts
        </label>
        <FormInput
          id="email"
          placeholder="Ievadi savu e-pastu"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>
      <div className="flex lg:flex-row flex-col gap-4">
        <div className="w-full">
          <label htmlFor="password" className="font-medium text-dark-brown">
            Parole
          </label>
          <FormInput
            id="password"
            placeholder="••••••••"
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </div>

        <div className="w-full">
          <label
            htmlFor="password_confirmation"
            className="font-medium text-dark-brown"
          >
            Atkārtota parole
          </label>
          <FormInput
            id="password_confirmation"
            placeholder="••••••••"
            type="password"
            value={formData.password_confirmation}
            onChange={(e) =>
              setFormData({
                ...formData,
                password_confirmation: e.target.value,
              })
            }
          />
        </div>
      </div>
      <div className="mt-2">
        <input
          disabled={isLoading}
          type="submit"
          className="w-full bg-light-brown text-white font-semibold py-2 px-4 rounded-md hover:cursor-pointer hover:bg-medium-brown transition-all"
          value="Reģistrēties"
        />
      </div>
      {isLoading && (
        <div className="mx-auto">
          <Spinner />
        </div>
      )}
      <div className="">
        <div className="text-center">
          <p className=" text-gray-500">Tev jau ir profils?</p>
          <button
            onClick={() => navigate("/auth/login")}
            className="text-dark-brown hover:underline font-semibold"
          >
            Ienāc šeit!
          </button>
        </div>
      </div>
    </form>
  );
};
