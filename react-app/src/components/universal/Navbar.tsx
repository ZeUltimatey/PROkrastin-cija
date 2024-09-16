import { useState } from "react";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-[#EDEAE1] rounded-t-md">
      <div className="h-20 flex items-center px-6 lg:px-12 justify-between">
        {/* Paigaidu logo interneta veikalam */}
        <div className="w-32 lg:w-48">
          <img src={"../cat_logo.png"} alt="Murrātava" className="h-12" />
        </div>

        <ul className="hidden md:flex gap-6 lg:gap-12 font-playpen text-lg lg:text-xl font-semibold">
          <li className="hover:cursor-pointer">Kaķi</li>
          <li className="hover:cursor-pointer">Barība</li>
          <li className="hover:cursor-pointer">Rotaļlietas</li>
          <li className="hover:cursor-pointer">Aksesuāri</li>
        </ul>

        <div className="flex gap-6 lg:gap-12 w-32 lg:w-48 justify-end">
          <i className="fa-solid fa-basket-shopping text-xl lg:text-2xl"></i>
          <button className="hover:bg-[#7AC74F] ">
          <i className="fa-solid fa-user text-xl lg:text-2xl "></i>
          </button>
        </div>

        <div className="md:hidden flex items-center">
          <i className="fa-solid fa-bars text-2xl" onClick={toggleDropdown}></i>
        </div>
      </div>
      {isOpen && (
        <ul className="md:hidden bg-[#EDEAE1] font-poppins text-lg font-semibold p-4">
          <li className="py-2 hover:cursor-pointer">Kaķi</li>
          <li className="py-2 hover:cursor-pointer">Barība</li>
          <li className="py-2 hover:cursor-pointer">Rotaļlietas</li>
          <li className="py-2 hover:cursor-pointer">Aksesuāri</li>
        </ul>
      )}
    </nav>
  );
};
