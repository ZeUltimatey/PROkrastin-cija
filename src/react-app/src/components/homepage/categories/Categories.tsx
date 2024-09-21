import { Category } from "./Category";

export const Categories = () => {
  return (
    <div className="px-12 bg-[#EDEAE1] h-auto flex flex-col gap-4">
      <h1 className="text-3xl font-poppins font-bold">Kategorijas</h1>
      <div className="px-32 bg-[#EDEAE1] h-auto">
        <div className="grid grid-cols-4 place-items-center gap-12">
          <Category id={0} />
          <Category id={1} />
          <Category id={2} />
          <Category id={3} />
        </div>
      </div>
    </div>
  );
};
