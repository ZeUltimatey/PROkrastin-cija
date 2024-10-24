import { Product } from "../Products";

export const ProductTable = ({
  products,
  onProductEdit,
  onProductDelete,
}: {
  products: (typeof Product)[];
  onProductEdit: (id: number) => void;
  onProductDelete: (id: number) => void;
}) => {
  return (
    <div className="w-full">
      <div className="w-full flex flex-col my-3 gap-2">
        <main className="p-8">
          <div className="bg-light-gray shadow rounded-lg border-2 border-medium-brown">
            <div className="p-6 border-b border-medium-brown">
              <h2 className="text-xl font-bold text-dark-brown font-poppins">
                Esošie produkti
              </h2>
            </div>

            <table className="w-full text-left font-poppins">
              <thead>
                <tr className="border-b border-medium-brown text-center">
                  <th className="py-4 px-6 font-poppins text-dark-brown">ID</th>
                  <th className="py-4 px-6 font-poppins text-dark-brown">
                    Bilde
                  </th>
                  <th className="py-4 px-6 font-poppins text-dark-brown">
                    Nosaukums
                  </th>
                  <th className="py-4 px-6 font-poppins text-dark-brown">
                    Cena
                  </th>
                  <th className="py-4 px-6 font-poppins text-dark-brown">
                    Daudzums
                  </th>
                  <th className="py-4 px-6 font-poppins text-dark-brown">
                    Darbības
                  </th>
                </tr>
              </thead>
              <tbody>
                {products &&
                  products.map((product) => (
                    <tr
                      className="border-b border-medium-brown text-center"
                      key={product.id}
                    >
                      <td className="py-4 px-6 text-dark-brown">
                        {product.id}
                      </td>
                      <td className="py-4 px-6 text-dark-brown">
                        <img
                          src={"/images/products/9.png"}
                          className="w-12 mx-auto shadow-md rounded-md"
                        />
                        {/*todo - add image*/}
                      </td>
                      <td className="py-4 px-6 text-dark-brown">
                        {product.display_name}
                      </td>
                      <td className="py-4 px-6 text-dark-brown">
                        {product.pricing}&euro;
                      </td>
                      <td className="py-4 px-6 text-dark-brown">
                        {product.stock}
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-center">
                          <button onClick={() => onProductEdit(product.id)}>
                            <i className="fa-solid fa-pen-to-square me-3 hover:text-accent-brown"></i>
                          </button>
                          <button onClick={() => onProductDelete(product.id)}>
                            <i className="fa-solid fa-trash hover:text-red-500"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};
