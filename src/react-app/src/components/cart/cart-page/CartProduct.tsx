import { useState } from "react";
import { IProduct } from "../../universal/interfaces/IProduct";

interface ICartProductProps {
  product: IProduct;
  quantity: number;
  onRemove: (id: number) => void;
  onQuantityChange: (product: IProduct, delta: number) => void;
}

export const CartProduct = (props: ICartProductProps) => {
  const { product, quantity, onRemove, onQuantityChange } = props;
  const totalPrice = product.discount_pricing
    ? product.discount_pricing * quantity
    : product.pricing * quantity;

  const [cartQuantity, setCartQuantity] = useState(quantity);

  const handleQuantityChange = (delta: number) => {
    if (!isNaN(delta) && delta > 0) {
      setCartQuantity(delta);
    }
  };

  const incrementQuanity = () => {
    setCartQuantity(cartQuantity + 1);
    onQuantityChange(product, cartQuantity);
  };

  const decrementQuanity = () => {
    setCartQuantity(cartQuantity - 1);
    onQuantityChange(product, cartQuantity);
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
            onClick={decrementQuanity}
            className="bg-light-brown h-8 w-8 flex items-center justify-center rounded-l-md hover:bg-opacity-80 transition-opacity"
          >
            <i className="fa-solid fa-minus text-white text-sm"></i>
          </button>
          <input
            type="number"
            value={cartQuantity}
            onChange={(e) => handleQuantityChange(Number(e.target.value))}
            onBlur={() => onQuantityChange(product, cartQuantity)}
            className="text-center font-semibold font-poppins bg-light-brown  h-8 w-14 focus:outline-none focus:bg-opacity-75 flex items-center justify-center text-white"
          />
          <button
            onClick={incrementQuanity}
            className="bg-light-brown h-8 w-8 flex items-center justify-center rounded-r-md hover:bg-opacity-80 transition-opacity"
          >
            <i className="fa-solid fa-plus text-white text-sm"></i>
          </button>
        </div>
      </td>
      <td className="text-right pr-6 text-dark-brown font-semibold py-4">
        {totalPrice.toFixed(2)} EUR
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
