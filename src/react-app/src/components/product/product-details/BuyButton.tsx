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
          className="bg-[#C59D82] text-black font-bold px-3 py-2 rounded-l-xl hover:bg-[#b38b6f]"
        >
          -
        </button>

        <div className="bg-white border font-semibold px-4 py-2 text-lg text-center">
          {count}
        </div>

        <button
          onClick={countPlus}
          className="bg-[#C59D82] text-black font-bold px-3 py-2 rounded-r-xl hover:bg-[#b38b6f]"
        >
          +
        </button>
      </div>
      <button className="bg-[#C59D82] text-white px-6 py-3 text-lg rounded-xl shadow hover:bg-[#b38b6f]">
        Pievienot grozam
      </button>
    </div>
  );
};
