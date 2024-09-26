import { useState } from "react";
import { NavbarCart } from "./NavbarCart";

export const Navbar = () => {
  const [navbarToggle, setNavbarToggle] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [showCart, setShowCart] = useState(false);

  return (
    <nav className="bg-content-white rounded-t-md">
      <div className="h-20 flex items-center px-6 justify-between">
        {/* Paigaidu logo interneta veikalam */}
        <div className="w-32 lg:w-48 p-4">
          <a href="/">
            <img src={"../cat_logo.png"} alt="Murrātava" />
          </a>
        </div>

        <ul className="hidden h-20 md:flex text-lg gap-2 lg:text-xl font-semibold place-items-center font-hind">
          <li className="transition-all hover:cursor-pointer h-20 px-4 hover:border-b-4 border-accent-brown justify-center flex place-items-center">
            Kaķi
          </li>
          <li className="transition-all hover:cursor-pointer h-20 px-4 hover:border-b-4 border-accent-brown justify-center flex place-items-center">
            Barība
          </li>
          <li className="transition-all hover:cursor-pointer h-20 px-4 hover:border-b-4 border-accent-brown justify-center flex place-items-center">
            Rotaļlietas
          </li>
          <li className="transition-all hover:cursor-pointer h-20 px-4 hover:border-b-4 border-accent-brown justify-center flex place-items-center">
            Aksesuāri
          </li>
          <li
            onPointerEnter={() => setShowCategories(true)}
            onPointerLeave={() => setShowCategories(false)}
            className="transition-all hover:cursor-pointer h-20 px-4 hover:border-b-4 border-accent-brown justify-center flex place-items-center"
          >
            Kategorijas
            {showCategories && (
              <div className="h-12 absolute top-[104px] border-t-4 border-accent-brown shadow-sm">
                <ul className="flex text-base place-items-center h-full">
                  <li className="bg-content-white border-e-2 border-medium-gray brightness-95 hover:brightness-90 px-4 h-full flex place-items-center rounded-bl-md">
                    Kategorija
                  </li>
                  <li className="bg-content-white border-e-2 border-medium-gray brightness-95 hover:brightness-90 px-4 h-full flex place-items-center">
                    Kategorija
                  </li>
                  <li className="bg-content-white border-e-2 border-medium-gray brightness-95 hover:brightness-90 px-4 h-full flex place-items-center">
                    Kategorija
                  </li>
                  <li className="bg-content-white brightness-95 hover:brightness-90 px-4 h-full flex place-items-center rounded-br-md">
                    Kategorija
                  </li>
                </ul>
              </div>
            )}
          </li>
        </ul>
        {showCart && <NavbarCart />}

        <div className="flex justify-end h-full">
          <button
            onClick={() => {
              setShowCart(!showCart);
            }}
            className={`h-full px-6 hover:border-b-4 border-accent-brown ${
              showCart ? "border-b-4" : "border-b-0"
            } transition-all`}
          >
            <i className="fa-solid fa-basket-shopping text-xl lg:text-2xl"></i>
          </button>
          <button
            onClick={() => window.location.assign("/login")}
            className=" h-full px-6 hover:border-b-4 border-accent-brown transition-all"
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
        <ul className="md:hidden bg-content-white font-poppins text-lg font-semibold p-4">
          <li className="py-2 hover:cursor-pointer">Kaķi</li>
          <li className="py-2 hover:cursor-pointer">Barība</li>
          <li className="py-2 hover:cursor-pointer">Rotaļlietas</li>
          <li className="py-2 hover:cursor-pointer">Aksesuāri</li>
        </ul>
      )}
    </nav>
  );
};
