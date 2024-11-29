import { useEffect, useState } from "react";
import { CategoryNames } from "../../universal/CategoryNames";
import { CategoryItem } from "./CategoryItem";
import { Constants } from "../../universal/Constants";
import { IQuery } from "../../universal/IQuery";
import useDebounce from "../../universal/useDebounce";

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
  const [priceMin, setPriceMin] = useState<number | null>(null);
  const [priceMax, setPriceMax] = useState<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const debounceMinPrice = useDebounce(priceMin, 800);
  const debounceMaxPrice = useDebounce(priceMax, 800);

  // Load saved filter on component mount or filterUpdateTrigger change
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoaded) {
        onFilterUpdate(); // Trigger only after debouncing.
      } else {
        setIsLoaded(true);
      }
    }, 500); // Debounce time

    return () => clearTimeout(timer); // Cleanup
  }, [filter, debounceMinPrice, debounceMaxPrice]);

  const setupFilter = (updatedFilter: typeof initialFilterCriteria) => {
    const selectedCategories = Object.entries(updatedFilter.category)
      .filter(([, isSelected]) => isSelected)
      .map(([key]) => key)
      .join(",");

    const keyword = JSON.parse(
      localStorage.getItem(Constants.LOCAL_STORAGE.QUERY_CATALOG) || "{}"
    ).keyword;

    const newQuery = {
      keyword: keyword ?? "",
      product_type: selectedCategories,
      min_price: updatedFilter.price.from || 0,
      max_price: updatedFilter.price.to || 0,
    };

    localStorage.setItem(
      Constants.LOCAL_STORAGE.QUERY_CATALOG,
      JSON.stringify(newQuery)
    );
    onFilterUpdate();
  };

  const handleCategoryChange = (category: string) => {
    setFilter((prevFilter) => {
      const updatedFilter = {
        ...prevFilter,
        category: {
          ...prevFilter.category,
          [category]: !prevFilter.category[category],
        },
      };
      setupFilter(updatedFilter);
      return updatedFilter;
    });
  };

  const handlePriceChange = (
    value: string,
    setter: React.Dispatch<React.SetStateAction<number | null>>
  ) => {
    const numValue = value ? parseInt(value) : null;
    setter(numValue);
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
            value={priceMin || ""}
            onChange={(e) => handlePriceChange(e.target.value, setPriceMin)}
            id="price"
            placeholder="No"
            className="w-12 text-dark-brown font-poppins font-semibold py-1 px-2 text-center shadow-sm focus:accent-accent-brown rounded-md"
          />
          <span className="text-dark-brown font-poppins font-semibold text-2xl">
            -
          </span>
          <input
            type="number"
            value={priceMax || ""}
            onChange={(e) => handlePriceChange(e.target.value, setPriceMax)}
            id="price"
            placeholder="Līdz"
            className="w-12 text-dark-brown font-poppins font-semibold py-1 px-2 text-center shadow-sm focus:accent-accent-brown rounded-md"
          />
        </div>
      </div>
    </div>
  );
};
