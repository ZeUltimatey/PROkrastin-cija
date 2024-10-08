import { useState } from "react";
import { Sidebar } from "./Sidebar";

interface Order {
  id: string;
  customerName: string;
  email: string;
  date: string;
  status: string;
  total: string;
}

export const Orders = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Function to handle opening the modal and showing order details
  const handleEditClick = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  // Function to handle closing the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  // Function to handle purchase cancellation
  const handleCancelOrder = () => {
    if (selectedOrder) {
      console.log(`Canceling order ${selectedOrder.id}`);
      // Perform cancellation logic here (e.g., API call)
      setIsModalOpen(false);
    }
  };

  const orders: Order[] = [
    {
      id: "#5001",
      customerName: "Anna Vītola",
      email: "anna@epasts.com",
      date: "2024-01-15",
      status: "Veiksmīgs",
      total: "$120.00",
    },
    {
      id: "#5002",
      customerName: "Jānis Bērziņš",
      email: "janis@epasts.com",
      date: "2024-02-20",
      status: "Sūtīšans procesā",
      total: "$85.00",
    },
    {
      id: "#5003",
      customerName: "Laura Kalniņa",
      email: "laura@epasts.com",
      date: "2024-03-12",
      status: "Atcelts",
      total: "$0.00",
    },
  ];

  return (
    <div className="min-h-screen flex bg-content-white">
      <Sidebar />

      <div className="flex-1">
        <header className="bg-content-white shadow p-8 border-b-2 border-medium-brown">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-dark-brown font-poppins">
              Pasūtījumi
            </h1>
            <div className="flex space-x-4">
              <button className="bg-medium-brown text-white px-4 py-2 rounded-lg font-poppins">
                Pievienot pasūtījumu
              </button>
            </div>
          </div>
        </header>

        <main className="p-8">
          <div className="bg-light-gray shadow rounded-lg border-2 border-medium-brown">
            <div className="p-6 border-b border-medium-brown">
              <h2 className="text-xl font-bold text-dark-brown font-poppins">
                Visi pasūtījumi
              </h2>
            </div>

            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-medium-brown">
                  <th className="py-4 px-6 font-poppins text-dark-brown">
                    Pasūtījuma ID
                  </th>
                  <th className="py-4 px-6 font-poppins text-dark-brown">
                    Klienta vārds
                  </th>
                  <th className="py-4 px-6 font-poppins text-dark-brown">
                    E-pasts
                  </th>
                  <th className="py-4 px-6 font-poppins text-dark-brown">
                    Datums
                  </th>
                  <th className="py-4 px-6 font-poppins text-dark-brown">
                    Statuss
                  </th>
                  <th className="py-4 px-6 font-poppins text-dark-brown">
                    Kopā
                  </th>
                  <th className="py-4 px-6 font-poppins text-dark-brown">
                    Apskatīt
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr className="border-b border-medium-brown" key={order.id}>
                    <td className="py-4 px-6 text-dark-brown">{order.id}</td>
                    <td className="py-4 px-6 text-dark-brown">
                      {order.customerName}
                    </td>
                    <td className="py-4 px-6 text-dark-brown">{order.email}</td>
                    <td className="py-4 px-6 text-dark-brown">{order.date}</td>
                    <td className="py-4 px-6 text-dark-brown">
                      {order.status}
                    </td>
                    <td className="py-4 px-6 text-dark-brown">{order.total}</td>
                    <td className="py-4 px-6">
                      <button
                        onClick={() => handleEditClick(order)}
                        className="bg-medium-brown text-white px-4 py-2 rounded-lg font-poppins"
                      >
                        Apskatīt
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
            <h2 className="text-2xl font-bold text-dark-brown mb-4 font-poppins">
              Pasūtījuma detaļas
            </h2>
            <div>
              <p className="mb-4">
                <span className="font-bold text-dark-brown">
                  Pasūtījuma ID:
                </span>{" "}
                {selectedOrder.id}
              </p>
              <p className="mb-4">
                <span className="font-bold text-dark-brown">
                  Klienta vārds:
                </span>{" "}
                {selectedOrder.customerName}
              </p>
              <p className="mb-4">
                <span className="font-bold text-dark-brown">E-pasts:</span>{" "}
                {selectedOrder.email}
              </p>
              <p className="mb-4">
                <span className="font-bold text-dark-brown">Datums:</span>{" "}
                {selectedOrder.date}
              </p>
              <p className="mb-4">
                <span className="font-bold text-dark-brown">Statuss:</span>{" "}
                {selectedOrder.status}
              </p>
              <p className="mb-4">
                <span className="font-bold text-dark-brown">Kopā:</span>{" "}
                {selectedOrder.total}
              </p>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                className="bg-light-gray text-dark-brown px-4 py-2 rounded-md shadow font-poppins"
                onClick={closeModal}
              >
                Aizvērt
              </button>
              {selectedOrder.status !== "Cancelled" && (
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded-lg font-poppins"
                  onClick={handleCancelOrder}
                >
                  Atcelt pasūtījumu
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
