export const Statistics = () => {
    return (
      <div className="flex-1 bg-content-white">
        <header className="bg-content-white shadow p-8 border-b-2 border-medium-brown">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-dark-brown font-poppins">
              Statistika
            </h1>
            <div className="flex space-x-4">
              <button className="bg-medium-brown text-white px-4 py-2 rounded-lg font-poppins">
                Izdrukāt
              </button>
            </div>
          </div>
        </header>
        <main className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-light-gray p-6 shadow rounded-lg border-2 border-medium-brown">
              <h3 className="text-lg font-bold text-dark-brown font-poppins">
                Kopā pārdotais
              </h3>
              <p className="text-2xl mt-4 text-dark-brown">12,340 €</p>
            </div>
            <div className="bg-light-gray p-6 shadow rounded-lg border-2 border-medium-brown">
              <h3 className="text-lg font-bold text-dark-brown font-poppins">
                Pasūtījumi
              </h3>
              <p className="text-2xl mt-4 text-dark-brown">230</p>
            </div>
            <div className="bg-light-gray p-6 shadow rounded-lg border-2 border-medium-brown">
              <h3 className="text-lg font-bold text-dark-brown font-poppins">
                Pircēji
              </h3>
              <p className="text-2xl mt-4 text-dark-brown">1,204</p>
            </div>
            <div className="bg-light-gray p-6 shadow rounded-lg border-2 border-medium-brown">
              <h3 className="text-lg font-bold text-dark-brown font-poppins">
                Produkti
              </h3>
              <p className="text-2xl mt-4 text-dark-brown">567</p>
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