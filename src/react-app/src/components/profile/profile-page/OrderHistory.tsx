export const OrderHistory = () => {
  return (
    <div className="bg-light-gray shadow-lg rounded-md p-8">
      <h3 className="text-2xl font-bold text-dark-brown font-poppins mb-4">
        Pasūtījumu vēsture
      </h3>
      <ul className="space-y-4">
        <li className="border-b border-dark-brown pb-4">
          <p className="text-dark-brown font-poppins">
            Pasūtijums #12345 - Sūtīšans procesā
          </p>
          <p className="text-sm text-dark-brown font-poppins">
            Pasūtīts: 26.09.2024.
          </p>
          <a
            href=""
            className="text-medium-brown hover:underline text-sm font-poppins"
          >
            Apskatīt
          </a>
        </li>
        <li className="border-b border-dark-brown pb-4">
          <p className="text-dark-brown font-poppins">
            Pasūtijums #12344 - Saņemts
          </p>
          <p className="text-sm text-dark-brown font-poppins">
            Pasūtīts: 21.08.2024.
          </p>
          <a
            href=""
            className="text-medium-brown hover:underline text-sm font-poppins"
          >
            Apskatīt
          </a>
        </li>
      </ul>
      <a
        href=""
        className="text-medium-brown hover:underline text-sm font-poppins"
      >
        Apskatīt visus sūtījumus
      </a>
    </div>
  );
};
