import { Product } from "../Products";
import { ProductItem } from "./ProductItem";

export const ProductTable = ({
  products,
}: {
  products: (typeof Product)[];
}) => {
  return (
    <div className="w-full">
      <div className="flex w-full text-center bg-white h-12 py-2 font-poppins rounded-md text-lg font-semibold shadow-sm">
        <span className="place-self-center w-36">Bilde</span>
        <div className="w-[1px] bg-dark-brown"></div>
        <span className="place-self-center  grow">Nosaukums</span>
        <div className="w-[1px] bg-dark-brown"></div>
        <span className="place-self-center  w-48">Cena</span>
        <div className="w-[1px] bg-dark-brown"></div>
        <span className="place-self-center  w-48">Daudzums</span>
        <div className="w-[1px] bg-dark-brown"></div>
        <span className="place-self-center w-48">Darbības</span>
      </div>
      <div className="w-full flex flex-col my-3 gap-2">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
