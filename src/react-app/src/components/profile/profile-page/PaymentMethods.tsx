import { useEffect, useState } from "react";
import { FormInput } from "../../universal/FormInput";
import { useToast } from "../../universal/Toast";
import { Constants } from "../../universal/Constants";

export const paymentMethod = {
  id: 0,
  card_number: "",
  expiration_date: "",
  // cvc_number: "",
  card_name: "",
};

export const PaymentMethods = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(paymentMethod);
  const [methods, setMethods] = useState<(typeof paymentMethod)[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

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

  const onFormSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
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

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-2/4 p-8 bg-white rounded-lg shadow-lg">
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
            <form
              className="space-y-4"
            >
              <div>
                <label className="block mb-1 text-sm text-dark-brown font-poppins">
                  Kartes īpāšnieka vārds
                </label>
                <FormInput
                  value={formData.card_name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      card_name: e.target.value,
                    })
                  }
                  placeholder="Vārds Uzvārds"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm text-dark-brown font-poppins">
                  Kartes numurs
                </label>
                <FormInput
                  value={formData.card_number}
                  onChange={(e) =>
                    setFormData({ ...formData, card_number: e.target.value })
                  }
                  placeholder="**** **** **** 1234"
                />
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
              <div className="flex justify-end mt-6 space-x-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 rounded-md shadow bg-light-gray text-dark-brown font-poppins"
                >
                  Atcelt
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 text-white rounded-md shadow bg-medium-brown font-poppins"
                >
                  Saglabāt
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
