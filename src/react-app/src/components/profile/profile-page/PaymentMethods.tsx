import { useState } from "react";
import { FormInput } from "../../universal/FormInput";

interface PaymentMethod {
  card_number: string;
  expirtation_date: string;
  cvc_nuber: string;
  card_name: string;
}

export const PaymentMethods = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [paymentMethods, setPaymentMethods] = useState([
    { type: "Visa", cardNumber: "**** **** **** 1234", expiryDate: "08/26" },
    {
      type: "Mastercard",
      cardNumber: "**** **** **** 5678",
      expiryDate: "12/25",
    },
  ]);
  const [newPayment, setNewPayment] = useState({
    type: "",
    cardNumber: "",
    expiryDate: "",
  });

  const handleAddNewPayment = () => {
    setIsModalOpen(true);
  };

  const handleSavePayment = () => {
    if (newPayment.type && newPayment.cardNumber && newPayment.expiryDate) {
      setPaymentMethods([...paymentMethods, newPayment]);
      setNewPayment({ type: "", cardNumber: "", expiryDate: "" });
      setIsModalOpen(false);
    }
  };

  const handleDeletePayment = (index: number) => {
    const updatedPayments = paymentMethods.filter((_, i) => i !== index);
    setPaymentMethods(updatedPayments);
  };

  const [formData, setFormData] = useState<PaymentMethod>({} as PaymentMethod);

  return (
    <div className="bg-light-gray shadow-md rounded-md p-8 border-2 border-medium-brown">
      <h3 className="text-2xl font-bold text-dark-brown font-poppins mb-4">
        Saglabātās maksājumu metodes
      </h3>
      <ul className="space-y-4">
        {paymentMethods.map((payment, index) => (
          <li
            key={index}
            className="border-b border-dark-brown pb-4 flex justify-between items-center"
          >
            <div>
              <p className="text-dark-brown font-poppins">
                {payment.type} - {payment.cardNumber}
              </p>
              <p className="text-sm text-dark-brown font-poppins">
                Beidzas: {payment.expiryDate}
              </p>
            </div>
            <button
              onClick={() => handleDeletePayment(index)}
              className="text-red-600 hover:underline text-sm font-poppins"
            >
              <i className="fa-solid fa-trash"></i>
            </button>
          </li>
        ))}
      </ul>
      <button
        onClick={handleAddNewPayment}
        className="bg-light-brown text-white px-6 py-2.5 text-lg rounded-md shadow hover:bg-medium-brown font-poppins mt-4"
      >
        <i className="fa-solid fa-plus mr-2"></i> Pievienot jaunu
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-2/4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-dark-brown font-poppins">
                Pievienot jaunu maksājumu karti
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-dark-brown rounded-full w-7 h-7 flex items-center justify-center"
              >
                <i className="fa-solid fa-x"></i>
              </button>
            </div>
            <form className="space-y-4">
              <div>
                <label className="text-sm text-dark-brown font-poppins block mb-1">
                  Kartes tips
                </label>
                <FormInput
                  type="text"
                  value={newPayment.type}
                  onChange={(e) =>
                    setNewPayment({ ...newPayment, type: e.target.value })
                  }
                  placeholder="Piem., Visa vai Mastercard"
                />
              </div>
              <div>
                <label className="text-sm text-dark-brown font-poppins block mb-1">
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
                <label className="text-sm text-dark-brown font-poppins block mb-1">
                  Derīguma termiņš
                </label>
                <FormInput
                  value={formData.expirtation_date}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      expirtation_date: e.target.value,
                    })
                  }
                  placeholder="MM/YY"
                />
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-light-gray text-dark-brown px-4 py-2 rounded-md shadow font-poppins"
                >
                  Atcelt
                </button>
                <button
                  type="button"
                  onClick={handleSavePayment}
                  className="bg-medium-brown text-white px-6 py-2 rounded-md shadow font-poppins"
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
