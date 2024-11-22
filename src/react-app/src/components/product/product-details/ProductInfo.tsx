import { StarRating } from "./StarRating";
import { BuyButton } from "./BuyButton";
import { CategoryNames } from "../../universal/CategoryNames";
import { IProduct } from "../../universal/interfaces/IProduct";
import { useNavigate } from "react-router-dom";
import { Constants } from "../../universal/Constants";

export const ProductInfo = ({
  product,
  reviews,
}: {
  product: IProduct;
  reviews: any;
}) => {
  const navigate = useNavigate();
  const token = localStorage.getItem(Constants.LOCAL_STORAGE.TOKEN);

  return (
    <div className="w-full flex flex-col gap-2 justify-between font-poppins">
      <div className="flex flex-col gap-2">
        <div>
          <p className="">
            {CategoryNames[product.product_type as keyof typeof CategoryNames]}
          </p>
          <div className="text-xl lg:text-4xl text-[#3e2a19] font-bold ">
            {product.display_name}
          </div>
        </div>
        {product.product_type !== "CATS" && (
          <div
            className="hover:cursor-pointer w-52 hover:opacity-70"
            onClick={() => navigate(`/reviews/${product.id}`)}
          >
            <StarRating stars={reviews.data.length} />
            <div className="text-sm ml-1 underline text-dark-brown">
              {reviews.data.length} atsauksmes
            </div>
          </div>
        )}
        {product.product_type === "CATS" && (
          <div className="flex flex-col text-dark-brown">
            <p>
              <strong>Dz. datums: </strong>
              {product.cat.birthdate}
            </p>
            <p>
              <strong>Krāsa: </strong>
              {product.cat.color}
            </p>
            <p>
              <strong>Šķirne: </strong>
              {product.cat.breed_name}{" "}
              <button
                onClick={() => navigate(`/breed/${product.cat.breed_id}`)}
                title="Uzzināt vairāk par šo šķirni..."
              >
                <i className="fa-solid fa-circle-info hover:opacity-80"></i>
              </button>
            </p>
          </div>
        )}
      </div>
      <div className="lg:text-xl text-[#3e2a19] font-hind">
        {product.description}
      </div>
      <div className="flex flex-col gap-1">
        <div className="text-xl lg:text-3xl text-[#3e2a19] font-bold ">
          <span>
            {product.discount_pricing
              ? product.discount_pricing.toFixed(2)
              : product.pricing.toFixed(2)}
          </span>
          &euro;
          {product.product_type !== "CATS" && (
            <span className="text-[#44392e] text-lg">/gab</span>
          )}
        </div>
        {product.product_type !== "CATS" && (
          <p className="opacity-40">
            Noliktavā pašlaik pieejami {product.stock} gab.
          </p>
        )}
      </div>
      {!token ? (
        <p>Lūdzu, autentificējies, lai pievienotu produkuts grozam!</p>
      ) : (
        <BuyButton product={product} />
      )}
    </div>
  );
};
