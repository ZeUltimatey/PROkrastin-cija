import { Navbar } from "../universal/Navbar";
import { ProductDetails } from "./product-details/ProductDetails";

export const ProductView = () => {
  return (
    <div style={{ backgroundImage: `url(../cat_pattern_bg.jpg)` }} className="">
      <div className="lg:px-20 pt-6 bg-background-brown bg-opacity-95">
        <Navbar />
        <ProductDetails />
      </div>
    </div>
  );
};
