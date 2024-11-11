import { useNavigate } from "react-router-dom";
import { useCart } from "../universal/Cart";
import { IProduct } from "../universal/interfaces/IProduct";

export const ItemCard = (props: IProduct) => {
  const navigate = useNavigate();

  const { addToCart } = useCart();

  return (
    <div className="h-[316px] group mx-auto bg-light-gray shadow-sm my-4 brightness-95 flex flex-col w-60 rounded-md  hover:shadow-md transition-all">
      <button
        onClick={() => addToCart(props, null)}
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
          src={props.image_url}
          alt={props.description}
        />

        <div className="px-2 pt-1">
          <span className="font-poppins">{props.display_name}</span>
        </div>
        <div className="px-3 place-items-center flex rounded-b-md font-poppins gap-3 h-12">
          <span className="text-2xl font-semibold">
            {props.discount_pricing
              ? props.discount_pricing.toFixed(2)
              : props.pricing.toFixed(2)}
            &euro;
          </span>
          {props.discount_pricing && (
            <span className="line-through text-lg">
              {props.pricing.toFixed(2)}&euro;
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
