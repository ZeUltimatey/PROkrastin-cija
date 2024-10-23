import { Product } from "../Products";

export const ProductItem = ({
  product,
  onProductEdit,
  onProductDelete,
}: {
  product: typeof Product;
  onProductEdit: (id: number) => void;
  onProductDelete: (id: number) => void;
}) => {
  const formatPrice = (price?: number) => {
    return price?.toFixed(2);
  };
  return (
    <div className="flex w-full text-center bg-white h-12 py-2 font-poppins rounded-md text-lg shadow-sm">
      <div className="w-36">
        <img
          src={"/images/products/9.png"}
          className="place-self-center px-8 w-24 mx-auto"
        />
        {/*todo - add image*/}
      </div>
      <div className="w-[1px] bg-dark-brown"></div>
      <span className="place-self-center grow ">{product.display_name}</span>
      <div className="w-[1px] bg-dark-brown"></div>
      <span className="place-self-center  w-48">
        {product.discount_pricing
          ? formatPrice(product.discount_pricing)
          : formatPrice(product.pricing)}
      </span>
      <div className="w-[1px] bg-dark-brown"></div>
      <span className="place-self-center  w-48">{product.stock}</span>
      <div className="w-[1px] bg-dark-brown"></div>
      <div className="place-self-center text-center w-48">
        <button onClick={() => onProductEdit(product.id)}>
          <i className="fa-solid fa-pen-to-square me-3 hover:text-accent-brown"></i>
        </button>
        <button onClick={() => onProductDelete(product.id)}>
          <i className="fa-solid fa-trash hover:text-red-500"></i>
        </button>
      </div>
    </div>
  );
};
