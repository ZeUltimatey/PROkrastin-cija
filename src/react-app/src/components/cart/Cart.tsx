import { useEffect, useState } from "react";
import CartProduct from "../cart/cart-page/CartProduct";
import { useCart } from "../universal/Cart";
import { ShippingMethod } from "./cart-page/ShippingMethod";
import { IUser } from "../universal/interfaces/IUser";
import { useNavigate } from "react-router-dom";
import { Constants } from "../universal/Constants";
import { useConfirmation } from "../universal/Confirmation";

export const Cart = () => {
  const { cartItems, removeFromCart, addToCart, fetchCart, payForBasket } =
    useCart();
  const [user, setUser] = useState<IUser>(null);
  const [paymentReady, setPaymentReady] = useState(false);
  const navigate = useNavigate();
  const [showMessage, setShowMessage] = useState(false);

  const getTotalPrice = () => {
    return cartItems.reduce((acc, item) => {
      return item.product.discount_pricing
        ? acc + item.product.discount_pricing * item.amount
        : acc + item.product.pricing * item.amount;
    }, 0);
  };

  const getUser = async () => {
    await fetch(`${Constants.API_URL}/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          Constants.LOCAL_STORAGE.TOKEN
        )}`,
      },
    }).then(async (response) => {
      if (response.ok) {
        const data = await response.json();
        setUser(data.data);
        return;
      }
      navigate("/");
    });
  };

  useEffect(() => {
    fetchCart();
    getUser();
  }, []);

  const confirm = useConfirmation();

  return (
    <div className="flex flex-col lg:flex-row lg:min-h-screen  font-poppins">
      <div className="flex-1 bg-content-white lg:p-8 p-4">
        <h2 className="lg:text-4xl text-xl font-bold text-dark-brown mb-6">
          Iepirkumu grozs
        </h2>

        {user && cartItems.length === 0 ? (
          <p className="text-lg text-dark-brown">Jūsu grozs ir tukšs.</p>
        ) : (
          <div className="mt-6">
            <table className="w-full border-collapse text-center">
              <thead>
                <tr className="border-b border-gray-300 text-center">
                  <th className="text-left lg:text-base text-sm text-dark-brown font-semibold py-4 w-1/2">
                    Produkts
                  </th>
                  <th className="text-center lg:text-base text-sm text-dark-brown font-semibold py-4 w-1/4">
                    Daudzums
                  </th>
                  <th className="text-right lg:text-base text-sm text-dark-brown font-semibold py-4 w-1/5 lg:pr-6">
                    Cena
                  </th>
                  <th className="text-right py-4"></th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((product) => {
                  return (
                    <CartProduct
                      key={product.product.id}
                      product={product.product}
                      quantity={product.amount}
                      onRemove={() => removeFromCart(product)}
                      onQuantityChange={addToCart}
                    />
                  );
                })}
              </tbody>
            </table>
            <div className="flex justify-between items-center mt-6 ">
              <span className="font-bold lg:text-lg text-sm text-dark-brown">
                Kopējā summa:
              </span>
              <span className="font-bold lg:text-lg text-sm text-dark-brown">
                {getTotalPrice().toFixed(2)}&euro;
              </span>
            </div>
            <div className="flex justify-between items-center mt-4">
              <span className="font-bold lg:text-lg text-sm text-dark-brown">
                Piegāde:
              </span>
              <span className="font-bold lg:text-lg text-sm flex items-center text-dark-brown">
                <i className="fa-duotone fa-solid fa-truck-fast mr-2 text-dark-brown"></i>
                {"0.00"}&euro;
              </span>
            </div>
            <div className="flex justify-between items-center mt-4 border-t pt-4">
              <span className="font-bold lg:text-lg text-sm text-dark-brown">
                Kopā apmaksai:
              </span>
              <span className="font-bold lg:text-lg text-sm text-dark-brown">
                {getTotalPrice().toFixed(2)}&euro;
              </span>
            </div>
          </div>
        )}
      </div>

      <div className=" bg-content-white p-6 lg:border-l border-medium-brown lg:w-1/4">
        <h3 className="text-xl font-bold text-dark-brown mb-4">Apmaksāt</h3>
        <ShippingMethod setPaymentReady={setPaymentReady} />

        <button
          disabled={cartItems.length == 0 || !paymentReady}
          onPointerEnter={() =>
            cartItems.length == 0 || !paymentReady
              ? setShowMessage(true)
              : setShowMessage(false)
          }
          onPointerLeave={() => setShowMessage(false)}
          onClick={async () => {
            if (await confirm("Veikt apmaksu?")) payForBasket();
          }}
          className="bg-light-brown text-white px-6 py-2.5 text-lg rounded-md shadow hover:bg-medium-brown font-poppins mt-4 disabled:bg-opacity-10 disabled:text-dark-brown disabled:cursor-not-allowed"
        >
          <i className="fa-regular fa-credit-card mr-2"></i>
          Apmaksāt
        </button>
        {showMessage && (
          <p className="mt-2">
            Lūdzu, ievietojiet grozā preces un izvēlieties piegādes adresi!
          </p>
        )}
      </div>
    </div>
  );
};
