import { useState } from "react";

export const SavedAddresses = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addresses, setAddresses] = useState([
    { label: "Pirmā adrese", address: "Čaka iela 69, Rīga" },
    { label: "Otrā adrese", address: "Lienes iela 69, Rīga" },
  ]);
  const [newAddress, setNewAddress] = useState({ label: "", address: "" });

  const handleAddNewAddress = () => {
    setIsModalOpen(true);
  };

  const handleSaveAddress = () => {
    if (newAddress.label && newAddress.address) {
      setAddresses([...addresses, newAddress]);
      setNewAddress({ label: "", address: "" });
      setIsModalOpen(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-light-gray shadow-lg rounded-md p-8 border-2 border-medium-brown">
      <h3 className="text-2xl font-bold text-dark-brown font-poppins mb-4">
        Saglabātās adreses
      </h3>
      <ul className="space-y-4">
        {addresses.map((address, index) => (
          <li key={index} className="border-b border-dark-brown pb-4">
            <p className="text-dark-brown font-poppins">{address.label}</p>
            <p className="text-sm text-dark-brown font-poppins">
              {address.address}
            </p>
            <button className="text-red-600 hover:underline text-sm font-poppins">
              Dzēst
            </button>
          </li>
        ))}
      </ul>
      <button
        onClick={handleAddNewAddress}
        className="bg-light-brown text-white px-6 py-2.5 text-lg rounded-md shadow hover:bg-medium-brown transition-all font-poppins mt-4"
      >
        Pievienot jaunu
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
            <h2 className="text-2xl font-bold text-dark-brown font-poppins mb-4">
              Pievienot jaunu adresi
            </h2>
            <form className="space-y-4">
              <div>
                <label className="text-sm text-dark-brown font-poppins block mb-1">
                  Adreses Nosaukums
                </label>
                <input
                  type="text"
                  value={newAddress.label}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, label: e.target.value })
                  }
                  className="w-full border border-medium-brown rounded-md p-2"
                  placeholder="Piem., Mājas adrese"
                />
              </div>
              <div>
                <label className="text-sm text-dark-brown font-poppins block mb-1">
                  Adrese
                </label>
                <input
                  type="text"
                  value={newAddress.address}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, address: e.target.value })
                  }
                  className="w-full border border-medium-brown rounded-md p-2"
                  placeholder="Piem., Čaka iela 69, Rīga"
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
                  type="button"
                  onClick={handleSaveAddress}
                  className="bg-medium-brown text-white px-6 py-2 rounded-md shadow font-poppins"
                >
                  Pievienot
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
