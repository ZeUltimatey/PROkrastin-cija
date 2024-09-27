import { Category } from "./Category";
import { CategoryList } from "./CategoryList";

export const Categories = () => {
  return (
    <div
      id="categories"
      className="px-12 bg-content-white h-auto flex flex-col gap-8"
    >
      <div className="flex flex-col gap-10 bg-light-gray p-8 rounded-md">
        <div className="flex place-items-center gap-6">
          <div className="grow h-[1px] bg-dark-brown" />
          <span className="text-3xl font-poppins text-dark-brown font-bold">
            Kategorijas
          </span>
          <div className="grow h-[1px] bg-dark-brown" />
        </div>
        <div className=" px-16 h-auto mb-6">
          <div className="grid grid-cols-3 gap-12 justify-center">
            {CategoryList.map((category, idx) => (
              <Category
                image={category.image}
                name={category.name}
                link={category.link}
                idx={idx}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
