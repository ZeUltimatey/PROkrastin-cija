import { useEffect, useState } from "react";
import { IProduct } from "../../universal/interfaces/IProduct";

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
      <td className="flex items-center py-4">
        <img
          src={product.image_url ?? "https://via.placeholder.com/150"}
          alt={product.display_name}
          className="h-24 w-24 object-cover mr-4"
        />
        <span className="text-dark-brown font-semibold">
          {product.display_name}
        </span>
      </td>
      <td className="text-center py-4">
        <div className="flex items-center justify-center">
          <button
            disabled={cartQuantity === 1}
            onClick={decrementQuantity}
            className="bg-light-brown h-8 w-8 flex items-center justify-center rounded-l-md hover:bg-opacity-80 transition-opacity"
          >
            <i className="fa-solid fa-minus text-white text-sm"></i>
          </button>
          <input
            type="number"
            value={cartQuantity}
            onChange={(e) => handleQuantityChange(Number(e.target.value))}
            onBlur={() => handleQuantityChange(cartQuantity)}
            className="text-center font-semibold font-poppins bg-light-brown h-8 w-14 focus:outline-none focus:bg-opacity-75 text-white"
          />
          <button
            onClick={incrementQuantity}
            className="bg-light-brown h-8 w-8 flex items-center justify-center rounded-r-md hover:bg-opacity-80 transition-opacity"
          >
            <i className="fa-solid fa-plus text-white text-sm"></i>
          </button>
        </div>
      </td>
      <td className="text-right pr-6 text-dark-brown font-semibold py-4">
        {totalPrice.toFixed(2)}&euro;
      </td>
      <td className="text-right py-4">
        <button
          onClick={() => onRemove(product.id)}
          className="text-dark-brown rounded-full w-10 h-10 flex items-center justify-center ml-4"
        >
          <i className="fa-solid fa-x"></i>
        </button>
      </td>
    </tr>
  );
};

export default CartProduct;
