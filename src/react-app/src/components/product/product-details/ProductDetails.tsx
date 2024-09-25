import { ProductInfo } from "./ProductInfo";
import { ProductSpecification } from "./ProductSpecification";
import { Breadcrumbs } from "./Breadcrumbs";

export const ProductDetails = () => {
  return (
    <div className="h-screen bg-[#EDEAE1] py-4 px-8">
      <Breadcrumbs />
      <div className="flex flex-col lg:flex-row mt-8 gap-12 px-12">
        <img
          src={"../car.png"}
          alt="product"
          className="rounded-md h-[400px] w-[700px] object-cover shadow-md"
        />
        <ProductInfo />
      </div>

      <ProductSpecification />
    </div>
  );
};
