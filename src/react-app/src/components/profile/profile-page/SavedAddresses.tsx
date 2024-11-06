import { useEffect, useState } from "react";
import { useToast } from "../../universal/Toast";
import { Constants } from "../../universal/Constants";
import { useConfirmation } from "../../universal/Confirmation";
import { Spinner } from "../../universal/Spinner";
import { AddressModal } from "./AddressModal";

export const SavedAddress = {
  id: 0,
  locationName: "",
  city: "",
  street: "",
  apartment_number: "",
  zip_code: "",
};

export const SavedAddresses = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(SavedAddress);
  const [addresses, setAddresses] = useState<(typeof SavedAddress)[]>([]);
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
        setAddresses(data.data);
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
        method: "DELETE",
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
    setIsEditing(false);
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
        setIsModalOpen(false);
        setTimeout(() => window.location.reload(), 1000);
      } else {
        showToast(false, "Kļūda adreses atjaunināšanā.");
      }
    });
    setIsLoading(false);
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

      <AddressModal
        isOpen={isModalOpen}
        formData={formData}
        setFormData={setFormData}
        isEditing={isEditing}
        isLoading={isLoading}
        onClose={closeModal}
        onSubmit={isEditing ? onEditSubmit : onFormSubmit}
      />
    </div>
  );
};
