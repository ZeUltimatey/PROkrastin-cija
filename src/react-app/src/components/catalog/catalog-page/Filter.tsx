import { useEffect, useState } from "react";
import { CategoryNames } from "../../universal/CategoryNames";
import { CategoryItem } from "./CategoryItem";
import { Constants } from "../../universal/Constants";
import { IQuery } from "../../universal/IQuery";

const initialFilterCriteria = {
  category: {
    [CategoryNames.CATS]: false,
    [CategoryNames.CARE]: false,
    [CategoryNames.FOOD]: false,
    [CategoryNames.ACCESSORIES]: false,
    [CategoryNames.TOYS]: false,
    [CategoryNames.FURNITURE]: false,
  },
  price: {
    from: null as number | null,
    to: null as number | null,
  },
};

export const Filter = ({
  onFilterUpdate,
  filterUpdateTrigger,
}: {
  onFilterUpdate: () => void;
  filterUpdateTrigger: number;
}) => {
  const [filter, setFilter] = useState(initialFilterCriteria);

  useEffect(() => {
    const savedFilter: IQuery = JSON.parse(
      localStorage.getItem(Constants.LOCAL_STORAGE.QUERY_CATALOG)
    );

    setFilter({
      category: {
        [CategoryNames.CATS]: savedFilter?.product_type?.includes(
          CategoryNames.CATS
        ),
        [CategoryNames.CARE]: savedFilter?.product_type?.includes(
          CategoryNames.CARE
        ),
        [CategoryNames.FOOD]: savedFilter?.product_type?.includes(
          CategoryNames.FOOD
        ),
        [CategoryNames.ACCESSORIES]: savedFilter?.product_type?.includes(
          CategoryNames.ACCESSORIES
        ),
        [CategoryNames.TOYS]: savedFilter?.product_type?.includes(
          CategoryNames.TOYS
        ),
        [CategoryNames.FURNITURE]: savedFilter?.product_type?.includes(
          CategoryNames.FURNITURE
        ),
      },
      price: {
        from: savedFilter?.min_price || null,
        to: savedFilter?.max_price || null,
      },
    });
  }, [filterUpdateTrigger]);

  const setupFilter = (newFilter: typeof initialFilterCriteria) => {
    const selectedCategories = Object.keys(newFilter.category)
      .filter((key) => newFilter.category[key])
      .join(",");
    const keyword = JSON.parse(
      localStorage.getItem(Constants.LOCAL_STORAGE.QUERY_CATALOG)
    )?.keyword;
    const updatedFilter = {
      keyword: keyword ?? "",
      product_type: selectedCategories,
      min_price: newFilter.price.from || 0,
      max_price: newFilter.price.to || 0,
    };
    localStorage.setItem(
      Constants.LOCAL_STORAGE.QUERY_CATALOG,
      JSON.stringify(updatedFilter)
    );
    onFilterUpdate();
  };

  const handleCategoryChange = (category: string) => {
    const updatedFilter = {
      ...filter,
      category: {
        ...filter.category,
        [category]: !filter.category[category],
      },
    };
    setFilter(updatedFilter);
    setupFilter(updatedFilter);
  };

  const handlePriceChange = (value: number | null, type: "from" | "to") => {
    const updatedFilter = {
      ...filter,
      price: { ...filter.price, [type]: value },
    };
    setFilter(updatedFilter);
    setupFilter(updatedFilter);
  };

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
          {Object.keys(filter.category).map((categoryKey) => (
            <CategoryItem
              key={categoryKey}
              onSelect={() => handleCategoryChange(categoryKey)}
              filter={filter}
              item={categoryKey}
            />
          ))}
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
          <input
            type="number"
            value={filter.price.from || ""}
            onChange={(e) =>
              handlePriceChange(
                e.target.value ? parseInt(e.target.value) : null,
                "from"
              )
            }
            id="price"
            placeholder="No"
            className="w-12 text-dark-brown font-poppins font-semibold py-1 px-2 text-center shadow-sm focus:accent-accent-brown rounded-md"
          />
          <span className="text-dark-brown font-poppins font-semibold text-2xl">
            -
          </span>
          <input
            type="number"
            value={filter.price.to == 9999999 ? "" : filter.price.to || ""}
            onChange={(e) =>
              handlePriceChange(
                e.target.value ? parseInt(e.target.value) : null,
                "to"
              )
            }
            id="price"
            max={9999999}
            placeholder="Līdz"
            className="w-12 text-dark-brown font-poppins font-semibold py-1 px-2 text-center shadow-sm focus:accent-accent-brown rounded-md"
          />
        </div>
      </div>
    </div>
  );
};
