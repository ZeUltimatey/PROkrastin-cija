import { useState } from "react";

export const NavbarCart = () => {
  const [cartIsEmpty, setCartIsEmpty] = useState(true);
  return (
    <ul className="flex flex-col border-t-4 border-[#A67144] absolute w-[218px] right-[182px] top-[104px] justify-between shadow-sm">
      {cartIsEmpty && (
        <li className="bg-[#EDEAE1] w-full flex py-4 place-items-center justify-center flex-col gap-2 rounded-b-md">
          <span className="font-semibold text-lg">Nekā te nav!</span>{" "}
          <i className="fa-solid fa-bugs text-2xl"></i>
        </li>
      )}
      {!cartIsEmpty && (
        <li>
          <button className="w-full py-3 bg-[#A67144] flex gap-2 hover:gap-4 place-items-center justify-center hover:brightness-90 transition-all rounded-b-md">
            <span className="font-bold text-lg text-[#3e2a19]">Pirkt</span>
            <i className="fa-solid fa-arrow-right text-[#3e2a19] text-xl"></i>
          </button>
        </li>
      )}
    </ul>
  );
};
