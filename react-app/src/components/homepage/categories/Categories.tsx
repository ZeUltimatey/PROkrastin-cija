import { Category } from "./Category";

export const Categories = () => {
  return (
    <div className="px-12 bg-[#EDEAE1] h-auto flex flex-col gap-8">
      <h1 className="text-3xl font-poppins font-bold">Īpašie piedāvājumi</h1>
      <div className="px-32 bg-[#EDEAE1] h-auto">
        <div className="grid grid-cols-5 place-items-center">
          <Category />
        </div>
      </div>
    </div>
  );
};
