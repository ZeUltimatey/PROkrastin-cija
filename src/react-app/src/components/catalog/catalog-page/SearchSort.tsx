import { useEffect, useState } from "react";
import { IQuery } from "../../universal/IQuery";
import { Constants } from "../../universal/Constants";

type Sort = {
  price: string;
  popularity: string;
};
interface IProps {
  onSearch: (value: string) => void;
  onSort: (value: Sort) => void;
  onFilterUpdate: () => void;
  sortValues: Sort;
  filteredItemAmount?: number;
  filterUpdateTrigger?: number;
}

export const SearchSort = (props: IProps) => {
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState<IQuery>(
    JSON.parse(localStorage.getItem(Constants.LOCAL_STORAGE.QUERY)) ?? null
  );

  useEffect(() => {
    const savedQuery = localStorage.getItem(Constants.LOCAL_STORAGE.QUERY);
    if (savedQuery) {
      setQuery(JSON.parse(savedQuery));
    }
  }, [props.filterUpdateTrigger]);

  const updateQueryAndStorage = (newQuery: IQuery) => {
    setQuery(newQuery);
    localStorage.setItem(
      Constants.LOCAL_STORAGE.QUERY,
      JSON.stringify(newQuery)
    );
    props.onFilterUpdate();
  };

  const removePriceFilter = () => {
    const newQuery: IQuery = { ...query, min_price: 0, max_price: 0 };
    updateQueryAndStorage(newQuery);
  };

  const removeKeywordFilter = () => {
    const newQuery: IQuery = { ...query, keyword: "" };
    updateQueryAndStorage(newQuery);
    setSearch("");
  };

  const removeTypeFilter = (type: string) => {
    const newQuery: IQuery = {
      ...query,
      product_type: query.product_type
        .split(",")
        .filter((t) => t !== type)
        .join(","),
    };
    updateQueryAndStorage(newQuery);
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    const newQuery: IQuery = { ...query, keyword: value };
    updateQueryAndStorage(newQuery);
    props.onSearch(value);
  };

  const getQuery = () => {
    if (query) {
      return (
        <div className="flex gap-2 font-poppins">
          {query.product_type &&
            query.product_type.split(",").map((type) => (
              <div
                className="bg-medium-brown bg-opacity-40 shadow-sm flex gap-2 py-2 px-4 rounded-md place-items-center justify-center"
                key={type}
              >
                {type}
                <button onClick={() => removeTypeFilter(type)}>
                  <i className="fa-solid fa-xmark text-sm"></i>
                </button>
              </div>
            ))}
          {(query.min_price > 0 || query.max_price > 0) && (
            <div className="bg-medium-brown bg-opacity-40 shadow-sm flex gap-2 py-2 px-4 rounded-md place-items-center justify-center">
              Cena: {query.min_price ?? 0}&euro; -{" "}
              {query.max_price == 9999999 || query.max_price == 0
                ? " max "
                : query.max_price}
              &euro;
              <button onClick={removePriceFilter}>
                <i className="fa-solid fa-xmark text-sm"></i>
              </button>
            </div>
          )}
          {query.keyword && (
            <div className="bg-medium-brown bg-opacity-40 shadow-sm flex gap-2 py-2 px-4 rounded-md place-items-center justify-center">
              Atslēgvards: {query.keyword}{" "}
              <button onClick={removeKeywordFilter}>
                <i className="fa-solid fa-xmark text-sm"></i>
              </button>
            </div>
          )}
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <div className="mx-8 mb-4">{getQuery()}</div>
        <div className="hidden mx-8 md:flex text-lg lg:text-xl font-semibold place-items-center border-[1.5px] rounded-full border-gray-300 focus-within:border-gray-600">
          <div className="flex grow">
            <input
              placeholder="Meklēt preces..."
              type="text"
              value={search}
              onChange={handleSearchInputChange}
              className="text-xl max-h-12 px-6 w-[600px] font-semibold grow bg-[#f4f1e9] rounded-s-full focus:outline-none font-poppins"
            />
            <button
              onClick={() => props.onSearch(search)}
              className="bg-[#f4f1e9] text-2xl px-10 rounded-e-full h-12 flex place-items-center hover:bg-opacity-60"
            >
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
        </div>
      </div>
      <div className="justify-between mx-8 flex place-items-center">
        <span className="font-poppins text-gray-600 font-semibold">
          Atrastas {props.filteredItemAmount ?? 0} preces
        </span>
        <div className="flex gap-6">
          <div className="flex rounded-md text-black bg-black">
            <button
              onClick={() =>
                props.onSort({
                  ...props.sortValues,
                  price: props.sortValues.price === "desc" ? "" : "desc",
                })
              }
              className={`bg-light-brown py-2 px-4 rounded-s-md hover:opacity-80 transition-opacity ${
                props.sortValues.price === "desc" ? "opacity-80" : ""
              }`}
            >
              <i className="fa-solid fa-arrow-down"></i>
            </button>
            <span className="font-semibold font-poppins bg-light-brown py-2 px-3">
              Cena
            </span>
            <button
              onClick={() =>
                props.onSort({
                  ...props.sortValues,
                  price: props.sortValues.price === "asc" ? "" : "asc",
                })
              }
              className={`bg-light-brown py-2 px-4 rounded-e-md hover:opacity-80 transition-opacity ${
                props.sortValues.price === "asc" ? "opacity-80" : ""
              }`}
            >
              <i className="fa-solid fa-arrow-up"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
