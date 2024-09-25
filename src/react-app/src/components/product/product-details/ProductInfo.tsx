import { StarRating } from "./StarRating";
import { BuyButton } from "./BuyButton";

export const ProductInfo = () => {
  return (
    <div className="w-full flex flex-col justify-between">
      <div className="text-2xl lg:text-4xl font-bold">Kaķu barība 1kg</div>

      <StarRating />

      <div className="text-sm lg:text-base text-gray-600">
        Barība, rotaļlietas, aksesuāri un vel daudz kas Lorem ipsum dolor sit
        amet, consectetur adipiscing elit. Quam ab sequi excepturi, in tenetur
        fugit accusantium doloribus sit dolores consectetur.
      </div>
      <div className="text-xl lg:text-3xl text-gray-800 font-bold">21.67 €</div>

      <BuyButton />
    </div>
  );
};
