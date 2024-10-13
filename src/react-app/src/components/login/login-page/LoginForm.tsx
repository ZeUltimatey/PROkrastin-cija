import { useState } from "react";
import { FormInput } from "../../universal/FormInput";
import { Constants } from "../../universal/Constants";

export const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const onSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    await fetch("http://127.0.0.1:8000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then(async (response) => {
        const data = await response.json();
        if (response.ok) {
          sessionStorage.setItem(Constants.SESSION_STORAGE.TOKEN, data.token);
          window.location.href = "/";
        } else {
          throw new Error(data.error);
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
        <a
          href="/auth/register"
          className="text-dark-brown hover:underline font-semibold"
        >
          Reģistrējies šeit!
        </a>
      </div>
    </form>
  );
};
