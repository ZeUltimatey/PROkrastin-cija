export const PaymentMethods = () => {
  return (
    <div className="bg-light-gray shadow-lg rounded-md p-8">
      <h3 className="text-2xl font-bold text-dark-brown font-poppins mb-4">
        Saglabātās maksājumu metodes
      </h3>
      <ul className="space-y-4">
        <li className="border-b border-dark-brown pb-4">
          <p className="text-dark-brown font-poppins">
            Visa - **** **** **** 1234
          </p>
          <p className="text-sm text-dark-brown font-poppins">Beidzas: 08/26</p>
          <button className="text-red-600 hover:underline text-sm font-poppins">
            Dzēst
          </button>
        </li>
        <li className="border-b border-dark-brown pb-4">
          <p className="text-dark-brown font-poppins">
            Mastercard - **** **** **** 5678
          </p>
          <p className="text-sm text-dark-brown font-poppins">Beidzas: 12/25</p>
          <button className="text-red-600 hover:underline text-sm font-poppins">
            Dzēst
          </button>
        </li>
      </ul>
      <button className="bg-light-brown text-white px-6 py-2.5 text-lg rounded-md shadow hover:bg-medium-brown transition-all font-poppins mt-4">
        Pievienot jaunu
      </button>
    </div>
  );
};
