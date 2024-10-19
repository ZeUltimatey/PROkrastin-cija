import { useState } from "react";
import { Constants } from "../../universal/Constants";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../universal/Toast";

export const ProfileInfo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showToast = useToast();

  const navigate = useNavigate();

  const handleLogoutClick = async () => {
    await fetch(`${Constants.API_URL}/logout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem(
          Constants.SESSION_STORAGE.TOKEN
        )}`,
      },
    }).then((response) => {
      if (response.ok) {
        sessionStorage.removeItem(Constants.SESSION_STORAGE.TOKEN);
        navigate("/");
      } else {
        showToast(false, "pizda");
      }
    });
  };

  return (
    <div className="bg-light-gray shadow-md rounded-md p-8 border-2 border-medium-brown">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <img
            className="w-24 h-24 rounded-full object-cover border-4 border-medium-brown"
            src="https://via.placeholder.com/150"
            alt="Lietotāja attēls"
          />
          <div>
            <h2 className="text-3xl font-bold text-dark-brown font-poppins">
              Jānis Bērziņš
            </h2>
            <p className="text-sm text-dark-brown font-poppins">
              janis.berzins@gmail.com
            </p>
            <p className="text-sm text-dark-brown font-poppins">
              Pircējs kopš: 23.01.1999.
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleLogoutClick}
            className="bg-light-brown text-white px-6 py-2.5 text-lg rounded-md shadow hover:bg-medium-brown transition-all font-poppins"
          >
            <i className="fa-solid fa-right-from-bracket"></i> Iziet
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-light-brown text-white px-6 py-2.5 text-lg rounded-md shadow hover:bg-medium-brown transition-all font-poppins"
          >
            <i className="fa-solid fa-pen-to-square"></i> Rediģēt profilu
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-1/3 relative">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-dark-brown font-poppins">
                Rediģēt Profila Informāciju
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-dark-brown rounded-full w-7 h-7 flex items-center justify-center"
              >
                <i className="fa-solid fa-x"></i>
              </button>
            </div>
            <form className="space-y-4">
              <div>
                <label className="text-sm text-dark-brown font-poppins block mb-1">
                  Vārds un Uzvārds
                </label>
                <input
                  type="text"
                  defaultValue="Jānis Bērziņš"
                  className="w-full border border-medium-brown rounded-md p-2"
                />
              </div>
              <div>
                <label className="text-sm text-dark-brown font-poppins block mb-1">
                  E-pasts
                </label>
                <input
                  type="email"
                  defaultValue="janis.berzins@gmail.com"
                  className="w-full border border-medium-brown rounded-md p-2"
                />
              </div>

              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-light-gray text-dark-brown px-4 py-2 rounded-md shadow font-poppins"
                >
                  Atcelt
                </button>
                <button
                  type="submit"
                  className="bg-medium-brown text-white px-6 py-2 rounded-md shadow font-poppins"
                >
                  Saglabāt
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
