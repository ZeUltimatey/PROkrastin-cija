export const ProfileSettings = () => {
  return (
    <div className="bg-light-gray shadow-lg rounded-md p-8">
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
          <button className="text-medium-brown hover:underline text-sm font-poppins">
            Iestatīt
          </button>
        </li>
        <li>
          <p className="text-dark-brown font-poppins">Parole</p>
          <button className="text-medium-brown hover:underline text-sm font-poppins">
            Mainīt paroli
          </button>
        </li>
      </ul>
    </div>
  );
};
