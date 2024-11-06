import { useEffect, useState } from "react";
import { useToast } from "../../universal/Toast";
import { Constants } from "../../universal/Constants";
import { Spinner } from "../../universal/Spinner";
import { PaymentModal } from "./PaymentModal";

export const paymentMethod = {
  id: 0,
  cardOwnerName: "",
  cardOwnerSurname: "",
  card_number: "",
  expiration_date: "",
  cvc_number: "",
  card_name: "",
};

export const PaymentMethods = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(paymentMethod);
  const [methods, setMethods] = useState<(typeof paymentMethod)[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const showToast = useToast();
  const valid = require("card-validator");

  const fetchPaymentMethods = async () => {
    await fetch(`${Constants.API_URL}/cards`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          Constants.LOCAL_STORAGE.TOKEN
        )}`,
      },
    }).then(async (response) => {
      if (response.ok) {
        const data = await response.json();
        setMethods(data);
      } else {
        showToast(false, "Kļūda iegūstot karšu informāciju.");
      }
    });
  };

  useEffect(() => {
    fetchPaymentMethods();
  }, []);

  const onMethodEdit = async (id: number) => {
    setIsEditing(true);
    await fetch(`${Constants.API_URL}/cards/${id}`, {
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

  const onMethodDelete = async (id: number) => {
    await fetch(`${Constants.API_URL}/cards/remove/${id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          Constants.LOCAL_STORAGE.TOKEN
        )}`,
      },
    }).then((response) => {
      if (response.ok) {
        showToast(true, "Maksājuma karte veiksmīgi dzēsta!");
        const newMethods = methods.filter((methods) => methods.id !== id);
        setMethods(newMethods);
      } else {
        showToast(false, "Kļūda dzēšot maksājuma karti.");
      }
    });
  };

  const onFormSubmit = async (formData: typeof paymentMethod) => {
    if (!validateCard()) return;
    setIsLoading(true);
    await fetch(`${Constants.API_URL}/cards`, {
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
        showToast(true, "Maksājuma karte veiksmīgi pievienota!");
        setIsModalOpen(false);
        setTimeout(() => window.location.reload(), 1000);
      } else {
        showToast(false, "Kļūda maksājuma kartes pievienošanā.");
      }
    });
    setIsLoading(false);
  };

  const validateCard = () => {
    if (!valid.number(formData.card_number).isValid) {
      showToast(false, "Nepareizs kartes numurs!");
      return false;
    }
    if (
      !valid.cardholderName(formData.cardOwnerName).isValid ||
      !valid.cardholderName(formData.cardOwnerSurname).isValid
    ) {
      showToast(false, "Lūdzu, ievadiet pareizu vārdu!");
      return false;
    }
    if (!valid.expirationDate(formData.expiration_date).isValid) {
      showToast(false, "Nepareizs derīguma termiņš!");
      return false;
    }
    if (!valid.cvv(formData.cvc_number).isValid) {
      showToast(false, "Nepareizs CVC numurs!");
      return false;
    }
    return true;
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setFormData(paymentMethod);
  };

  return (
    <div className="p-8 border-2 rounded-md shadow-md bg-light-gray border-medium-brown">
      <h3 className="mb-4 text-2xl font-bold text-dark-brown font-poppins">
        Saglabātās maksājumu metodes
      </h3>
      {methods == null && <Spinner />}
      <ul className="space-y-4">
        {methods.map((payment, index) => (
          <li
            key={index}
            className="flex items-center justify-between pb-4 border-b border-dark-brown"
          >
            <div>
              <p className="text-dark-brown font-poppins">
                {payment.card_name} - {payment.card_number}
              </p>
              <p className="text-sm text-dark-brown font-poppins">
                Beidzas: {payment.expiration_date}
              </p>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => onMethodDelete(payment.id)}
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
        className="bg-light-brown text-white px-6 py-2.5 text-lg rounded-md shadow hover:bg-medium-brown font-poppins mt-4"
      >
        <i className="mr-2 fa-solid fa-plus"></i> Pievienot jaunu
      </button>
      <PaymentModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={onFormSubmit}
        formData={formData}
        setFormData={setFormData}
        isLoading={isLoading}
        isEditing={isEditing}
      />
    </div>
  );
};
