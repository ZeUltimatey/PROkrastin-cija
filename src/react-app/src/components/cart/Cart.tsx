import { useEffect, useState } from "react";
import CartProduct from "../cart/cart-page/CartProduct";
import { useCart } from "../universal/Cart";
import { ShippingMethod } from "./cart-page/ShippingMethod";
import { IUser } from "../universal/interfaces/IUser";
import { useNavigate } from "react-router-dom";
import { Constants } from "../universal/Constants";

export const Cart = () => {
  const { cartItems, removeFromCart, addToCart, fetchCart, payForBasket } =
    useCart();
  const [user, setUser] = useState<IUser>(null);
  const [paymentReady, setPaymentReady] = useState(false);
  const navigate = useNavigate();

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

  return (
    <div className="flex min-h-screen  font-poppins">
      <div className="flex-1 bg-content-white p-8">
        <h2 className="text-4xl font-bold text-dark-brown mb-6">
          Iepirkumu grozs
        </h2>

        {user && cartItems.length === 0 ? (
          <p className="text-lg text-dark-brown">Jūsu grozs ir tukšs.</p>
        ) : (
          <div className="mt-6">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-300">
                  <th className="text-left text-dark-brown font-semibold py-4 w-1/2">
                    Produkts
                  </th>
                  <th className="text-center text-dark-brown font-semibold py-4 w-1/4">
                    Daudzums
                  </th>
                  <th className="text-right text-dark-brown font-semibold py-4 w-1/5 pr-6">
                    Kopējā cena
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
            <div className="flex justify-between items-center mt-6">
              <span className="font-bold text-lg text-dark-brown">
                Kopējā summa:
              </span>
              <span className="font-bold text-lg text-dark-brown">
                {getTotalPrice().toFixed(2)}&euro;
              </span>
            </div>
            <div className="flex justify-between items-center mt-4">
              <span className="font-bold text-lg text-dark-brown">
                Piegāde:
              </span>
              <span className="font-bold text-lg flex items-center text-dark-brown">
                <i className="fa-duotone fa-solid fa-truck-fast mr-2 text-dark-brown"></i>
                {"0.00"}&euro;
              </span>
            </div>
            <div className="flex justify-between items-center mt-4 border-t pt-4">
              <span className="font-bold text-lg text-dark-brown">
                Kopā apmaksai:
              </span>
              <span className="font-bold text-lg text-dark-brown">
                {getTotalPrice().toFixed(2)}&euro;
              </span>
            </div>
          </div>
        )}
      </div>

      <div className=" bg-content-white p-6 border-l border-medium-brown w-1/4">
        <h3 className="text-xl font-bold text-dark-brown mb-4">Apmaksāt</h3>
        <ShippingMethod setPaymentReady={setPaymentReady} />
        <button
          disabled={cartItems.length == 0 || !paymentReady}
          onClick={() => payForBasket()}
          className="bg-light-brown text-white px-6 py-2.5 text-lg rounded-md shadow hover:bg-medium-brown font-poppins mt-4 disabled:bg-opacity-10 disabled:text-dark-brown disabled:cursor-not-allowed"
        >
          <i className="fa-regular fa-credit-card mr-2"></i>
          Apmaksāt
        </button>
      </div>
    </div>
  );
};
