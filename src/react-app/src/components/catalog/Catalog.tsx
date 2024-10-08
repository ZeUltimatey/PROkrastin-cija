import products from "../../data/cat_items.json";
import { ItemCard } from "../homepage/ItemCard";
import { useState } from "react";
import { Filter } from "./catalog-page/Filter";
import { SearchSort } from "./catalog-page/SearchSort";

export const Catalog = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState({ popularity: "", price: "" });

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-light-gray">
      <div className="">
        <div className="w-full h-80 object-cover bg-temp-bg-image bg-cover p-12 flex flex-col gap-2">
          <span className="text-6xl font-baloo text-dark-brown font-bold">
            Preču katalogs
          </span>
          <p className="text-xl font-hind text-dark-brown font-medium brightness-150 w-1/2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia quos
            suscipit adipisci aperiam soluta. Laborum fugit eveniet corrupti
            commodi quas.
          </p>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-6 p-8">
        <div className="flex flex-col grow gap-1">
          <SearchSort
            filteredItemAmount={filteredProducts.length}
            onSearch={setSearch}
            inputValue={search}
            sortValues={sort}
            onSort={setSort}
          />
          <div className="mx-8 h-auto mb-6">
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
          {filteredProducts.length === 0 && (
            <div className="place-self-center flex flex-col place-items-center gap-6 text-dark-brown font-semibold text-2xl font-poppins">
              Nekas netika atrasts :(
            </div>
          )}
        </div>
        <Filter />
      </div>
    </div>
  );
};
