import { useEffect, useState } from "react";
import { NavbarCart } from "./NavbarCart";
import { CategoryList } from "../homepage/categories/CategoryList";
import { Constants } from "./Constants";
import { useNavigate } from "react-router-dom";
import { useCart } from "./Cart";
import { IQuery } from "./IQuery";
import { IUser } from "./interfaces/IUser";
import { useToast } from "./Toast";

export const Navbar = () => {
  const [navbarToggle, setNavbarToggle] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [user, setUser] = useState<IUser>(null);

  const { fetchCart } = useCart();

  const showToast = useToast();

  const navigate = useNavigate();

  const Category = ({
    name,
    link,
    idx,
  }: {
    name: string;
    link: string;
    idx: number;
  }) => {
    const goToFilteredProducts = () => {
      const newQuery: IQuery = {
        keyword: "",
        product_type: name,
        min_price: 0,
        max_price: 9999999,
      };
      localStorage.setItem(
        Constants.LOCAL_STORAGE.QUERY_CATALOG,
        JSON.stringify(newQuery)
      );
      window.location.assign("/products");
    };
    return (
      <li
        key={idx}
        onClick={goToFilteredProducts}
        className={`${idx + 1 === CategoryList.length ? "rounded-br-md" : ""} ${
          idx === CategoryList.length - 3 ? "rounded-bl-md" : ""
        } bg-content-white border-[#d8d6ce] hover:brightness-90 px-4 min-w-24 text-center py-2 h-full`}
      >
        {name}
      </li>
    );
  };

  const handleUserClick = async () => {
    if (localStorage.getItem(Constants.LOCAL_STORAGE.TOKEN)) {
      navigate("/profile");
      return;
    }
    navigate("/auth/login");
  };

  const fetchUser = async () => {
    await fetch(`${Constants.API_URL}/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          Constants.LOCAL_STORAGE.TOKEN
        )}`,
      },
    }).then(async (response) => {
      if (response.ok) {
        const data = await response.json();
        setUser(data.data);
      }
    });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleCartHover = async () => {
    fetchCart();
    setShowCart(!showCart);
  };

  const handleLogout = async () => {
    await fetch(`${Constants.API_URL}/logout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          Constants.LOCAL_STORAGE.TOKEN
        )}`,
      },
    }).then((response) => {
      if (response.ok) {
        localStorage.removeItem(Constants.LOCAL_STORAGE.TOKEN);
        localStorage.removeItem(Constants.LOCAL_STORAGE.CART);
        showToast(true, "Iziešana veiksmīga.");
        window.location.assign("/");
      } else {
        showToast(false, "error");
      }
    });
  };
  return (
    <nav className="bg-content-white rounded-t-md">
      <div className="flex items-center justify-between h-20 gap-2 px-6">
        <div className="p-4 w-52">
          <a href="/">
            <img src={"../cat_logo.png"} alt="Murrātava" />
          </a>
        </div>
        <div className="hidden md:flex text-lg lg:text-xl font-semibold place-items-center grow border-[1.5px] rounded-full border-gray-300 has-[:focus]:border-gray-600">
          <div className="flex grow">
            <input
              placeholder="Meklēt visā Murrātavā..."
              type="text"
              className="text-xl h-12 px-6 w-[500px] font-semibold grow bg-[#f4f1e9] rounded-s-full focus:outline-none font-poppins"
            />
            <button className="bg-[#f4f1e9] text-2xl px-10 rounded-e-full h-12 flex place-items-center hover:bg-opacity-60">
              <i className="fa-solid fa-magnifying-glass "></i>
            </button>
          </div>
        </div>

        <div
          onPointerEnter={() => setShowCategories(true)}
          onPointerLeave={() => setShowCategories(false)}
          className="flex justify-center text-xl font-semibold group hover:cursor-pointer place-items-center"
        >
          <button
            onClick={() =>
              document
                .getElementById("categories")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="flex place-items-center gap-2 h-20 px-4 group-hover:border-b-4 border-[#A67144] transition-all"
          >
            <i className="text-2xl fa-solid fa-layer-group"></i>
            <span className="font-bold font-poppins">Kategorijas</span>
          </button>
          {showCategories && (
            <div className="h-12 absolute top-20 border-t-4 border-[#A67144] shadow-sm mt-6">
              <ul className="grid h-full grid-cols-3 text-base">
                {CategoryList.map((category, idx) => (
                  <Category
                    name={category.name}
                    link={category.link}
                    idx={idx}
                  />
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="flex h-full ">
          {user && user.user_role !== "Admin" && (
            <div
              onPointerEnter={handleCartHover}
              onPointerLeave={() => setShowCart(false)}
            >
              <button
                onClick={() => navigate("/cart")}
                className={`h-full px-6 hover:border-b-4 border-accent-brown ${
                  showCart ? "border-b-4" : "border-b-0"
                } transition-all`}
              >
                <i className="text-xl fa-solid fa-basket-shopping lg:text-2xl"></i>
              </button>
              {showCart && <NavbarCart />}
            </div>
          )}
          {user?.user_role === "Admin" && (
            <button
              onClick={() => navigate("/panel")}
              className={`h-full px-6 hover:border-b-4 border-accent-brown ${
                showCart ? "border-b-4" : "border-b-0"
              } transition-all`}
            >
              <i className="text-xl fa-solid fa-screwdriver-wrench lg:text-2xl"></i>
            </button>
          )}
          <button
            onClick={() => navigate("/breeds")}
            className={`h-full px-6 hover:border-b-4 border-accent-brown transition-all`}
          >
            <i className="text-xl fa-solid fa-book lg:text-2xl"></i>
          </button>
          <button
            onClick={() => handleUserClick()}
            className="h-full px-6 transition-all hover:border-b-4 border-accent-brown"
          >
            <i className="text-xl fa-solid fa-user lg:text-2xl"></i>
          </button>
          {user && (
            <button
              onClick={() => handleLogout()}
              className="h-full px-6 transition-all hover:border-b-4 border-accent-brown"
            >
              <i className="text-xl fa-solid fa-right-from-bracket lg:text-2xl"></i>
            </button>
          )}
        </div>

        <div className="flex items-center md:hidden">
          <i
            className="text-2xl fa-solid fa-bars"
            onClick={() => setNavbarToggle(!navbarToggle)}
          ></i>
        </div>
      </div>

      {/* {navbarToggle && (
        <ul className="p-4 text-lg font-semibold md:hidden bg-content-white font-poppins">
          <li key={} className="py-2 hover:cursor-pointer">Kaķi</li>
          <li className="py-2 hover:cursor-pointer">Barība</li>
          <li className="py-2 hover:cursor-pointer">Rotaļlietas</li>
          <li className="py-2 hover:cursor-pointer">Aksesuāri</li>
        </ul>
      )} */}
    </nav>
  );
};
