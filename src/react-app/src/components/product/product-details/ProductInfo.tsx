import { StarRating } from "./StarRating";
import { BuyButton } from "./BuyButton";

 export const ProductInfo = () => {
  return (
    <div className="w-full lg:w-1/2 flex flex-col justify-between mt-6 lg:mt-0">
      <div className="text-left">
        <div className="text-2xl lg:text-4xl font-bold">Kaķu barība 1kg</div>
        <div className="text-xl lg:text-3xl text-gray-700 mt-1">21.67 €</div>
      </div>

      <StarRating />

      <div className="mt-4 text-sm lg:text-base text-gray-600">
        Barība, rotaļlietas, aksesuāri un vel daudz kas Lorem ipsum dolor sit
        amet, consectetur adipiscing elit. Quam ab sequi excepturi, in tenetur
        fugit accusantium doloribus sit dolores consectetur.
      </div>

      <BuyButton />
    </div>
  );
};
