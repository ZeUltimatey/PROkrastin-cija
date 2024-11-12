import { useState } from "react";

interface IOrder {
  id: number;
  status: string;
  date: string;
  items: string[];
}

export const OrderHistory = () => {
  const [isOrderDetailsModalOpen, setIsOrderDetailsModalOpen] = useState(false);
  const [isAllOrdersModalOpen, setIsAllOrdersModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);

  const orders: IOrder[] = [
    {
      id: 12345,
      status: "Sūtīšans procesā",
      date: "26.09.2024.",
      items: [
        "Kaķu gulta",
        "Slapjā barība (1kg)",
        "Kaķu kārumi ar vistas garšu",
      ],
    },
    {
      id: 12344,
      status: "Saņemts",
      date: "21.08.2024.",
      items: ["Kaķu rotaļlieta - pele", "Sausā barība (10kg)", "Kaķu smiltis"],
    },
    {
      id: 12343,
      status: "Saņemts",
      date: "10.08.2024.",
      items: ["Siksniņa rozā krāsā", "Kaķu kārumi ar laša garšu"],
    },
  ];

  const handleOpenOrderDetails = (order: IOrder) => {
    setSelectedOrder(order);
    setIsOrderDetailsModalOpen(true);
  };

  const handleOpenAllOrders = () => {
    setIsAllOrdersModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsOrderDetailsModalOpen(false);
    setIsAllOrdersModalOpen(false);
  };

  return (
    <div className="bg-light-gray shadow-md rounded-md p-8 border-2 border-medium-brown">
      <h3 className="text-2xl font-bold text-dark-brown font-poppins mb-4">
        Pasūtījumu vēsture
      </h3>
      <ul className="space-y-4">
        {orders.slice(0, 2).map((order) => (
          <li key={order.id} className="border-b border-dark-brown pb-4">
            <p className="text-dark-brown font-poppins">
              Pasūtijums #{order.id} - {order.status}
            </p>
            <p className="text-sm text-dark-brown font-poppins">
              Pasūtīts: {order.date}
            </p>
            <button
              onClick={() => handleOpenOrderDetails(order)}
              className="text-medium-brown hover:underline text-sm font-poppins"
            >
              Apskatīt <i className="fa-solid fa-eye"></i>
            </button>
          </li>
        ))}
      </ul>
      <button
        onClick={handleOpenAllOrders}
        className="text-medium-brown hover:underline text-sm font-poppins mt-4"
      >
        Apskatīt visus sūtījumus <i className="fa-solid fa-eye"></i>
      </button>

      {isOrderDetailsModalOpen && selectedOrder && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-dark-brown font-poppins">
                Pasūtījuma detaļas
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-dark-brown rounded-full w-8 h-8 flex items-center justify-center"
              >
                <i className="fa-solid fa-x"></i>
              </button>
            </div>
            <p className="text-dark-brown font-poppins">
              Pasūtijums #{selectedOrder.id} - {selectedOrder.status}
            </p>
            <p className="text-sm text-dark-brown font-poppins mb-4">
              Pasūtīts: {selectedOrder.date}
            </p>
            <ul className="list-disc pl-5 space-y-2">
              {selectedOrder.items.map((item, index) => (
                <li
                  key={index}
                  className="text-sm text-dark-brown font-poppins"
                >
                  {item}
                </li>
              ))}
            </ul>
            <button
              onClick={handleCloseModal}
              className="bg-medium-brown text-white px-4 py-2 rounded-md shadow mt-4 font-poppins"
            >
              Aizvērt
            </button>
          </div>
        </div>
      )}

      {isAllOrdersModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-2/3 h-2/3 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-dark-brown font-poppins">
                Visu pasūtījumu vēsture
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-dark-brown rounded-full w-8 h-8 flex items-center justify-center"
              >
                <i className="fa-solid fa-x"></i>
              </button>
            </div>
            <ul className="space-y-4">
              {orders.map((order) => (
                <li key={order.id} className="border-b border-dark-brown pb-4">
                  <p className="text-dark-brown font-poppins">
                    Pasūtījums #{order.id} - {order.status}
                  </p>
                  <p className="text-sm text-dark-brown font-poppins">
                    Pasūtīts: {order.date}
                  </p>
                  <ul className="list-disc pl-5 space-y-1 mt-2">
                    {order.items.map((item, index) => (
                      <li
                        key={index}
                        className="text-sm text-dark-brown font-poppins"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
            <button
              onClick={handleCloseModal}
              className="bg-medium-brown text-white px-4 py-2 rounded-md shadow mt-4 font-poppins"
            >
              Aizvērt
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
