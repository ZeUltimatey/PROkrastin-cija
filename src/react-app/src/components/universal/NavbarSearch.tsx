import { useNavigate } from "react-router-dom";
import { Constants } from "./Constants";
import { ISearchResult } from "./Navbar";
import { CategoryNames } from "./CategoryNames";

export const NavbarSearch = ({
  searchResults,
}: {
  searchResults: ISearchResult[];
}) => {
  const item = (result: ISearchResult) => {
    return (
      <div className="flex gap-2 h-20">
        <img
          src={
            result.images?.length > 0
              ? Constants.BASE_URL + result.images[0].url
              : "/placeholder.png"
          }
          className="min-w-20 h-20 max-w-20  rounded-md"
        />
        <div className="flex flex-col justify-between">
          <p className="text-xs">
            {CategoryNames[result.product_type as keyof typeof CategoryNames] ??
              "Šķirne"}
          </p>
          <p>{result.display_name}</p>
          <p className="text-sm opacity-80">
            {result.description
              ? result.description.length > 100
                ? result.description.slice(0, 99) + "..."
                : result.description
              : result.personality_info.length > 100
              ? result.personality_info.slice(0, 99) + "..."
              : result.personality_info}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="w-[1060px] top-12  lg:top-28 shadow-md font-poppins rounded-md flex flex-col absolute z-10 bg-content-white text-dark-brown">
      {searchResults &&
        searchResults.map((result: ISearchResult, idx) => {
          return (
            <div
              className={`py-2 border-b hover:cursor-pointer px-2 bg-content-white hover:brightness-90 transition-all ${
                idx === 0 ? "rounded-t-md" : ""
              } ${
                idx == searchResults.length - 1
                  ? "rounded-b-md"
                  : "border-dark-brown border-opacity-30"
              }`}
              onClick={() => {
                window.location.assign(
                  result.product_type
                    ? `/product/${result.id}`
                    : `/breed/${result.id}`
                );
              }}
            >
              {item(result)}
            </div>
          );
        })}
    </div>
  );
};
