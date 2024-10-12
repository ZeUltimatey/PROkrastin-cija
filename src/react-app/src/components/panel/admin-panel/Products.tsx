import { useState } from "react";
import productsData from "../../../data/cat_items.json";
import { ItemCard } from "../../homepage/ItemCard";
import { Sidebar } from "../admin-panel/Sidebar";

export const Products = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); 

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 bg-content-white p-8">
        <h2 className="text-2xl font-bold text-dark-brown font-poppins mb-4">
          Preču Saraksts
        </h2>
        <button
          onClick={handleOpenModal} 
          className="bg-light-brown text-white px-6 py-2.5 text-lg rounded-md shadow hover:bg-medium-brown transition-all font-poppins"
        >
          <i className="fa-solid fa-plus"></i> Pievienot produktu
        </button>

        <div className="mt-6">
          <h3 className="text-xl font-semibold text-dark-brown font-poppins mb-4">
            Esošie Produkti
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center gap-12">
            {productsData.map((product) => (
              <ItemCard
                key={product.id}
                id={product.id}
                title={product.title}
                description={product.description}
                price={product.price}
                category={product.category}
                imageurl={product.image_url}
              />
            ))}
          </div>
        </div>

        {isModalOpen && ( 
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-1/3 relative overflow-auto max-h-[80vh]">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-dark-brown font-poppins">
                  Jauna Produkta Pievienošana
                </h2>
                <button
                  onClick={handleCloseModal} 
                  className="text-dark-brown rounded-full w-7 h-7 flex items-center justify-center"
                >
                  <i className="fa-solid fa-x"></i>
                </button>
              </div>
              <form className="space-y-4">
                <div>
                  <label className="text-sm text-dark-brown font-poppins block mb-1">
                    Produkta Nosaukums
                  </label>
                  <input
                    type="text"
                    className="w-full border border-medium-brown rounded-md p-2"
                    placeholder="Ievadiet produkta nosaukumu"
                  />
                </div>
                <div>
                  <label className="text-sm text-dark-brown font-poppins block mb-1">
                    Cena (EUR)
                  </label>
                  <input
                    type="number"
                    className="w-full border border-medium-brown rounded-md p-2"
                    placeholder="Ievadiet cenu"
                  />
                </div>
                <div>
                  <label className="text-sm text-dark-brown font-poppins block mb-1">
                    Apraksts
                  </label>
                  <textarea
                    className="w-full border border-medium-brown rounded-md p-2"
                    rows={4}
                    placeholder="Ievadiet aprakstu"
                  />
                </div>
                <div>
                  <label className="text-sm text-dark-brown font-poppins block mb-1">
                    Augšupielādēt attēlu
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    className="w-full border border-medium-brown rounded-md p-2"
                  />
                </div>
                <div className="flex justify-end space-x-4 mt-6">
                  <button
                    onClick={handleCloseModal} 
                    className="bg-light-gray text-dark-brown px-4 py-2 rounded-md shadow font-poppins"
                  >
                    Atcelt
                  </button>
                  <button className="bg-medium-brown text-white px-6 py-2 rounded-md shadow font-poppins">
                    Saglabāt
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
