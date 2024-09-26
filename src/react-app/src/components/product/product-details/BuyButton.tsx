import { useState } from "react";

export const BuyButton = () => {
  const [count, setCount] = useState(1);

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
          className="bg-light-brown text-black font-bold px-3 py-2 rounded-l-xl hover:bg-medium-brown"
        >
          -
        </button>

        <div className="bg-white border font-semibold px-4 py-2 text-lg text-center">
          {count}
        </div>

        <button
          onClick={countPlus}
          className="bg-light-brown text-black font-bold px-3 py-2 rounded-r-xl hover:bg-medium-brown"
        >
          +
        </button>
      </div>
      <button className="bg-light-brown text-white px-6 py-3 text-lg rounded-xl shadow hover:bg-medium-brown">
        Pievienot grozam
      </button>
    </div>
  );
};
