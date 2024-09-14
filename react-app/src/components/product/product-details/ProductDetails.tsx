import { ProductImage } from "./ProductImage";
import { ProductInfo } from "./ProductInfo";
import { ProductSpecification } from "./ProductSpecification";
import { Breadcrumbs } from "./Breadcrumbs";

export const ProductDetails = () => {
  return (
    <div className="h-screen bg-[#EDEAE1] rounded-t px-4 sm:px-8 lg:px-12 mt-1">
      <Breadcrumbs />
      <div className="mt-6 flex flex-col lg:flex-row lg:space-x-6">
        <ProductImage />
        <ProductInfo />
      </div>

      <ProductSpecification />
    </div>
  );
};
