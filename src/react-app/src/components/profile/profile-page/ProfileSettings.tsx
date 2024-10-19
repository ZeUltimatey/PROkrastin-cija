import { useState } from "react";

export const ProfileSettings = () => {
  const [isPreferencesModalOpen, setIsPreferencesModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const handleOpenPreferences = () => {
    setIsPreferencesModalOpen(true);
  };

  const handleOpenPasswordChange = () => {
    setIsPasswordModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsPreferencesModalOpen(false);
    setIsPasswordModalOpen(false);
  };

  return (
    <div className="bg-light-gray shadow-md rounded-md p-8 border-2 border-medium-brown">
      <h3 className="text-2xl font-bold text-dark-brown font-poppins mb-4">
        Profila iestatījumi
      </h3>
      <ul className="space-y-4">
        <li>
          <p className="text-dark-brown font-poppins">E-pasta paziņojumi</p>
          <label className="inline-flex items-center mt-1">
            <input
              type="checkbox"
              className="form-checkbox text-medium-brown"
            />
            <span className="ml-2 text-dark-brown font-poppins">
              Saņemt e-pasta paziņojumus
            </span>
          </label>
        </li>
        <li>
          <p className="text-dark-brown font-poppins">Lietotāja preferences</p>
          <button
            onClick={handleOpenPreferences}
            className="text-medium-brown hover:underline text-sm font-poppins flex items-center"
          >
            <i className="fa-solid fa-pen-to-square m-1"></i> Iestatīt
          </button>
        </li>
        <li>
          <p className="text-dark-brown font-poppins">Parole</p>
          <button
            onClick={handleOpenPasswordChange}
            className="text-medium-brown hover:underline text-sm font-poppins flex items-center"
          >
            <i className="fa-solid fa-pen-to-square m-1"></i> Mainīt paroli
          </button>
        </li>
      </ul>

      {isPreferencesModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-dark-brown font-poppins">
                Lietotāja preferences
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-dark-brown rounded-full w-7 h-7 flex items-center justify-center"
              >
                <i className="fa-solid fa-x"></i>
              </button>
            </div>
            <form className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox text-medium-brown mr-2"
                />
                <label className="text-sm text-dark-brown font-poppins">
                  Vienmēr rādīt lētākos piedāvājumus
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox text-medium-brown mr-2"
                />
                <label className="text-sm text-dark-brown font-poppins">
                  Rādīt tikai bezmaksas piegādes piedāvājumus
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox text-medium-brown mr-2"
                />
                <label className="text-sm text-dark-brown font-poppins">
                  Rādīt tikai uzreiz pieejamos produktus
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox text-medium-brown mr-2"
                />
                <label className="text-sm text-dark-brown font-poppins">
                  Rādīt tikai vietējos ražotājus
                </label>
              </div>
              <div className="flex justify-end space-x-4 mt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="bg-light-gray text-dark-brown px-4 py-2 rounded-md shadow font-poppins"
                >
                  Atcelt
                </button>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="bg-medium-brown text-white px-6 py-2 rounded-md shadow font-poppins"
                >
                  Saglabāt
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isPasswordModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-dark-brown font-poppins">
                Mainīt paroli
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-dark-brown rounded-full w-7 h-7 flex items-center justify-center"
              >
                <i className="fa-solid fa-x"></i>
              </button>
            </div>
            <form className="space-y-4">
              <div>
                <label className="text-sm text-dark-brown font-poppins block mb-1">
                  Vecā parole
                </label>
                <input
                  type="password"
                  className="w-full border border-medium-brown rounded-md p-2"
                  placeholder="Ievadiet veco paroli"
                />
              </div>
              <div>
                <label className="text-sm text-dark-brown font-poppins block mb-1">
                  Jaunā parole
                </label>
                <input
                  type="password"
                  className="w-full border border-medium-brown rounded-md p-2"
                  placeholder="Ievadiet jauno paroli"
                />
              </div>
              <div>
                <label className="text-sm text-dark-brown font-poppins block mb-1">
                  Apstiprināt jauno paroli
                </label>
                <input
                  type="password"
                  className="w-full border border-medium-brown rounded-md p-2"
                  placeholder="Apstipriniet jauno paroli"
                />
              </div>
              <div className="flex justify-end space-x-4 mt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="bg-light-gray text-dark-brown px-4 py-2 rounded-md shadow font-poppins"
                >
                  Atcelt
                </button>
                <button
                  type="button"
                  onClick={handleCloseModal}
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
