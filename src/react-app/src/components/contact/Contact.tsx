import { useState } from "react";
import { FormInput } from "../universal/FormInput";
import { useToast } from "../universal/Toast";

export const ContactInfo = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const showToast = useToast();

  const onFormSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsLoading(true);
    if (!formData.name || !formData.email || !formData.message) {
      showToast(false, "Lūdzu, aizpildiet visus laukus!");
      setIsLoading(false);
      return;
    }
    if (!/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(formData.email)) {
      showToast(false, "Lūdzu, ievadiet pareizu e-pastu!");
      setIsLoading(false);
      return;
    }
    if (formData.message.length < 10) {
      showToast(false, "Lūdzu, ievadiet saturisku ziņojumu!");
      setIsLoading(false);
      return;
    }
    showToast(true, "Ziņojums nosūtīts!");
    // Send form data to the server
    setIsLoading(false);
    setTimeout(() => window.location.reload(), 1000);
  };

  return (
    <div className="min-h-screen bg-content-white bg-opacity-95 p-6">
      <h2 className="text-4xl font-bold text-dark-brown font-poppins mb-8 text-center">
        Sazinieties ar mums
      </h2>
      <p className="text-lg text-dark-brown font-poppins mb-12 text-center">
        Vai jums ir jautājumi vai vēlaties saņemt papildu informāciju? Mēs esam
        šeit, lai palīdzētu! Lūdzu, sazinieties ar mums, izmantojot zemāk
        norādīto informāciju vai sazināšanās formu.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
        <div className="pl-6">
          <h3 className="text-3xl font-semibold text-dark-brown font-poppins mb-6">
            Kontaktinformācija
          </h3>
          <ul className="text-dark-brown font-poppins space-y-4 text-lg">
            <li>
              <strong>Telefona numurs:</strong> +371 12 345 678
            </li>
            <li>
              <strong>E-pasta adrese:</strong> info@murratava.lv
            </li>
            <li>
              <strong>Adrese:</strong> Brīvības iela 123, Rīga, LV-1001, Latvija
            </li>
            <li>
              <strong>Darba laiks:</strong> P.-Pk. 9:00 - 18:00
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-3xl font-semibold text-dark-brown font-poppins mb-6">
            Sazināšanās forma
          </h3>
          <form onSubmit={onFormSubmit} className="space-y-6">
            <div>
              <label className="text-sm text-dark-brown font-poppins mb-1 font-semibold">
                Vārds, uzvārds
              </label>
              <FormInput
                placeholder="Ievadiet savu vārdu, uzvārdu"
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label className="text-sm text-dark-brown font-poppins mb-1 font-semibold">
                E-pasts
              </label>
              <FormInput
                placeholder="Ievadiet savu e-pastu"
                value={formData.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label className="text-sm text-dark-brown font-poppins mb-1 font-semibold">
                Ziņojums
              </label>
              <textarea
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="mt-1 w-full px-4 py-2 border font-poppins border-gray-300 rounded-md shadow-sm resize-none"
                rows={4}
                placeholder="Ievadiet savu ziņojumu"
              />
            </div>
            <input
              type="submit"
              value="Sūtīt"
              disabled={isLoading}
              className={`${
                isLoading
                  ? "bg-gray-200 hover:cursor-not-allowed"
                  : "hover:cursor-pointer bg-medium-brown hover:bg-opacity-70"
              }   text-white px-6 py-2 rounded-md shadow font-poppins`}
            />
          </form>
        </div>
      </div>
    </div>
  );
};
