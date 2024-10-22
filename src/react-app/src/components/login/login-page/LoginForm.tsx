import { useState } from "react";
import { FormInput } from "../../universal/FormInput";
import { Constants } from "../../universal/Constants";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../universal/Toast";

export const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const showToast = useToast();

  const onSubmit = async (e: { preventDefault: () => void }) => {
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
          sessionStorage.setItem(Constants.SESSION_STORAGE.TOKEN, data.token);
          showToast(true, "Autentifikācija veiksmīga!");
          navigate("/");
        } else {
          showToast(false, "Kļūda autentifikācijas procesā.");
        }
      })
      .catch((error) => {
        alert(error);
      });
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
        type="submit"
        value="Ienākt"
        className="w-full bg-light-brown text-white font-semibold py-2 px-4 rounded-md hover:bg-medium-brown transition-all"
      ></input>
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
