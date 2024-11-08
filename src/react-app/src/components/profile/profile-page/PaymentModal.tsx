import { useState } from "react";
import { FormInput } from "../../universal/FormInput";
import { paymentMethod } from "./PaymentMethods";
import { useToast } from "../../universal/Toast";
import { Constants } from "../../universal/Constants";

interface PaymentModalProps {
  onClose: () => void;
}

export const PaymentModal = ({ onClose }: PaymentModalProps) => {
  const [formData, setFormData] = useState(paymentMethod);
  const [isLoading, setIsLoading] = useState(false);

  const showToast = useToast();
  const valid = require("card-validator");

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
        onClose();
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

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-1/3 p-8 bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-dark-brown font-poppins"></h2>
          <button
            onClick={onClose}
            className="flex items-center justify-center rounded-full text-dark-brown w-7 h-7"
          >
            <i className="fa-solid fa-x"></i>
          </button>
        </div>
        <form onSubmit={onFormSubmit} className="space-y-4">
          <div className="flex gap-2">
            <div>
              <label className="block mb-1 text-sm text-dark-brown font-poppins">
                Kartes īpašnieka vārds
              </label>
              <FormInput
                value={formData.cardOwnerName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    cardOwnerName: e.target.value,
                  })
                }
                placeholder="Vārds"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm text-dark-brown font-poppins">
                Kartes īpašnieka uzvārds
              </label>
              <FormInput
                value={formData.cardOwnerSurname}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    cardOwnerSurname: e.target.value,
                  })
                }
                placeholder="Uzvārds"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="grow">
              <label className="block mb-1 text-sm text-dark-brown font-poppins">
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
              {isLoading ? "Ielādē..." : "Izveidot"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
