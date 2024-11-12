import { useState } from "react";
import { FormInput } from "../../universal/FormInput";
import { Constants } from "../../universal/Constants";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../universal/Toast";
import { Spinner } from "../../universal/Spinner";

export const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const showToast = useToast();

  const onSubmit = async (e: { preventDefault: () => void }) => {
    setIsLoading(true);
    e.preventDefault();
    await fetch(`${Constants.API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then(async (response) => {
        if (response.ok) {
          const data = await response.json();
          localStorage.setItem(Constants.LOCAL_STORAGE.TOKEN, data.token);
          showToast(true, "Autentifikācija veiksmīga!");
          setTimeout(() => navigate("/"), 1000);
        } else {
          const data = await response.json();
          switch (data.error) {
            case "Invalid credentials":
              showToast(false, "Nepareizs e-pasts vai parole.");
              break;
            default:
              showToast(false, "Kļūda autentifikācijā.");
              break;
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
    setIsLoading(false);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4 font-poppins">
      <div>
        <label htmlFor="email" className="text-dark-brown">
          E-pasts
        </label>
        <FormInput
          id="email"
          placeholder="Ievadi savu e-pastu"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>
      <div>
        <label className="text-dark-brown">Parole</label>
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
      <div className="flex items-center justify-between">
        <a href="#" className="text-sm text-dark-brown hover:underline">
          Aizmirsi paroli?
        </a>
      </div>
      <input
        disabled={isLoading}
        type="submit"
        value="Ienākt"
        className="w-full bg-light-brown text-white font-semibold py-2 px-4 rounded-md hover:bg-medium-brown transition-all"
      ></input>
      {isLoading && (
        <div className="mx-auto w-full">
          <Spinner />
        </div>
      )}
      <div className="text-center">
        <p className="text-gray-500">Tev vēl nav profila?</p>
        <button
          onClick={() => navigate("/auth/register")}
          className="text-dark-brown hover:underline font-semibold"
        >
          Reģistrējies šeit!
        </button>
      </div>
    </form>
  );
};
