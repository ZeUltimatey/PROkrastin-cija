import { useState } from "react";
import { useLocation } from "react-router";
import { FormInput } from "../../universal/FormInput";
import { Constants } from "../../universal/Constants";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../universal/Toast";
import { Spinner } from "../../universal/Spinner";

export const ResetPassword = () => {
  const location = useLocation();
  const token = new URLSearchParams(location.search).get("token");

  const [formData, setFormData] = useState({
    token: token,
    password: "",
    password_confirmation: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const showToast = useToast();

  const onSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsLoading(true);
    if (!formData.password) {
      showToast(false, "Lūdzu, ievadiet paroli!");
      setIsLoading(false);
      return;
    }
    await fetch(`${Constants.API_URL}/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then(async (response) => {
        if (response.ok) {
          showToast(true, "Parole veiksmīgi nomainīta!");
          setTimeout(() => navigate("/auth/login"), 1000);
        } else {
          showToast(false, "Kļūda paroles maiņā.");
        }
      })
      .catch((error) => {
        console.log(error);
      });
    setIsLoading(false);
  };

  return (
    <div className="absolute flex flex-col bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
      <div className="flex">
        <p onClick={() => navigate("/auth/login")}>
          <i className="fa-solid fa-arrow-left text-2xl hover:cursor-pointer"></i>
        </p>
        <span className="text-2xl font-bold text-center mb-4 text-dark-brown grow">
          Paroles atjaunošana
        </span>
      </div>
      <form onSubmit={onSubmit} className="space-y-4 font-poppins">
        <div>
          <label htmlFor="password" className="text-dark-brown">
            Jaunā parole
          </label>
          <FormInput
            id="password"
            placeholder="Ievadi jauno paroli"
            value={formData.password}
            type="password"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </div>

        <div>
          <label htmlFor="password_confirmation" className="text-dark-brown">
            Atkārtota jaunā parole
          </label>
          <FormInput
            id="password_confirmation"
            placeholder="Ievadi atkārtotu jauno paroli"
            value={formData.password_confirmation}
            type="password"
            onChange={(e) =>
              setFormData({
                ...formData,
                password_confirmation: e.target.value,
              })
            }
          />
        </div>

        <input
          disabled={isLoading}
          type="submit"
          value="Tālāk"
          className="w-full bg-light-brown text-white font-semibold py-2 px-4 rounded-md hover:bg-medium-brown transition-all"
        ></input>
        {isLoading && (
          <div className="mx-auto w-full">
            <Spinner />
          </div>
        )}
      </form>
    </div>
  );
};
