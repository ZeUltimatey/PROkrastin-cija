import { ItemCardProps } from "./types/ItemCardProps";

export const ItemCard = ({
  id,
  title,
  description,
  price,
  category,
  imageurl,
}: ItemCardProps) => {
  const formattedDescription =
    description.length > 90 ? `${description.slice(0, 90)} ...` : description;

  return (
    <div className="h-[316px] group hover:bg-hover-brown bg-light-gray brightness-95 flex flex-col w-56 rounded-md place-content-between hover:shadow-md transition-all hover:cursor-pointer">
      <div className="w-full flex flex-col justify-between max-h-[16vw]">
        <img
          src={imageurl}
          className=" max-h-60 group-hover:max-h-0 transition-all w-full rounded-t-md"
        ></img>
        <div className="flex flex-col h-24 py-2 px-2 justify-between gap-1">
          <div className="flex flex-col">
            <span className="text-sm group-hover:font-semibold">
              {category}
            </span>
            <span className="text-lg group-hover:text-2xl transition-all font-semibold">
              {title}
            </span>
          </div>
          <div className="group-hover:animate-[fade-in_0.5s_ease-in_forwards] opacity-0 hidden group-hover:block">
            <p className="font-poppins">{formattedDescription}</p>
          </div>
        </div>
      </div>
      <span className="text-lg font-poppins justify-between group-hover:bg-hover-brown font-medium h-[2vw] flex group-hover:brightness-90 rounded-b-md place-items-center select-none">
        <div className="flex gap-2 px-2 place-items-center">
          <span className="text-2xl">{(price - 0.01).toFixed(2)}€</span>
          <span className="text-xl line-through">{price}€</span>
        </div>
        <div className="group-hover:animate-[fade-in_0.1s_ease-in-out_forwards] opacity-0 hidden bg-hover-brown rounded-br-md hover:brightness-90 group-hover:flex place-items-center justify-center h-[2vw] w-[2vw]">
          <i className="fa-solid fa-basket-shopping text-xl"></i>
        </div>
      </span>
    </div>
  );
};
