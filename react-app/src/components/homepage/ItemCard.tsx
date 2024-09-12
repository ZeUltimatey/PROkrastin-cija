import { ItemCardProps } from "./types/ItemCardProps";

export const ItemCard = ({ id, title, description, price }: ItemCardProps) => {
  const formattedDescription =
    description.length > 90 ? `${description.slice(0, 90)} ...` : description;

  return (
    <div className="h-[18vw] group bg-[#D8C5B3] flex flex-col w-[13vw] rounded-md shadow-sm place-content-between hover:shadow-md transition-all hover:cursor-pointer">
      <div className="w-full flex flex-col justify-between max-h-[16vw]">
        <img
          src={"../car.png"}
          className="bg-red-400 rounded-t-md max-h-52 group-hover:max-h-0 transition-all w-full"
        ></img>
        <div className="flex flex-col h-20 py-2 px-2 justify-between gap-1">
          <h1 className="text-lg group-hover:text-2xl transition-all font-semibold">
            {title}
          </h1>
          <div className="group-hover:animate-[fade-in_0.5s_ease-in_forwards] opacity-0 hidden group-hover:block">
            <p className="font-poppins">{formattedDescription}</p>
          </div>
        </div>
      </div>
      <span className="text-lg font-poppins bg-[#D8C5B3] font-medium h-[2vw] flex group-hover:brightness-90 rounded-b-md place-items-center select-none">
        <div className="grow group-hover:grow-0 transition-all"></div>
        <span className="px-2">{price}€</span>
        <div className="grow-0 group-hover:grow transition-all"></div>
        <div className="group-hover:animate-[fade-in_0.1s_ease-in-out_forwards] opacity-0 hidden bg-[#D8C5B3] rounded-br-md hover:brightness-90 group-hover:flex place-items-center justify-center h-[2vw] w-[2vw]">
          <i className="fa-solid fa-basket-shopping text-xl"></i>
        </div>
      </span>
    </div>
  );
};
