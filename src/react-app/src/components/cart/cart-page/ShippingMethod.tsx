import { useEffect, useState } from "react";
import { Constants } from "../../universal/Constants";
import { useToast } from "../../universal/Toast";
import { Spinner } from "../../universal/Spinner";
import { AddressModal } from "../../profile/profile-page/AddressModal";

type SavedAddress = {
  id: number;
  location_name: string;
  city: string;
  street: string;
  apartment_number: number;
  zip_code: string;
};

type PaymentMethod = {
  id: number;
  expiration_date: string;
  card_name: string;
};

export const ShippingMethod = ({
  shippingMethod,
  setShippingMethod,
  setPaymentReady,
}: {
  shippingMethod: number;
  setShippingMethod: (shippingMethod: number) => void;
  setPaymentReady: (paymentReady: boolean) => void;
}) => {
  const [addresses, setAddresses] = useState<SavedAddress[]>(null);
  const [addressOpen, setAddressOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const showToast = useToast();

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

  useEffect(() => {
    if (shippingMethod) {
      setPaymentReady(true);
    } else {
      setPaymentReady(false);
    }
  }, [shippingMethod]);

  const closeModal = () => {
    setAddressOpen(false);
    setIsEditing(false);
    setShippingMethod(null);
  };

  return (
    <div className="flex flex-col gap-2">
      {addressOpen && (
        <AddressModal onClose={closeModal} isEditing={isEditing} />
      )}
      <p className="font-semibold">Piegādes adreses</p>
      <div className="w-full flex flex-col gap-2 ">
        {addresses === null && (
          <div className="mx-auto">
            <Spinner />
          </div>
        )}
        {addresses &&
          addresses.map((address) => (
            <div
              onClick={() => {
                setShippingMethod(address.id);
              }}
              className={`bg-light-gray border-2  rounded-md p-4 flex gap-2 ${
                shippingMethod == address.id
                  ? "border-accent-brown "
                  : "border-hover-brown"
              }`}
            >
              <div
                className={` w-12 h-12  flex place-items-center justify-center rounded-md ${
                  shippingMethod == address.id
                    ? "bg-accent-brown"
                    : "bg-hover-brown"
                }`}
              >
                <i
                  className={`fa-solid fa-house text-xl ${
                    shippingMethod == address.id
                      ? "text-hover-brown"
                      : "text-accent-brown"
                  }`}
                ></i>
              </div>
              <div>
                <p
                  className={`${
                    shippingMethod == address.id ? "font-semibold" : ""
                  }`}
                >
                  {address.location_name}
                </p>
                <p className="text-sm">
                  {address.city}, {address.street} {address.apartment_number},{" "}
                  {address.zip_code}
                </p>
              </div>
            </div>
          ))}
      </div>
      <div
        onClick={() => setAddressOpen(true)}
        className="w-full flex flex-col gap-2 bg-light-gray border-2 hover:bg-hover-brown transition-all rounded-md border-hover-brown place-items-center justify-center h-12"
      >
        <i className="fa-solid fa-plus text-accent-brown text-xl"></i>
      </div>
    </div>
  );
};
