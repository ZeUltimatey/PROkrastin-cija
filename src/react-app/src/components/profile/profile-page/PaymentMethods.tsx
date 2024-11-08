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
  const [methods, setMethods] = useState<(typeof paymentMethod)[]>([]);

  const showToast = useToast();

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

  const closeModal = () => {
    setIsModalOpen(false);
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
      {isModalOpen && <PaymentModal onClose={closeModal} />}
    </div>
  );
};
