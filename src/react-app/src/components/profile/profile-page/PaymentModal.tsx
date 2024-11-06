import { FormInput } from "../../universal/FormInput";
import { paymentMethod } from "./PaymentMethods";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: typeof paymentMethod) => void;
  formData: typeof paymentMethod;
  setFormData: (data: typeof paymentMethod) => void;
  isLoading: boolean;
  isEditing: boolean;
}

export const PaymentModal = ({
  isOpen,
  onClose,
  onSubmit,
  formData,
  setFormData,
  isLoading,
  isEditing,
}: PaymentModalProps) => {
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-1/3 p-8 bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-dark-brown font-poppins">
            {isEditing
              ? "Rediģēt maksājumu karti"
              : "Pievienot jaunu maksājumu karti"}
          </h2>
          <button
            onClick={onClose}
            className="flex items-center justify-center rounded-full text-dark-brown w-7 h-7"
          >
            <i className="fa-solid fa-x"></i>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
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
              {isLoading ? "Ielādē..." : isEditing ? "Saglabāt" : "Izveidot"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
