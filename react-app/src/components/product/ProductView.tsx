import { Navbar } from "../universal/Navbar";
import { ProductDetails } from "./product-details/ProductDetails";

export const ProductView = () => {
  return (
    <div
      className="h-auto lg:px-24 pt-6 
       bg-[#967a67] "
    >
      <Navbar />
      <ProductDetails />

    </div>
  );
};
