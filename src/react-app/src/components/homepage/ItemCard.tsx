interface Props {
  id: number;
  title: string;
  description: string;
  price: number;
  discount_price?: number;
  category: string;
  imageurl?: string;
}

export const ItemCard = (props: Props) => {
  const formattedDescription =
    props.description.length > 90
      ? `${props.description.slice(0, 90)} ...`
      : props.description;

  const formatPrice = (price?: number) => {
    if (Number.isInteger(price)) {
      return `${price}.00`;
    }
    return price;
  };

  return (
    <div className="h-[316px] group mx-auto bg-light-gray shadow-md my-4 brightness-95 flex flex-col w-56 rounded-md place-content-between hover:shadow-md transition-all hover:cursor-pointer">
      <div className="w-full flex flex-col justify-between max-h-[16vw]">
        <img
          src={props.imageurl}
          className=" max-h-60 group-hover:max-h-0 transition-all w-full rounded-t-md"
        ></img>
        <div className="flex flex-col h-24 py-2 px-2 justify-between gap-1">
          <div className="flex flex-col">
            <span className="text-sm group-hover:font-semibold">
              {props.category.toUpperCase()}
            </span>
            <span className="text-lg group-hover:text-2xl transition-all font-semibold">
              {props.title}
            </span>
          </div>
          <div className="group-hover:animate-[fade-in_0.5s_ease-in_forwards] opacity-0 hidden group-hover:block">
            <p className="font-poppins">{formattedDescription}</p>
          </div>
        </div>
      </div>
      <span className="text-lg font-poppins justify-between group-hover:bg-light-gray font-medium h-[2vw] flex group-hover:brightness-90 rounded-b-md place-items-center select-none">
        <div className="flex gap-2 ps-2 place-items-center">
          <span className="text-2xl">{formatPrice(props.price)}&euro;</span>
          <span className="text-lg line-through">
            {formatPrice(props.discount_price)}
            {props.discount_price ? "€" : ""}
          </span>
        </div>
        <div className="group-hover:animate-[fade-in_0.1s_ease-in-out_forwards] opacity-0 hidden bg-light-gray rounded-br-md hover:brightness-90 group-hover:flex place-items-center justify-center h-[2vw] w-[2vw]">
          <i className="fa-solid fa-basket-shopping text-xl"></i>
        </div>
      </span>
    </div>
  );
};
