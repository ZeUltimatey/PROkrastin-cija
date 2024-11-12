import { useState } from "react";
import { useCart } from "../../universal/Cart";
import { IProduct } from "../../universal/interfaces/IProduct";

export const BuyButton = ({ product }: { product: IProduct }) => {
  const [count, setCount] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const { addToCart } = useCart();

  const countPlus = () => {
    setCount(count + 1);
  };

  const countMinus = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <button
          onClick={countMinus}
          className="bg-light-brown text-black font-bold w-10 h-10 rounded-l-md hover:bg-medium-brown"
        >
          <i className="fa-solid fa-minus text-[#3e2a19]"></i>
        </button>

        <input
          value={count}
          onChange={(e) => setCount(parseInt(e.target.value))}
          type="number"
          max={99}
          min={1}
          className="bg-content-white font-semibold w-10 h-10  text-lg text-center "
        />

        <button
          onClick={countPlus}
          className="bg-light-brown text-black font-bold w-10 h-10 rounded-r-md hover:bg-medium-brown"
        >
          <i className="fa-solid fa-plus text-[#3e2a19]"></i>
        </button>
      </div>
      <button
        disabled={isLoading}
        onClick={() => {
          addToCart(product, count);
        }}
        className={`${
          isLoading
            ? "bg-gray-200 hover:cursor-not-allowed"
            : "hover:cursor-pointer bg-medium-brown hover:bg-opacity-70"
        }   text-white px-6 py-2 rounded-md shadow font-poppins flex gap-2 place-items-center`}
      >
        <i className="fa-solid fa-cart-arrow-down"></i>Pievienot grozam
      </button>
    </div>
  );
};
