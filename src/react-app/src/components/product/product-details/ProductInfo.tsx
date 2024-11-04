import { StarRating } from "./StarRating";
import { BuyButton } from "./BuyButton";
import { Product } from "../../universal/interfaces/Product";
import { CategoryNames } from "../../universal/CategoryNames";

export const ProductInfo = ({ product }: { product: Product }) => {
  return (
    <div className="w-full flex flex-col justify-between">
      <div className="flex flex-col gap-2">
        <div>
          <p className="font-poppins">
            {CategoryNames[product.product_type as keyof typeof CategoryNames]}
          </p>
          <div className="text-2xl lg:text-4xl text-[#3e2a19] font-bold font-poppins">
            {product.display_name}
          </div>
        </div>
        <StarRating />
      </div>
      <div className="text-xl text-[#3e2a19] font-hind">
        {product.description}
      </div>
      <div className="flex">
        <div className="text-xl lg:text-3xl text-[#3e2a19] font-bold font-poppins">
          <span>
            {product.discount_pricing
              ? product.discount_pricing
              : product.pricing}
          </span>
          &euro;
          <span className="text-[#44392e] text-lg">/gab</span>
        </div>
      </div>
      <BuyButton product={product} />
    </div>
  );
};
