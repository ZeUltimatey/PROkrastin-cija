import { CategoryNames } from "../../universal/CategoryNames";
import { CategoryItem } from "./CategoryItem";

export const Filter = () => {
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
          <CategoryItem item={CategoryNames.CATS} />
          <CategoryItem item={CategoryNames.CARE} />
          <CategoryItem item={CategoryNames.FOOD} />
          <CategoryItem item={CategoryNames.ACCESSORIES} />
          <CategoryItem item={CategoryNames.TOYS} />
          <CategoryItem item={CategoryNames.FURNITURE} />
        </div>
      </div>
      <div className="flex flex-col gap-2 justify-between text-center mx-4">
        <label
          htmlFor="price"
          className="text-dark-brown font-bold font-poppins text-lg"
        >
          Cena:
        </label>
        <div className="flex justify-between">
          <input
            type="number"
            id="price"
            name="price"
            placeholder="No"
            className="w-12 text-dark-brown font-poppins font-semibold py-1 px-2 text-center shadow-sm focus:outline-none border-dark-brown transition-all focus:border-b-2 rounded-md"
          />
          <span className="text-dark-brown font-poppins font-semibold text-2xl">
            -
          </span>
          <input
            type="number"
            id="price"
            name="price"
            placeholder="Līdz"
            className="w-12 text-dark-brown font-poppins font-semibold py-1 px-2 text-center shadow-sm focus:outline-none border-dark-brown transition-all focus:border-b-2 rounded-md"
          />
        </div>
      </div>
    </div>
  );
};
