import { useNavigate } from "react-router-dom";

export const Sidebar = () => {
  const navigate = useNavigate();

  const selectedTab = window.location.pathname.split("/")[2];

  return (
    <div className="flex min-h-screen rounded-md ">
      <aside className="lg:w-64 w-full text-white bg-light-gray">
        <div className="m-8 mb-8 text-2xl font-bold text-center font-poppins text-dark-brown">
          Murrātavas instrukcija
        </div>
        <nav>
          <ul className="space-y-4 font-semibold text-dark-brown font-poppins">
            <li
              onClick={() => navigate("/instruction/encyclopediause")}
              className={`${
                selectedTab === "encyclopediause"
                  ? " bg-medium-brown bg-opacity-90 "
                  : ""
              }hover:bg-medium-brown hover:text-white p-3 text-center cursor-pointer`}
            >
              Enciklopēdija
            </li>
            <li
              onClick={() => navigate("/instruction/profileedit")}
              className={`${
                selectedTab === "profileedit"
                  ? " bg-medium-brown bg-opacity-90 "
                  : ""
              }hover:bg-medium-brown hover:text-white p-3 text-center cursor-pointer`}
            >
              Profila rediģēšana
            </li>
            <li
              onClick={() => navigate("/instruction/orderhistory")}
              className={`${
                selectedTab === "orderhistory"
                  ? " bg-medium-brown bg-opacity-90 "
                  : ""
              }hover:bg-medium-brown hover:text-white p-3 text-center cursor-pointer`}
            >
              Pasūtīju vēsture
            </li>
            <li
              onClick={() => navigate("/instruction/savedaddresses")}
              className={`${
                selectedTab === "savedaddresses"
                  ? " bg-medium-brown bg-opacity-90 "
                  : ""
              }hover:bg-medium-brown hover:text-white p-3 text-center cursor-pointer`}
            >
              Saglabātās adreses
            </li>
            <li
              onClick={() => navigate("/instruction/paymethods")}
              className={`${
                selectedTab === "paymethods"
                  ? " bg-medium-brown bg-opacity-90 "
                  : ""
              }hover:bg-medium-brown hover:text-white p-3 text-center cursor-pointer`}
            >
              Maksājuma metodes
            </li>
            <li
              onClick={() => navigate("/instruction/profilesettings")}
              className={`${
                selectedTab === "profilesettings"
                  ? " bg-medium-brown bg-opacity-90 "
                  : ""
              }hover:bg-medium-brown hover:text-white p-3 text-center cursor-pointer`}
            >
              Profila iestatījumi
            </li>
            <li
              onClick={() => navigate("/instruction/buyinfo")}
              className={`${
                selectedTab === "buyinfo"
                  ? " bg-medium-brown bg-opacity-90 "
                  : ""
              }hover:bg-medium-brown hover:text-white p-3 text-center cursor-pointer`}
            >
              Pasūtījuma veikšana
            </li>
            <li
              onClick={() => navigate("/instruction/browseinfo")}
              className={`${
                selectedTab === "browseinfo"
                  ? " bg-medium-brown bg-opacity-90 "
                  : ""
              }hover:bg-medium-brown hover:text-white p-3 text-center cursor-pointer`}
            >
              Produktu apskate
            </li>
            <li
              onClick={() => navigate("/instruction/basketinfo")}
              className={`${
                selectedTab === "basketinfo"
                  ? " bg-medium-brown bg-opacity-90 "
                  : ""
              }hover:bg-medium-brown hover:text-white p-3 text-center cursor-pointer`}
            >
              Produkta pievienošana grozam
            </li>
            <li
              onClick={() => navigate("/instruction/contactuse")}
              className={`${
                selectedTab === "contactuse"
                  ? " bg-medium-brown bg-opacity-90 "
                  : ""
              }hover:bg-medium-brown hover:text-white p-3 text-center cursor-pointer`}
            >
              Sazināšanās forma
            </li>
          </ul>
        </nav>
      </aside>
    </div>
  );
};
