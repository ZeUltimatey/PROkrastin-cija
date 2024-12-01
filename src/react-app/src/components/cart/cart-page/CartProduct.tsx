import { useEffect, useState } from "react";
import { IProduct } from "../../universal/interfaces/IProduct";
import { Constants } from "../../universal/Constants";

interface ICartProductProps {
  product: IProduct;
  quantity: number;
  onRemove: (id: number) => void;
  onQuantityChange: (product: IProduct, newQuantity: number) => void;
}

export const CartProduct = (props: ICartProductProps) => {
  const { product, quantity, onRemove, onQuantityChange } = props;
  const [cartQuantity, setCartQuantity] = useState(quantity);
  const [totalPrice, setTotalPrice] = useState(
    product.discount_pricing
      ? product.discount_pricing * quantity
      : product.pricing * quantity
  );

  const updateTotalPrice = (newQuantity: number) => {
    const newTotalPrice = product.discount_pricing
      ? product.discount_pricing * newQuantity
      : product.pricing * newQuantity;
    setTotalPrice(newTotalPrice);
  };

  useEffect(() => {
    updateTotalPrice(cartQuantity);
  }, [cartQuantity, product]);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity > 0) {
      setCartQuantity(newQuantity);
      onQuantityChange(product, newQuantity);
    }
  };

  const incrementQuantity = () => {
    const newQuantity = cartQuantity + 1;
    handleQuantityChange(newQuantity);
  };

  const decrementQuantity = () => {
    if (cartQuantity > 1) {
      const newQuantity = cartQuantity - 1;
      handleQuantityChange(newQuantity);
    }
  };

  return (
    <tr className="border-b border-gray-200">
      <td className="flex items-center lg:py-4 py-2">
        <img
          src={
            product.images.images[0]?.url
              ? Constants.BASE_URL + product.images.images[0].url
              : "https://www.svgrepo.com/show/508699/landscape-placeholder.svg"
          }
          alt={product.display_name}
          className="h-24 w-24 hidden lg:block object-cover mr-4 shadow-md"
        />
        <span
          onClick={() => window.location.assign(`/product/${product.id}`)}
          className="text-dark-brown hover:underline hover:cursor-pointer font-semibold lg:text-base text-sm"
        >
          {product.display_name}
        </span>
      </td>
      <td className="text-center lg:py-4 py-2">
        <div className="flex items-center justify-center">
          <button
            disabled={cartQuantity === 1}
            onClick={decrementQuantity}
            className="bg-light-brown lg:h-8 lg:w-8 w-6 h-6 lg:flex items-center justify-center rounded-l-md hover:bg-opacity-80 transition-opacity hidden"
          >
            <i className="fa-solid fa-minus text-white lg:text-sm text-xs"></i>
          </button>
          <input
            type="number"
            value={cartQuantity}
            onChange={(e) => handleQuantityChange(Number(e.target.value))}
            onBlur={() => handleQuantityChange(cartQuantity)}
            className="text-center font-semibold font-poppins bg-light-brown lg:h-8 h-6 lg:w-14 w-8 focus:outline-none lg:text-base lg:rounded-none rounded-md text-sm focus:bg-opacity-75 text-white"
          />
          <button
            onClick={incrementQuantity}
            className="bg-light-brown lg:h-8 lg:w-8 w-6 h-6 hidden lg:flex items-center justify-center rounded-r-md hover:bg-opacity-80 transition-opacity"
          >
            <i className="fa-solid fa-plus text-white lg:text-sm text-xs"></i>
          </button>
        </div>
      </td>
      <td className="text-right lg:pr-6 text-dark-brown font-semibold lg:py-4 py-2 lg:text-base text-sm">
        {totalPrice.toFixed(2)}&euro;
      </td>
      <td className="text-right lg:py-4 py-2">
        <button
          onClick={() => onRemove(product.id)}
          className="text-dark-brown rounded-full w-10 h-10 flex items-center justify-center ml-4"
        >
          <i className="fa-solid fa-x lg:text-base text-sm"></i>
        </button>
      </td>
    </tr>
  );
};

export default CartProduct;
