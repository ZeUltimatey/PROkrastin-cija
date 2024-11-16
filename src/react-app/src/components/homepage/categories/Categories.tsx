import { useNavigate } from "react-router-dom";
import { Category } from "./Category";
import { CategoryList } from "./CategoryList";
import { Constants } from "../../universal/Constants";

export const Categories = () => {
  const navigate = useNavigate();

  return (
    <div
      id="categories"
      className="lg:px-12 bg-content-white h-auto flex flex-col gap-8"
    >
      <div className="flex flex-col gap-10 bg-light-gray p-8 rounded-md">
        <div className="flex place-items-center gap-6">
          <div className="grow h-[1px] bg-dark-brown" />
          <span className="lg:text-3xl text-xl font-poppins text-dark-brown font-bold">
            Kategorijas
          </span>
          <div className="grow h-[1px] bg-dark-brown" />
        </div>
        <div className="h-auto mb-4">
          <div className="grid lg:grid-cols-3 gap-y-16 place-items-center">
            {CategoryList.map((category, idx) => (
              <Category
                key={idx}
                image={category.image}
                name={category.name}
                link={category.link}
                idx={idx}
              />
            ))}
          </div>
        </div>
        <div className="lg:mx-12 mb-6">
          <button
            onClick={() => {
              localStorage.removeItem(Constants.LOCAL_STORAGE.QUERY_CATALOG);
              navigate("/products");
            }}
            className="flex place-items-center justify-center h-16 w-full bg-content-white hover:brightness-90 transition-all hover:shadow-lg rounded-md shadow-md"
          >
            <span className="lg:text-2xl text-xl font-semibold text-dark-brown font-poppins">
              Apskatīt visas preces
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
