import { useEffect, useMemo, useState } from "react";
import { Constants } from "../../universal/Constants";
import { createColumnHelper } from "@tanstack/react-table";

export const Statistics = () => {
  const [statistics, setStatistics] = useState(null);
  const getStatistics = async () => {
    await fetch(`${Constants.API_URL}/dashboard`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          Constants.LOCAL_STORAGE.TOKEN
        )}`,
      },
    }).then(async (response) => {
      if (response.ok) {
        const data = await response.json();
        setStatistics(data);
      }
    });
  };

  useEffect(() => {
    getStatistics();
  }, []);

  // const columnHelper = createColumnHelper();

  // const columns = useMemo(
  //   () => [
  //     columnHelper.accessor("id", {
  //       header: "ID",
  //       cell: (info) => info.getValue(),
  //     }),
  //     columnHelper.accessor("display_name", {
  //       header: "Nosaukums",
  //       cell: (info) => info.getValue(),
  //     }),
  //     columnHelper.accessor("product_type", {
  //       header: "Produkta tips",
  //       cell: (info) =>
  //         ,
  //     }),
  //     columnHelper.accessor("pricing", {
  //       header: "Cena",
  //       cell: (info) => <div></div>,
  //     }),
  //     columnHelper.accessor("discount_pricing", {
  //       header: "Atlaide",
  //       cell: (info) => <div></div>,
  //     }),
  //     columnHelper.accessor("stock", {
  //       header: "Daudzums",
  //       cell: (info) => info.getValue(),
  //     }),

  //   ],
  //   []
  // );

  return (
    <div className="flex-1 bg-content-white">
      <header className="bg-content-white shadow p-8 border-b-2 border-medium-brown">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-dark-brown font-poppins">
            Statistika
          </h1>
          <button className="bg-medium-brown text-white px-4 min-w-48 hover:bg-opacity-85 transition-all py-2 rounded-lg font-poppins">
            <i className="fa-solid fa-print" /> Izdrukāt
          </button>
        </div>
      </header>
      <main className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-light-gray p-6 shadow rounded-lg border-2 border-medium-brown">
            <h3 className="text-lg font-bold text-dark-brown font-poppins">
              Kopā pārdotais
            </h3>
            <p className="text-2xl mt-4 text-dark-brown">
              {statistics?.earnings ?? 0}&euro;
            </p>
          </div>
          <div className="bg-light-gray p-6 shadow rounded-lg border-2 border-medium-brown">
            <h3 className="text-lg font-bold text-dark-brown font-poppins">
              Pasūtījumi
            </h3>
            <p className="text-2xl mt-4 text-dark-brown">
              {statistics?.transactions ?? 0}
            </p>
          </div>
          <div className="bg-light-gray p-6 shadow rounded-lg border-2 border-medium-brown">
            <h3 className="text-lg font-bold text-dark-brown font-poppins">
              Pircēji
            </h3>
            <p className="text-2xl mt-4 text-dark-brown">
              {statistics?.clients ?? 0}
            </p>
          </div>
          <div className="bg-light-gray p-6 shadow rounded-lg border-2 border-medium-brown">
            <h3 className="text-lg font-bold text-dark-brown font-poppins">
              Produkti
            </h3>
            <p className="text-2xl mt-4 text-dark-brown">
              {statistics?.products ?? 0}
            </p>
          </div>
        </div>
        <div className="bg-light-gray shadow rounded-lg mt-10 border-2 border-medium-brown">
          <div className="p-6 border-b border-medium-brown">
            <h2 className="text-xl font-bold text-dark-brown font-poppins">
              Nesenie pirkumi
            </h2>
          </div>
          <table className="w-full text-left ">
            <thead>
              <tr className="border-b border-medium-brown">
                <th className="py-4 px-6 font-poppins text-dark-brown">
                  Pasūtījuma ID
                </th>
                <th className="py-4 px-6 font-poppins text-dark-brown">
                  Klients
                </th>
                <th className="py-4 px-6 font-poppins text-dark-brown">
                  Summa
                </th>
                <th className="py-4 px-6 font-poppins text-dark-brown">
                  Statuss
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-medium-brown">
                <td className="py-4 px-6 text-dark-brown">#12345</td>
                <td className="py-4 px-6 text-dark-brown">Jānis Bērziņš</td>
                <td className="py-4 px-6 text-dark-brown">120.00 €</td>
                <td className="py-4 px-6 text-dark-brown">Apmaksāts</td>
              </tr>
              <tr className="border-b border-medium-brown">
                <td className="py-4 px-6 text-dark-brown">#12346</td>
                <td className="py-4 px-6 text-dark-brown">Krūms Zariņš</td>
                <td className="py-4 px-6 text-dark-brown">340.00 €</td>
                <td className="py-4 px-6 text-dark-brown">Apmaksāts</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};
