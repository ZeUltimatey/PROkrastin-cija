import { Category } from "./Category";

export const Categories = () => {
  return (
    <div className="px-12 bg-[#EDEAE1] h-auto flex flex-col gap-8">
      <div className="flex flex-col gap-6 bg-[#eaded2] p-8 rounded-md">
        <div className="flex place-items-center gap-6">
          <div className="grow h-[1px] bg-[#3e2a19]" />
          <span className="text-3xl font-poppins font-semibold">
            Kategorijas
          </span>
          <div className="grow h-[1px] bg-[#3e2a19]" />
        </div>
        <div className=" px-16 h-auto mb-6">
          <div className="grid grid-cols-4 place-items-center gap-12">
            <Category id={0} />
            <Category id={1} />
            <Category id={2} />
            <Category id={3} />
          </div>
        </div>
      </div>
    </div>
  );
};
