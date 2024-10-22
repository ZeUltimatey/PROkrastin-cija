import { useNavigate } from "react-router-dom";

export const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex rounded-md ">
      <aside className="w-64 bg-light-gray text-white p-8">
        <div className="text-2xl font-bold mb-8 font-poppins text-dark-brown">
          Administratora panelis
        </div>
        <nav>
          <ul className="space-y-4 text-dark-brown font-poppins">
            <li
              onClick={() => navigate("/panel")}
              className="hover:bg-medium-brown p-3 rounded-lg cursor-pointer"
            >
              Statistika
            </li>
            <li
              onClick={() => navigate("/panel/products")}
              className="hover:bg-medium-brown p-3 rounded-lg cursor-pointer"
            >
              Produkti
            </li>
            <li
              onClick={() => navigate("/panel/orders")}
              className="hover:bg-medium-brown p-3 rounded-lg cursor-pointer"
            >
              Pasūtijumi
            </li>
            <li
              onClick={() => navigate("/panel/users")}
              className="hover:bg-medium-brown p-3 rounded-lg cursor-pointer"
            >
              Lietotāji
            </li>

            <li
              onClick={() => navigate("/panel/encyclopedia")}
              className="hover:bg-medium-brown p-3 rounded-lg cursor-pointer"
            >
              Enciklopēdija
            </li>
          </ul>
        </nav>
      </aside>
    </div>
  );
};
