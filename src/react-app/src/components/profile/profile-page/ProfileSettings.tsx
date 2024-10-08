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
    <div className="bg-light-gray shadow-lg rounded-md p-8 border-2 border-medium-brown">
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
            className="text-medium-brown hover:underline text-sm font-poppins"
          >
            Iestatīt
          </button>
        </li>
        <li>
          <p className="text-dark-brown font-poppins">Parole</p>
          <button
            onClick={handleOpenPasswordChange}
            className="text-medium-brown hover:underline text-sm font-poppins"
          >
            Mainīt paroli
          </button>
        </li>
      </ul>

      {isPreferencesModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
            <h2 className="text-2xl font-bold text-dark-brown font-poppins mb-4">
              Lietotāja preferences
            </h2>
            <div className="space-y-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox text-medium-brown"
                />
                <span className="ml-2 text-dark-brown font-poppins">
                  Vienmēr rādīt lētākos piedāvājumus
                </span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox text-medium-brown"
                />
                <span className="ml-2 text-dark-brown font-poppins">
                  Rādīt tikai bezmaksas piegādes piedāvājumus
                </span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox text-medium-brown"
                />
                <span className="ml-2 text-dark-brown font-poppins">
                  Rādīt tikai uzreiz pieejamos produktus
                </span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox text-medium-brown"
                />
                <span className="ml-2 text-dark-brown font-poppins">
                  Rādīt tikai vietējos ražotājus
                </span>
              </label>
               <div className="flex justify-end space-x-4 mt-6">
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
          </div>
        </div>
        </div>
      )}

      {isPasswordModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
            <h2 className="text-2xl font-bold text-dark-brown font-poppins mb-4">
              Mainīt paroli
            </h2>
            <div className="space-y-4">
              <label className="block">
                <span className="text-dark-brown font-poppins">
                  Vecā parole:
                </span>
                <input
                  type="password"
                  className="form-input mt-1 block w-full text-dark-brown border border-medium-brown rounded-md"
                />
              </label>
              <label className="block">
                <span className="text-dark-brown font-poppins">
                  Jaunā parole:
                </span>
                <input
                  type="password"
                  className="form-input mt-1 block w-full text-dark-brown border border-medium-brown rounded-md"
                />
              </label>
              <label className="block">
                <span className="text-dark-brown font-poppins">
                  Apstiprināt jauno paroli:
                </span>
                <input
                  type="password"
                  className="form-input mt-1 block w-full text-dark-brown border border-medium-brown rounded-md"
                />
              </label>
              <div className="flex justify-end space-x-4 mt-6">
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
