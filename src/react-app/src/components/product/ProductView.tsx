import { ProductInfo } from "./product-details/ProductInfo";
import { ProductSpecification } from "./product-details/ProductSpecification";

export const ProductView = () => {
  return (
    <div className="h-screen bg-[#EDEAE1] py-4 px-8">
      <div className="bg-[#eaded2] mt-4 py-12">
        <div className="flex flex-col lg:flex-row gap-12 px-12">
          <img
            src={"../images/products/cat_food.png"}
            alt="product"
            className="rounded-md h-[400px] w-[700px] object-cover shadow-md"
          />
          <ProductInfo />
        </div>
      </div>
      <ProductSpecification />
    </div>
  );
};
