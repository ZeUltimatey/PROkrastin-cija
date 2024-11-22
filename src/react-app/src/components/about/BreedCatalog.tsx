import { useEffect, useState } from "react";
import { FormInput } from "../universal/FormInput";
import { Constants } from "../universal/Constants";
import { useToast } from "../universal/Toast";
import { Spinner } from "../universal/Spinner";
import { SearchSort } from "../catalog/catalog-page/SearchSort";
import { IQuery } from "../universal/IQuery";
import { CategoryItem } from "../catalog/catalog-page/CategoryItem";
import { useNavigate } from "react-router-dom";
import { Pagination } from "../universal/Pagination";

export interface IBreed {
  id: number;
  display_name: string;
  feeding_info: string;
  environment_info: string;
  personality_info: string;
  tips_info: string;
}

export const BreedCatalog = () => {
  const [breeds, setBreeds] = useState<IBreed[]>(null);
  const [pagination, setPagination] = useState(null);
  const [filterUpdateTrigger, setFilterUpdateTrigger] = useState(0);

  const navigate = useNavigate();

  const [filter, setFilter] = useState<{
    category: { [key: string]: boolean };
    keyword: string;
  }>({ category: {}, keyword: "" });
  const showToast = useToast();

  const getBreeds = async (url?: string) => {
    await fetch(`${Constants.API_URL}/breeds?${formatQueryParams(url) ?? ""}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          Constants.LOCAL_STORAGE.TOKEN
        )}`,
      },
    })
      .then(async (response) => {
        if (response.ok) {
          const data = await response.json();
          setPagination(data.meta);
          setBreeds(data.data);
        } else {
          showToast(false, "Kļūda iegūstot šķirnes.");
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  useEffect(() => {
    getBreeds();
  }, []);

  const onSearch = (keyword: string) => {
    const query: IQuery = JSON.parse(
      localStorage.getItem(Constants.LOCAL_STORAGE.QUERY_BREED)
    );
    if (query) {
      query.keyword = keyword;
      localStorage.setItem(
        Constants.LOCAL_STORAGE.QUERY_BREED,
        JSON.stringify(query)
      );
      getBreeds();
      return;
    }
    const newQuery = {
      keyword: keyword,
      product_type: "",
    };
    localStorage.setItem(
      Constants.LOCAL_STORAGE.QUERY_BREED,
      JSON.stringify(newQuery)
    );
  };

  const onFilterUpdate = () => {
    setFilterUpdateTrigger((prev) => prev + 1);
    getBreeds();
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

  const setupFilter = (newFilter: any) => {
    const selectedCategories = Object.keys(newFilter.category)
      .filter((key) => newFilter.category[key])
      .join(",");
    const updatedFilter = {
      keyword: JSON.parse(
        localStorage.getItem(Constants.LOCAL_STORAGE.QUERY_BREED)
      ).keyword,
      breed: selectedCategories,
    };
    localStorage.setItem(
      Constants.LOCAL_STORAGE.QUERY_BREED,
      JSON.stringify(updatedFilter)
    );
    onFilterUpdate();
  };

  // useEffect(() => {
  //   if (breeds) {
  //     const savedFilter: IQuery = JSON.parse(
  //       localStorage.getItem(Constants.LOCAL_STORAGE.QUERY_BREED)
  //     );

  //     setFilter({
  //       category: breeds.reduce((acc: { [key: string]: boolean }, breed) => {
  //         acc[breed.display_name] =
  //           savedFilter?.product_type?.includes(breed.display_name) || false;
  //         return acc;
  //       }, {}),
  //       keyword: savedFilter?.keyword || "",
  //     });
  //   }
  // }, [filterUpdateTrigger]);

  const formatQueryParams = (url?: string) => {
    const query: IQuery = JSON.parse(
      localStorage.getItem(Constants.LOCAL_STORAGE.QUERY_BREED)
    );
    if (query) {
      return url ?? `keyword=${query.keyword ?? ""}`;
    }
  };

  return (
    <div className="bg-content-white">
      <div className="w-full h-80 object-cover bg-temp-bg-image bg-cover p-12 flex flex-col gap-2">
        <span className="lg:text-6xl text-4xl font-baloo text-dark-brown font-bold">
          Kaķu šķirņu enciklopēdija
        </span>
        <p className="lg:text-xl text-base font-hind text-dark-brown font-medium brightness-150 lg:w-1/2">
          Uzziniet par dažādām kaķu šķirnēm un to īpatnībām!
        </p>
      </div>

      <div className="flex flex-col lg:flex-row-reverse gap-6 p-8">
        <div className="flex flex-col grow gap-4">
          <SearchSort
            filteredItemAmount={breeds?.length}
            onSearch={onSearch}
            onFilterUpdate={onFilterUpdate}
            filterUpdateTrigger={filterUpdateTrigger}
            queryConstant={Constants.LOCAL_STORAGE.QUERY_BREED}
          />

          <div className="lg:mx-8 h-auto mb-6 font-poppins">
            <div className="flex flex-col gap-6 place-items-center justify-center">
              {!breeds && <Spinner />}
              {breeds && breeds?.length === 0 && (
                <div className="font-poppins">
                  Diemžēl nav informāciju par šķirnēm.
                </div>
              )}
              {breeds &&
                breeds.map((breed) => (
                  <button
                    onClick={() => navigate(`/breed/${breed.id}`)}
                    key={breed.id}
                    className="rounded-md hover:shadow-md transition-all flex border h-24 border-slate-300 w-full"
                  >
                    <div className="bg-gradient-to-r from-purple-400 to-pink-400 rounded-s-md w-48 lg:block hidden"></div>
                    <div className="px-4 grow flex text-left justify-center flex-col">
                      <h3 className="lg:text-xl font-semibold text-dark-brown">
                        {breed.display_name}
                      </h3>
                      <p className="lg:text-base text-xs">
                        {breed.personality_info?.length > 100
                          ? `${breed.personality_info?.slice(1, 300)}...`
                          : breed.personality_info}
                      </p>
                    </div>
                  </button>
                ))}
              {pagination && (
                <Pagination pagination={pagination} onNavigate={getBreeds} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
