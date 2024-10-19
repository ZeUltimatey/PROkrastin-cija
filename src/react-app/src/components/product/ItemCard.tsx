import { useNavigate } from "react-router-dom";
import { useToast } from "../universal/Toast";

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
  const showToast = useToast();

  const navigate = useNavigate();

  const formatPrice = (price?: number) => {
    return price?.toFixed(2);
  };

  const onAddToCart = () => {
    showToast(true, "Produkts pievienots grozam");
  };

  return (
    <div className="h-[316px] group mx-auto bg-light-gray shadow-sm my-4 brightness-95 flex flex-col w-60 rounded-md  hover:shadow-md transition-all">
      <button
        onClick={onAddToCart}
        className="hover:brightness-90 absolute h-0 group-hover:h-12  bg-light-brown flex transition-all place-items-center w-full justify-center font-poppins gap-4 rounded-t-md shadow-md"
      >
        <span className="text-lg opacity-0 group-hover:opacity-100 transition-all">
          Pievienot grozam
        </span>
        <i className="fa-solid fa-cart-arrow-down opacity-0 group-hover:opacity-100 transition-all"></i>
      </button>
      <div
        onClick={() => {
          navigate(`/product/${props.id}`);
        }}
        className=" hover:cursor-pointer"
      >
        <img
          className="rounded-t-md"
          src={props.imageurl}
          alt={props.description}
        />

        <div className="px-2 pt-1">
          <span className="font-poppins">{props.title}</span>
        </div>
        <div className="px-3 place-items-center flex rounded-b-md font-poppins gap-3 h-12">
          <span className="text-2xl font-semibold">
            {props.discount_price
              ? formatPrice(props.discount_price)
              : formatPrice(props.price)}
            &euro;
          </span>
          {props.discount_price && (
            <span className="line-through text-lg">
              {formatPrice(props.price)}&euro;
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
