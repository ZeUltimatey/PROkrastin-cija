import { ItemCard } from "../product/ItemCard";
import { useEffect, useState } from "react";
import { Filter } from "./catalog-page/Filter";
import { SearchSort } from "./catalog-page/SearchSort";
import { Constants } from "../universal/Constants";
import { Spinner } from "../universal/Spinner";
import { IProduct } from "../universal/interfaces/IProduct";
import { IQuery } from "../universal/IQuery";
import { CategoryNames } from "../universal/CategoryNames";
import { Pagination } from "../universal/Pagination";

export const Catalog = () => {
  const [sort, setSort] = useState({ popularity: "", price: "" });
  const [products, setProducts] = useState<IProduct[]>(null);
  const [filterUpdateTrigger, setFilterUpdateTrigger] = useState(0);
  const [pagination, setPagination] = useState(null);

  const fetchItems = async (url?: string) => {
    await fetch(
      `${Constants.API_URL}/products?${formatQueryParams(url) ?? ""}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then(async (response) => {
        if (response.ok) {
          const data = await response.json();
          setPagination(data.meta);
          if (data.length === 0) {
            setProducts([]);
            return;
          }
          setProducts(data.data);
        } else {
          throw new Error(response.statusText);
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const onSearch = (keyword: string) => {
    const query: IQuery = JSON.parse(
      localStorage.getItem(Constants.LOCAL_STORAGE.QUERY)
    );
    if (query) {
      query.keyword = keyword;
      localStorage.setItem(
        Constants.LOCAL_STORAGE.QUERY,
        JSON.stringify(query)
      );
      fetchItems();
      return;
    }
    const newQuery: IQuery = {
      keyword: keyword,
      product_type: "",
      min_price: 0,
      max_price: 9999999,
    };
    localStorage.setItem(
      Constants.LOCAL_STORAGE.QUERY,
      JSON.stringify(newQuery)
    );
  };

  const formatQueryParams = (url?: string) => {
    const query: IQuery = JSON.parse(
      localStorage.getItem(Constants.LOCAL_STORAGE.QUERY)
    );
    console.log("url", url?.split("=")[1]);
    if (query) {
      const categories = query.product_type
        .split(",")
        .map((type) => {
          const categoryKey = Object.keys(CategoryNames).find(
            (key) => CategoryNames[key as keyof typeof CategoryNames] === type
          );
          return categoryKey;
        })
        .join(",");
      return (
        url ??
        `keyword=${query.keyword ?? ""}&min_price=${
          query.min_price
        }&product_type=${categories}&max_price=${
          query.max_price == 0 ? 9999999 : query.max_price
        }`
      );
    }
  };

  const onFilterUpdate = () => {
    setFilterUpdateTrigger((prev) => prev + 1);
    fetchItems();
  };

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
            onSearch={onSearch}
            sortValues={sort}
            onSort={setSort}
            onFilterUpdate={onFilterUpdate}
            filterUpdateTrigger={filterUpdateTrigger}
          />
          <div className="mx-8 h-auto mb-6 flex flex-col place-items-center justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center gap-12">
              {products &&
                products?.map((product) => (
                  <ItemCard
                    key={product.id}
                    id={product.id}
                    display_name={product.display_name}
                    description={product.description}
                    pricing={product.pricing}
                    discount_pricing={product.discount_pricing}
                    product_type={product.product_type}
                    image_url={"../images/products/16.png"}
                  />
                ))}
            </div>
            {pagination && (
              <Pagination pagination={pagination} onNavigate={fetchItems} />
            )}
          </div>
          {products?.length === 0 && (
            <div className="place-self-center flex flex-col place-items-center gap-6 text-dark-brown font-semibold text-2xl font-poppins">
              Nekas netika atrasts :(
            </div>
          )}
          <div className="mx-auto">{products === null && <Spinner />}</div>
        </div>
        <Filter
          onFilterUpdate={onFilterUpdate}
          filterUpdateTrigger={filterUpdateTrigger}
        />
      </div>
    </div>
  );
};
