import products from "../../data/cat_items.json";
import { Navbar } from "../universal/Navbar";
import { ItemCard } from "../homepage/ItemCard";
import { useState } from "react";
import { Filter } from "./catalog-page/Filter";

export const Catalog = () => {
  const [search, setSearch] = useState("");

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-light-gray">
      <div className="flex flex-col gap-6 mb-6">
        <img
          src="../cat_bg.jpg"
          alt="bildite"
          className="w-full h-72 object-cover"
        />
      </div>
      <div className="flex flex-col lg:flex-row gap-6 p-8">
        <div className="flex flex-col grow">
          <div className="hidden md:flex text-lg lg:text-xl font-semibold place-items-center grow border-[1.5px] rounded-full border-gray-300 focus-within:border-gray-600 mb-6">
            <div className="flex grow">
              <input
                placeholder="Meklēt..."
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="text-xl h-12 px-6 w-[600px] font-semibold grow bg-[#f4f1e9] rounded-s-full focus:outline-none font-poppins"
              />
              <button className="bg-[#f4f1e9] text-2xl px-10 rounded-e-full h-12 flex place-items-center hover:bg-opacity-60">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>
          </div>
          <div className="px-16 h-auto mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center gap-12">
              {filteredProducts.map((product) => (
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
        </div>
        <Filter />
      </div>
    </div>
  );
};
