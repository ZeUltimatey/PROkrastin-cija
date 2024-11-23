import { FormInput } from "../../universal/FormInput";
import cities from "../../../data/cities.json";
import { useState } from "react";
import { Constants } from "../../universal/Constants";
import { useToast } from "../../universal/Toast";

export const SavedAddress = {
  id: 0,
  location_name: "",
  city: "Ainaži",
  street: "",
  apartment_number: "",
  zip_code: "",
};

interface IAddressModalProps {
  onClose: () => void;
  data?: typeof SavedAddress;
  isEditing: boolean;
}

export const AddressModal = ({
  onClose,
  data,
  isEditing,
}: IAddressModalProps) => {
  const [formData, setFormData] = useState(data ?? ({} as typeof SavedAddress));
  const [isLoading, setIsLoading] = useState(false);

  const showToast = useToast();

  const onFormSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsLoading(true);
    await fetch(`${Constants.API_URL}/locations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem(
          Constants.LOCAL_STORAGE.TOKEN
        )}`,
      },
      body: JSON.stringify(formData),
    }).then((response) => {
      if (response.ok) {
        showToast(true, "Adrese veiksmīgi pievienota!");
        onClose();
        setTimeout(() => window.location.reload(), 1000);
      } else {
        showToast(
          false,
          "Kļūda adreses izveidē, lūdzu, pārbaudiet vai visi lauki ir aizpildīti!"
        );
      }
    });
    setIsLoading(false);
  };

  const onEditSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsLoading(true);
    await fetch(`${Constants.API_URL}/locations/${formData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem(
          Constants.LOCAL_STORAGE.TOKEN
        )}`,
      },
      body: JSON.stringify(formData),
    }).then((response) => {
      if (response.ok) {
        showToast(true, "Adrese veiksmīgi atjaunināta!");
        onClose();
        setTimeout(() => window.location.reload(), 1000);
      } else {
        showToast(
          false,
          "Kļūda adreses atjaunināšanā, lūdzu, pārbaudiet vai visi lauki ir aizpildīti!"
        );
      }
    });
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative lg:w-1/3 p-6 bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-dark-brown font-poppins">
            {isEditing ? "Rediģēt adresi" : "Pievienot jaunu adresi"}
          </h2>
          <button
            onClick={onClose}
            className="flex items-center justify-center rounded-full text-dark-brown w-7 h-7"
          >
            <i className="fa-solid fa-x"></i>
          </button>
        </div>
        <form
          className="space-y-4"
          onSubmit={isEditing ? onEditSubmit : onFormSubmit}
        >
          <div>
            <label className="block mb-1 text-sm text-dark-brown font-poppins">
              Adreses Nosaukums
            </label>
            <FormInput
              value={formData.location_name}
              onChange={(e) =>
                setFormData({ ...formData, location_name: e.target.value })
              }
              placeholder="Piem., Mājas adrese"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm text-dark-brown font-poppins">
              Pilsēta
            </label>
            <select
              value={formData.city}
              onChange={(e) =>
                setFormData({ ...formData, city: e.target.value })
              }
              className="w-full px-4 py-2 mt-1 bg-transparent border border-gray-300 rounded-md shadow-sm accent-accent-brown font-poppins"
            >
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1 text-sm text-dark-brown font-poppins">
              Iela
            </label>
            <FormInput
              value={formData.street}
              onChange={(e) =>
                setFormData({ ...formData, street: e.target.value })
              }
              placeholder="Piem., Čaka iela"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm text-dark-brown font-poppins">
              Dzīvokļa vai mājas numurs
            </label>
            <FormInput
              value={formData.apartment_number}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  apartment_number: e.target.value,
                })
              }
              placeholder="Piem., 69"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm text-dark-brown font-poppins">
              Pasta indekss (LV-XXXX)
            </label>
            <FormInput
              value={formData.zip_code}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  zip_code: e.target.value.toUpperCase(),
                })
              }
              placeholder="Piem., LV-3301"
            />
          </div>

          <div className="flex justify-end mt-4 space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm border rounded-md text-dark-brown border-light-brown font-poppins"
            >
              Atcelt
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className={`${
                isLoading
                  ? "bg-light-gray"
                  : "bg-light-brown hover:bg-medium-brown"
              } text-white px-4 py-2 text-sm rounded-md font-poppins`}
            >
              {isLoading ? "Ielādē..." : isEditing ? "Saglabāt" : "Izveidot"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
