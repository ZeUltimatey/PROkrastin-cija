import { useState } from "react";
import { Sort } from "./Sort";

export const SearchSort = ({
  onSearch,
  inputValue,
  onSort,
  sortValues,
  filteredItemAmount,
}: {
  onSearch: (value: string) => void;
  inputValue: string;
  onSort: (value: Sort) => void;
  sortValues: Sort;
  filteredItemAmount: number;
}) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="hidden mx-8 md:flex text-lg lg:text-xl font-semibold place-items-center border-[1.5px] rounded-full border-gray-300 focus-within:border-gray-600">
        <div className="flex grow">
          <input
            placeholder="Meklēt preces..."
            type="text"
            value={inputValue}
            onChange={(e) => onSearch(e.target.value)}
            className="text-xl max-h-12 px-6 w-[600px] font-semibold grow bg-[#f4f1e9] rounded-s-full focus:outline-none font-poppins"
          />
          <button className="bg-[#f4f1e9] text-2xl px-10 rounded-e-full h-12 flex place-items-center hover:bg-opacity-60">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
      </div>
      <div className="justify-between  mx-8 flex place-items-center">
        <span className="font-poppins text-gray-600 font-semibold">
          Atrastas {filteredItemAmount} preces
        </span>
        <div className="flex gap-6">
          <div className="flex gap-[1px] rounded-md text-dark-brown bg-dark-brown">
            <button
              onClick={() =>
                onSort({
                  ...sortValues,
                  popularity: sortValues.popularity === "desc" ? "" : "desc",
                })
              }
              className={`bg-accent-brown py-2 px-4 rounded-s-md hover:opacity-80 transition-opacity ${
                sortValues.popularity === "desc" ? "opacity-80" : ""
              }`}
            >
              <i className="fa-solid fa-arrow-down"></i>
            </button>
            <span className="font-semibold font-poppins bg-accent-brown py-2 px-3">
              Popularitāte
            </span>
            <button
              onClick={() =>
                onSort({
                  ...sortValues,
                  popularity: sortValues.popularity === "asc" ? "" : "asc",
                })
              }
              className={`bg-accent-brown py-2 px-4 rounded-e-md hover:opacity-80 transition-opacity ${
                sortValues.popularity === "asc" ? "opacity-80" : ""
              }`}
            >
              <i className="fa-solid fa-arrow-up"></i>
            </button>
          </div>
          <div className="flex gap-[1px] rounded-md text-dark-brown bg-dark-brown">
            <button
              onClick={() =>
                onSort({
                  ...sortValues,
                  price: sortValues.price === "desc" ? "" : "desc",
                })
              }
              className={`bg-accent-brown py-2 px-4 rounded-s-md hover:opacity-80 transition-opacity ${
                sortValues.price === "desc" ? "opacity-80" : ""
              }`}
            >
              <i className="fa-solid fa-arrow-down"></i>
            </button>
            <span className="font-semibold font-poppins bg-accent-brown py-2 px-3">
              Cena
            </span>
            <button
              onClick={() =>
                onSort({
                  ...sortValues,
                  price: sortValues.price === "asc" ? "" : "asc",
                })
              }
              className={`bg-accent-brown py-2 px-4 rounded-e-md hover:opacity-80 transition-opacity ${
                sortValues.price === "asc" ? "opacity-80" : ""
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
