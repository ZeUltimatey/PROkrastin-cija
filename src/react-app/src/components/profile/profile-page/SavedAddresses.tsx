import { useEffect, useState } from "react";
import { FormInput } from "../../universal/FormInput";
import { useToast } from "../../universal/Toast";
import { Constants } from "../../universal/Constants";
import cities from "../../../data/cities.json";
import { useConfirmation } from "../../universal/Confirmation";
import { Spinner } from "../../universal/Spinner";

export const SavedAddress = {
  id: 0,
  locationName: "",
  city: "Ainaži",
  street: "",
  apartment_number: "",
  zip_code: "",
};

export const SavedAddresses = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(SavedAddress);
  const [addresses, setAddresses] = useState<(typeof SavedAddress)[]>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const showToast = useToast();
  const confirm = useConfirmation();

  const fetchSavedAddresses = async () => {
    await fetch(`${Constants.API_URL}/locations`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          Constants.LOCAL_STORAGE.TOKEN
        )}`,
      },
    }).then(async (response) => {
      if (response.ok) {
        const data = await response.json();

        setAddresses(data);
      } else {
        showToast(false, "Kļūda iegūstot adrešu informāciju.");
      }
    });
  };

  useEffect(() => {
    fetchSavedAddresses();
  }, []);

  const onAddressEdit = async (id: number) => {
    setIsEditing(true);
    await fetch(`${Constants.API_URL}/locations/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          Constants.LOCAL_STORAGE.TOKEN
        )}`,
      },
    }).then(async (response) => {
      if (response.ok) {
        const data = await response.json();
        setFormData(data);
        setIsModalOpen(true);
      }
    });
  };

  const onAddressDelete = async (id: number) => {
    if (await confirm("Dzēst adresi?")) {
      await fetch(`${Constants.API_URL}/locations/${id}`, {
        method: "delete",
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            Constants.LOCAL_STORAGE.TOKEN
          )}`,
        },
      }).then((response) => {
        if (response.ok) {
          showToast(true, "Adrese veiksmīgi dzēsta!");
          const newAddresses = addresses.filter((address) => address.id !== id);
          setAddresses(newAddresses);
        } else {
          showToast(false, "Kļūda dzēšot adresi.");
        }
      });
    }
    return;
  };

  const onFormSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsLoading(true);
    if (!validatePostalCode()) {
      showToast(false, "Nepareizs pasta indekss");
      setIsLoading(false);
      return;
    }
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
        setIsModalOpen(false);
        setTimeout(() => window.location.reload(), 1000);
      } else {
        showToast(false, "Kļūda adreses izveidē.");
      }
    });
    setIsLoading(false);
  };

  const onEditSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsLoading(true);
    if (!validatePostalCode()) {
      showToast(false, "Nepareizs pasta indekss");
      setIsLoading(false);
      return;
    }
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
        setIsModalOpen(false);
        setTimeout(() => window.location.reload(), 1000);
      } else {
        showToast(false, "Kļūda adreses atjaunināšanā.");
      }
    });
    setIsLoading(false);
    setIsEditing(false);
  };

  const validatePostalCode = () => {
    const regex = /^[LV-]{3}[0-9]{4}$/;
    return regex.test(formData.zip_code);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setFormData(SavedAddress);
  };

  return (
    <div className="p-8 border-2 rounded-md shadow-md bg-light-gray border-medium-brown">
      <h3 className="mb-4 text-2xl font-bold text-dark-brown font-poppins">
        Saglabātās adreses
      </h3>
      {addresses == null && <Spinner />}
      <ul className="space-y-4">
        {addresses &&
          addresses.map((address) => (
            <li
              key={address.id}
              className="flex items-center justify-between pb-4 border-b border-dark-brown"
            >
              <div>
                <p className="text-dark-brown font-poppins">
                  {address.locationName}
                </p>
                <p className="text-sm text-dark-brown font-poppins">
                  {address.city}, {address.street} {address.apartment_number},{" "}
                  {address.zip_code}
                </p>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => onAddressEdit(address.id)}
                  className="flex items-center justify-center w-8 h-8 text-dark-brown hover:text-medium-brown"
                >
                  <i className="fa-solid fa-pen-to-square"></i>
                </button>
                <button
                  onClick={() => onAddressDelete(address.id)}
                  className="flex items-center justify-center w-8 h-8 text-red-600 hover:underline font-poppins"
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            </li>
          ))}
      </ul>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-light-brown text-white px-6 py-2.5 text-lg rounded-md shadow hover:bg-medium-brown transition-all font-poppins mt-4"
      >
        <i className="mr-2 fa-solid fa-plus"></i> Pievienot jaunu
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-1/3 p-6 bg-white rounded-lg shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-dark-brown font-poppins">
                {isEditing ? "Rediģēt adresi" : "Pievienot jaunu adresi"}
              </h2>
              <button
                onClick={closeModal}
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
                  value={formData.locationName}
                  onChange={(e) =>
                    setFormData({ ...formData, locationName: e.target.value })
                  }
                  placeholder="Piem., Mājas adrese"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm text-dark-brown font-poppins">
                  Pilsēta
                </label>
                {/* <FormInput
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                  placeholder="Piem., Rīga"
                /> */}
                <select
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                  className="mt-1 w-full px-4 py-2 border accent-accent-brown bg-transparent font-poppins border-gray-300 rounded-md shadow-sm"
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
                  Pasta indekss
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
                  onClick={closeModal}
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
                  {isLoading
                    ? "Ielādē..."
                    : isEditing
                    ? "Saglabāt"
                    : "Izveidot"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
