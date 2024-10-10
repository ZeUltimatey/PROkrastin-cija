import { useState } from "react";

export const ProfileInfo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-light-gray shadow-lg rounded-md p-8 border-2 border-medium-brown">
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
        <button
          onClick={handleEditClick}
          className="bg-light-brown text-white px-6 py-2.5 text-lg rounded-md shadow hover:bg-medium-brown transition-all font-poppins"
        >
          Rediģēt profilu
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
            <h2 className="text-2xl font-bold text-dark-brown font-poppins mb-4">
              Rediģēt Profila Informāciju
            </h2>
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
                  onClick={handleCloseModal}
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
