import { useEffect, useState } from "react";
import { FormInput } from "../../universal/FormInput";
import { useToast } from "../../universal/Toast";
import { Constants } from "../../universal/Constants";
import { Spinner } from "../../universal/Spinner";

export const paymentMethod = {
  id: 0,
  name: "",
  surname: "",
  card_number: "",
  expiration_date: "",
  cvc_number: "",
  card_name: "",
};

export const PaymentMethods = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(paymentMethod);
  const [methods, setMethods] = useState<(typeof paymentMethod)[]>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const showToast = useToast();

  var valid = require("card-validator");

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
    await fetch(`${Constants.API_URL}/cards/${id}`, {
      method: "delete",
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

  const onFormSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const updatedFormData = {
      ...formData,
      card_name: `${valid
        .number(formData.card_number)
        .card.type.toUpperCase()} **** **** **** ${formData.card_number.slice(
        -4
      )}`,
    };

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
      body: JSON.stringify(updatedFormData),
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

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setFormData(paymentMethod);
  };

  const validateCard = () => {
    if (!valid.number(formData.card_number).isValid) {
      showToast(false, "Nepareizs kartes numurs!");
      return false;
    }
    if (
      !valid.cardholderName(formData.name).isValid ||
      !valid.cardholderName(formData.surname).isValid
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

  return (
    <div className="p-8 border-2 rounded-md shadow-md bg-light-gray border-medium-brown">
      <h3 className="mb-4 text-2xl font-bold text-dark-brown font-poppins">
        Saglabātās maksājumu metodes
      </h3>
      {methods == null && <Spinner />}

      <ul className="space-y-4">
        {methods &&
          methods.map((payment, index) => (
            <li
              key={index}
              className="flex items-center justify-between pb-4 border-b border-dark-brown"
            >
              <div>
                <p className="text-dark-brown font-poppins">
                  {payment.card_name}
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

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-1/3 p-8 bg-white rounded-lg shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-dark-brown font-poppins">
                Pievienot jaunu maksājumu karti
              </h2>
              <button
                onClick={closeModal}
                className="flex items-center justify-center rounded-full text-dark-brown w-7 h-7"
              >
                <i className="fa-solid fa-x"></i>
              </button>
            </div>
            <form onSubmit={onFormSubmit} className="space-y-4">
              <div className="flex gap-2">
                <div>
                  <label className="block mb-1 text-sm text-dark-brown font-poppins">
                    Kartes īpāšnieka vārds
                  </label>
                  <FormInput
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        name: e.target.value,
                      })
                    }
                    placeholder="Vārds"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm text-dark-brown font-poppins">
                    Kartes īpāšnieka uzvārds
                  </label>
                  <FormInput
                    value={formData.surname}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        surname: e.target.value,
                      })
                    }
                    placeholder="Uzvārds"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <div className="grow">
                  <label className="block mb-1 text-sm  text-dark-brown font-poppins">
                    Kartes numurs
                  </label>
                  <FormInput
                    value={formData.card_number}
                    type="number"
                    onChange={(e) =>
                      setFormData({ ...formData, card_number: e.target.value })
                    }
                    placeholder="**** **** **** 1234"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm text-dark-brown font-poppins">
                    CVC numurs
                  </label>
                  <FormInput
                    value={formData.cvc_number}
                    type="number"
                    onChange={(e) =>
                      setFormData({ ...formData, cvc_number: e.target.value })
                    }
                    placeholder="111"
                  />
                </div>
              </div>
              <div>
                <label className="block mb-1 text-sm text-dark-brown font-poppins">
                  Derīguma termiņš
                </label>
                <FormInput
                  value={formData.expiration_date}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      expiration_date: e.target.value,
                    })
                  }
                  placeholder="MM/YY"
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
