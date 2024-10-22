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
      <button className="bg-light-brown text-white px-6 py-2.5 text-lg rounded-md font-poppins shadow hover:bg-medium-brown transition-all">
        Pievienot grozam
      </button>
    </div>
  );
};
