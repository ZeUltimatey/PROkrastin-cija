import { useState } from "react";

export const BuyButton = () => {
  const [count, setCount] = useState(1);

  const countPluss = () => {
    setCount(count + 1);
  };

  const countMinus = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  return (
    <div className="mt-6 text-left flex items-center">
      <button className="bg-[#C59D82] text-white px-6 py-3 text-lg rounded-xl shadow hover:bg-[#b38b6f]">
        Pievienot grozam
      </button>

      <div className="ml-4 flex items-center">
        <button
          onClick={countMinus}
          className="bg-[#C59D82] text-black font-bold rounded-l-md w-10 h-10 hover:bg-[#b38b6f]"
        >
          <i className="fa-solid fa-minus text-[#3e2a19]"></i>
        </button>

        <input
          value={count}
          onChange={(e) => setCount(parseInt(e.target.value))}
          type="number"
          max={99}
          min={1}
          className="bg-[#EDEAE1] font-semibold w-10 h-10  text-lg text-center "
        />

        <button
          onClick={countPlus}
          className="bg-[#C59D82] text-black w-10 h-10 font-bold rounded-r-md hover:bg-[#b38b6f]"
        >
          <i className="fa-solid fa-plus text-[#3e2a19]"></i>
        </button>
      </div>
      <button className="bg-[#C59D82] text-[#3e2a19] px-6 py-2.5 text-lg rounded-md font-poppins font-semibold hover:bg-[#b38b6f] transition-all">
        <i className="fa-solid fa-cart-shopping me-3"></i>Pievienot grozam
      </button>
    </div>
  );
};
