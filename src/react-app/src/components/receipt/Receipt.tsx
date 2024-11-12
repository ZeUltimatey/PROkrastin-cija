interface IProduct {
  id: number;
  title: string;
  quantity: number;
  price: number;
}

export const Receipt = () => {
  const purchasedProducts: IProduct[] = [
    { id: 1, title: "Kaķu barība 1kg", quantity: 2, price: 12.99 },
    { id: 2, title: "Kaķu rotaļlieta", quantity: 1, price: 5.99 },
  ];

  return (
    <div className="flex min-h-screen bg-content-white">
      <div className="flex-1 p-8">
        <h2 className="text-4xl font-bold text-dark-brown mb-6">
          Pirkuma apstiprinājums - viss norisēja veiksmīgi!
        </h2>
        <p className="text-lg text-dark-brown mb-6">
          Paldies par jūsu pasūtījumu! Šeit ir jūsu pirkuma kopsavilkums:
        </p>

        <div className="border-t border-light-brown my-4"></div>

        <h3 className="text-2xl font-semibold text-dark-brown mb-4">
          Pirkuma detaļas
        </h3>
        <table className="w-full border-collapse mb-6">
          <thead>
            <tr className="border-b-2 border-light-brown">
              <th className="text-left text-dark-brown font-semibold py-4 w-1/2">
                Produkts
              </th>
              <th className="text-center text-dark-brown font-semibold py-4 w-1/4">
                Daudzums
              </th>
              <th className="text-right text-dark-brown font-semibold py-4 w-1/4 pr-6">
                Cena
              </th>
            </tr>
          </thead>
          <tbody>
            {purchasedProducts.map((product) => (
              <tr key={product.id} className="border-b border-light-brown">
                <td className="text-left py-4 text-dark-brown font-semibold">
                  {product.title}
                </td>
                <td className="text-center py-4 text-dark-brown">
                  {product.quantity}
                </td>
                <td className="text-right py-4 text-dark-brown pr-6">
                  {(product.price * product.quantity).toFixed(2)} EUR
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between items-center text-lg font-bold text-dark-brown mb-6">
          <span>Kopā apmaksai:</span>
          <span>31.97 EUR</span>
        </div>

        <div className="flex justify-between items-center text-lg font-bold text-dark-brown mb-4">
          <span>Pasūtijuma piegādes datums:</span>
          <span>24.10.2024.</span>
        </div>

        <button
          onClick={() => (window.location.href = "/")}
          className="bg-light-brown text-white px-6 py-3 rounded-md shadow hover:bg-medium-brown font-poppins text-lg mt-4"
        >
          Atpakaļ uz sākumlapu
        </button>
      </div>
    </div>
  );
};
