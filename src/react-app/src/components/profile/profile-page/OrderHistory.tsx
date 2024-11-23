import { useEffect, useState } from "react";
import { Constants } from "../../universal/Constants";
import { IOrder } from "../../panel/admin-panel/Orders";

export const OrderHistory = () => {
  const [isOrderDetailsModalOpen, setIsOrderDetailsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);

  const [orders, setOrders] = useState<IOrder[]>([]);

  const fetchOrders = async () => {
    await fetch(`${Constants.API_URL}/transactions`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          Constants.LOCAL_STORAGE.TOKEN
        )}`,
      },
    }).then(async (response) => {
      if (response.ok) {
        const data = await response.json();
        setOrders(data.data);
      }
    });
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // const orders: IOrder[] = [
  //   {
  //     id: 12345,
  //     status: "Sūtīšans procesā",
  //     date: "26.09.2024.",
  //     items: [
  //       "Kaķu gulta",
  //       "Slapjā barība (1kg)",
  //       "Kaķu kārumi ar vistas garšu",
  //     ],
  //   },
  //   {
  //     id: 12344,
  //     status: "Saņemts",
  //     date: "21.08.2024.",
  //     items: ["Kaķu rotaļlieta - pele", "Sausā barība (10kg)", "Kaķu smiltis"],
  //   },
  //   {
  //     id: 12343,
  //     status: "Saņemts",
  //     date: "10.08.2024.",
  //     items: ["Siksniņa rozā krāsā", "Kaķu kārumi ar laša garšu"],
  //   },
  // ];

  const handleOpenOrderDetails = (order: IOrder) => {
    setSelectedOrder(order);
    setIsOrderDetailsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsOrderDetailsModalOpen(false);
  };

  return (
    <div className="bg-light-gray shadow-md rounded-md p-8 border-2 border-medium-brown">
      <h3 className="text-2xl font-bold text-dark-brown font-poppins mb-4">
        Pasūtījumu vēsture
      </h3>
      <ul className="space-y-4 max-h-[400px] overflow-y-scroll">
        {orders.slice(0, 2).map((order) => (
          <li key={order.id} className="border-b border-dark-brown pb-4">
            <p className="text-dark-brown font-poppins">
              Pasūtijums #{order.id} - <strong>IZPILDĒ</strong>
            </p>
            <p className="text-sm text-dark-brown font-poppins">
              Pasūtīts: {order.created_at.slice(0, 10)}
            </p>
            <p className="text-sm text-dark-brown font-poppins">
              Summa: {order.total_pricing.toFixed(2)}&euro;
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

      {isOrderDetailsModalOpen && selectedOrder && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg lg:w-1/3">
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
            <div className="w-[260px]">{selectedOrder.check_content}</div>

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
