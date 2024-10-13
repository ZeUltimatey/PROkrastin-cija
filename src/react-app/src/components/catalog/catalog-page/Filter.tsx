import { useEffect, useState } from "react";
import { CategoryNames } from "../../universal/CategoryNames";
import { CategoryItem } from "./CategoryItem";
import { FormInput } from "../../universal/FormInput";

const FilterCriteria = {
  category: {
    [CategoryNames.CATS]: false,
    [CategoryNames.CARE]: false,
    [CategoryNames.FOOD]: false,
    [CategoryNames.ACCESSORIES]: false,
    [CategoryNames.TOYS]: false,
    [CategoryNames.FURNITURE]: false,
  },
  price: {
    from: null,
    to: null,
  },
};

export const Filter = () => {
  const [filter, setFilter] = useState(FilterCriteria);

  return (
    <div className="flex flex-col gap-2 bg-content-white p-6 rounded-md shadow-md w-full lg:w-64 min-h-80">
      <div className="flex flex-col gap-2">
        <label
          htmlFor="category"
          className="text-dark-brown font-bold font-poppins text-lg"
        >
          Kategorija:
        </label>
        <div className="flex flex-col gap-2">
          <CategoryItem
            onSelect={setFilter}
            filter={filter}
            item={CategoryNames.CATS}
          />
          <CategoryItem
            onSelect={setFilter}
            filter={filter}
            item={CategoryNames.CARE}
          />
          <CategoryItem
            onSelect={setFilter}
            filter={filter}
            item={CategoryNames.FOOD}
          />
          <CategoryItem
            onSelect={setFilter}
            filter={filter}
            item={CategoryNames.ACCESSORIES}
          />
          <CategoryItem
            onSelect={setFilter}
            filter={filter}
            item={CategoryNames.TOYS}
          />
          <CategoryItem
            onSelect={setFilter}
            filter={filter}
            item={CategoryNames.FURNITURE}
          />
        </div>
      </div>
      <label
        htmlFor="price"
        className="text-dark-brown font-bold font-poppins text-lg"
      >
        Cena:
      </label>
      <div className="flex flex-col gap-2 justify-between text-center mx-4">
        <div className="flex justify-between">
          <FormInput
            type="number"
            value={filter.price.from}
            onChange={(e) =>
              setFilter({
                ...filter,
                price: { ...filter.price, from: e.target.value },
              })
            }
            id="price"
            placeholder="No"
            customClass="w-12 text-dark-brown font-poppins font-semibold py-1 px-2 text-center shadow-sm focus:accent-accent-brown rounded-md"
          />
          <span className="text-dark-brown font-poppins font-semibold text-2xl">
            -
          </span>
          <FormInput
            type="number"
            value={filter.price.to}
            onChange={(e) =>
              setFilter({
                ...filter,
                price: { ...filter.price, to: e.target.value },
              })
            }
            id="price"
            placeholder="Līdz"
            customClass="w-12 text-dark-brown font-poppins font-semibold py-1 px-2 text-center shadow-sm focus:accent-accent-brown rounded-md"
          />
        </div>
      </div>
    </div>
  );
};
