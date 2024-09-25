import { useState } from "react";
import { NavbarCart } from "./NavbarCart";

export const Navbar = () => {
  const [navbarToggle, setNavbarToggle] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [showCart, setShowCart] = useState(false);

  return (
    <nav className="bg-[#EDEAE1] rounded-t-md">
      <div className="h-20 flex items-center px-6 gap-2">
        <div className="w-32 lg:w-48 p-4">
          <a href="/">
            <img src={"../cat_logo.png"} alt="Murrātava" />
          </a>
        </div>

        <div className="hidden md:flex text-lg lg:text-xl font-semibold place-items-center grow border-[1.5px] rounded-full border-gray-300 has-[:focus]:border-gray-600">
          <div className="flex grow">
            <input
              placeholder="Meklēt..."
              type="text"
              className="text-xl h-12 px-6 w-[600px] font-semibold grow bg-[#F9F6EC] rounded-s-full focus:outline-none font-poppins"
            />
            <button className="bg-[#F9F6EC] text-2xl px-10 rounded-e-full h-12 flex place-items-center hover:bg-opacity-60">
              <i className="fa-solid fa-magnifying-glass "></i>
            </button>
          </div>
        </div>

        <div
          onPointerEnter={() => setShowCategories(true)}
          onPointerLeave={() => setShowCategories(false)}
          className="transition-all  hover:cursor-pointer h-20 px-4 font-semibold text-xl hover:border-b-4 border-[#A67144] justify-center flex place-items-center"
        >
          <span className="flex place-items-center gap-2">
            <i className="fa-solid fa-layer-group text-2xl"></i>
            <span className="font-bold font-poppins">Kategorijas</span>
          </span>
          {showCategories && (
            <div className="h-12 absolute top-[104px] border-t-4 border-[#A67144] shadow-sm">
              <ul className="flex text-base place-items-center h-full">
                <li className="bg-[#EDEAE1] border-e-2 border-[#d8d6ce] brightness-95 hover:brightness-90 px-4 h-full flex place-items-center rounded-bl-md">
                  Kategorija
                </li>
                <li className="bg-[#EDEAE1] border-e-2 border-[#d8d6ce] brightness-95 hover:brightness-90 px-4 h-full flex place-items-center">
                  Kategorija
                </li>
                <li className="bg-[#EDEAE1] border-e-2 border-[#d8d6ce] brightness-95 hover:brightness-90 px-4 h-full flex place-items-center">
                  Kategorija
                </li>
                <li className="bg-[#EDEAE1] brightness-95 hover:brightness-90 px-4 h-full flex place-items-center rounded-br-md">
                  Kategorija
                </li>
              </ul>
            </div>
          )}
        </div>
        {showCart && <NavbarCart />}

        <div className="flex h-full ">
          <button
            onClick={() => {
              setShowCart(!showCart);
            }}
            className={`h-full px-6 hover:border-b-4 border-[#A67144] ${
              showCart ? "border-b-4" : "border-b-0"
            } transition-all`}
          >
            <i className="fa-solid fa-basket-shopping text-xl lg:text-2xl"></i>
          </button>
          <button
            onClick={() => window.location.assign("/login")}
            className=" h-full px-6 hover:border-b-4 border-[#A67144] transition-all"
          >
            <i className="fa-solid fa-user text-xl lg:text-2xl"></i>
          </button>
        </div>

        <div className="md:hidden flex items-center">
          <i
            className="fa-solid fa-bars text-2xl"
            onClick={() => setNavbarToggle(!navbarToggle)}
          ></i>
        </div>
      </div>

      {navbarToggle && (
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
