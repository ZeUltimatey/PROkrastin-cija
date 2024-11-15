import { useEffect } from "react";
import { useCart } from "./Cart";
import { useNavigate } from "react-router-dom";
import { Constants } from "./Constants";

export const NavbarCart = () => {
  const { cartItems, removeFromCart } = useCart();

  const navigate = useNavigate();

  return (
    <ul className="flex flex-col mt-6 border-t-4 border-accent-brown absolute w-[280px] top-20 right-[260px] justify-between shadow-sm">
      {!cartItems?.length && (
        <li
          key={1}
          className="bg-content-white w-full flex py-4 place-items-center justify-center flex-col gap-2 rounded-b-md"
        >
          <span className="font-semibold text-lg">Nekā te nav!</span>
          <i className="fa-solid fa-bugs text-2xl"></i>
        </li>
      )}
      {cartItems?.length > 0 && (
        <div className="flex flex-col gap-3 bg-content-white px-2 py-3">
          {cartItems.map((item, idx) => {
            return (
              <div className="flex flex-col  w-full">
                <div className="flex flex-col">
                  <div className="flex w-full gap-2">
                    <img
                      src={
                        item.product.images[0]
                          ? Constants.BASE_URL + item.product.images[0].url
                          : "https://www.svgrepo.com/show/508699/landscape-placeholder.svg"
                      }
                      className="w-12 h-12 shadow-sm rounded-md"
                    />
                    <div className="flex flex-col w-full justify-between">
                      <div className="flex justify-between place-items-center h-3">
                        <span className=" text-sm font-semibold font-Poppins">
                          {item.product.display_name} ({item.amount} gab.)
                        </span>
                        <button
                          className=""
                          onClick={() => removeFromCart(item)}
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </div>
                      <div className="flex gap-2 font-poppins place-self-end">
                        {item.product.discount_pricing && (
                          <div className="line-through">
                            {(item.product.pricing * item.amount).toFixed(2)}
                            &euro;
                          </div>
                        )}
                        <span className="">
                          {item.product.discount_pricing
                            ? (
                                item.product.discount_pricing * item.amount
                              ).toFixed(2)
                            : (item.product.pricing * item.amount).toFixed(2)}
                          &euro;
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {cartItems?.length > 0 && (
        <li>
          <button
            onClick={() => navigate("/cart")}
            className="w-full py-3 bg-accent-brown flex gap-2 hover:gap-4 place-items-center justify-center hover:brightness-90 transition-all rounded-b-md"
          >
            <span className="font-bold text-lg text-dark-brown">Pirkt</span>
            <i className="fa-solid fa-arrow-right text-dark-brown text-xl"></i>
          </button>
        </li>
      )}
    </ul>
  );
};
