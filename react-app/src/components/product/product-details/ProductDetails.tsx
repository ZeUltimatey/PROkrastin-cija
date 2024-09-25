import { ProductImage } from "./ProductImage";
import { ProductInfo } from "./ProductInfo";
import { ProductSpecification } from "./ProductSpecification";
import { Breadcrumbs } from "../../universal/Breadcrumbs";

export const ProductDetails = () => {
  return (
    <div className="h-screen bg-[#EDEAE1] rounded-t px-4 sm:px-8 lg:px-12 mt-1">
      <Breadcrumbs />
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
