import React, { useEffect, useState } from "react";
import CartProduct from "../cart/cart-page/CartProduct";
import { useCart } from "../universal/Cart";

export const Cart = () => {
  const { cartItems, removeFromCart, addToCart, fetchCart } = useCart();

  const getTotalPrice = () => {
    return cartItems.reduce((acc, item) => {
      return acc + item.product.pricing * item.amount;
    }, 0);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div className="flex min-h-screen  font-poppins">
      <div className="flex-1 bg-content-white p-8">
        <h2 className="text-4xl font-bold text-dark-brown mb-6">
          Iepirkumu grozs
        </h2>

        {cartItems.length === 0 ? (
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
                      key={product.product_id}
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
                Bezmaksas
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

      <div className=" bg-content-white p-6 shadow-lg w-1/4">
        <h3 className="text-xl font-bold text-dark-brown mb-4">Apmaksāt</h3>
        <button className="bg-light-brown text-white px-6 py-2.5 text-lg rounded-md shadow hover:bg-medium-brown font-poppins mt-4">
          <i className="fa-regular fa-credit-card mr-2"></i>
          Apmaksāt
        </button>
      </div>
    </div>
  );
};
