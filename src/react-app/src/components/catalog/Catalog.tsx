import { ItemCard } from "../product/ItemCard";
import { useEffect, useState } from "react";
import { Filter } from "./catalog-page/Filter";
import { SearchSort } from "./catalog-page/SearchSort";
import { Constants } from "../universal/Constants";
import { Spinner } from "../universal/Spinner";

interface Product {
  id: number;
  product_type: string;
  display_name: string;
  description: string;
  pricing: number;
  discount_pricing: number;
}

export const Catalog = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState({ popularity: "", price: "" });
  const [products, setProducts] = useState<Product[]>();

  const fetchItems = async () => {
    await fetch(`${Constants.API_URL}/products`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (response) => {
        const data = await response.json();
        if (response.ok) {
          if (data.length === 0) {
            setProducts([]);
          }
          setProducts(data);
        } else {
          throw new Error(data.error);
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  useEffect(() => {
    fetchItems();
  }, []);

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
            filteredItemAmount={products?.length}
            onSearch={setSearch}
            inputValue={search}
            sortValues={sort}
            onSort={setSort}
          />
          <div className="mx-8 h-auto mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center gap-12">
              {products?.map((product) => (
                <ItemCard
                  key={product.id}
                  id={product.id}
                  title={product.display_name}
                  description={product.description}
                  price={product.pricing}
                  discount_price={product.discount_pricing}
                  category={product.product_type}
                  imageurl={"../images/products/16.png"}
                />
              ))}
            </div>
          </div>
          {products?.length === 0 && (
            <div className="place-self-center flex flex-col place-items-center gap-6 text-dark-brown font-semibold text-2xl font-poppins">
              Nekas netika atrasts :(
            </div>
          )}
          <div className="mx-auto">{products === undefined && <Spinner />}</div>
        </div>
        <Filter />
      </div>
    </div>
  );
};
