import { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "./interfaces/Product";
import { Constants } from "./Constants";
import { useToast } from "./Toast";

interface CartItem {
  user_id: number;
  product_id: number;
  amount: number;
  product: Product;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Product, amount?: number) => void;
  removeFromCart: (item: CartItem) => void;
  fetchCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const showToast = useToast();

  const fetchCart = async () => {
    if (localStorage.getItem(Constants.LOCAL_STORAGE.TOKEN)) {
      const response = await fetch(`${Constants.API_URL}/basket`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            Constants.LOCAL_STORAGE.TOKEN
          )}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setCartItems(data.data);
        localStorage.setItem(
          Constants.LOCAL_STORAGE.CART,
          JSON.stringify(data.data)
        );
      }
      return;
    }
    const cart = JSON.parse(localStorage.getItem(Constants.LOCAL_STORAGE.CART));
    setCartItems(cart);
  };

  const addToCart = async (item: Product, amount?: number) => {
    if (localStorage.getItem(Constants.LOCAL_STORAGE.TOKEN)) {
      const response = await fetch(`${Constants.API_URL}/basket`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            Constants.LOCAL_STORAGE.TOKEN
          )}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ product_id: item.id, amount: amount }),
      });
      if (response.ok) {
        const data = await response.json();
        if (!amount) showToast(true, "Produkts pievienots grozam!");
        setCartItems(data.data);
        localStorage.setItem(
          Constants.LOCAL_STORAGE.CART,
          JSON.stringify(data.data)
        );
      } else {
        localStorage.removeItem(Constants.LOCAL_STORAGE.TOKEN);
      }
    }
    showToast(true, "Produkts pievienots grozam!");
    const cart = JSON.parse(localStorage.getItem(Constants.LOCAL_STORAGE.CART));
    const itemToAdd: CartItem = {
      user_id: 0,
      product_id: item.id,
      amount: amount ?? 1,
      product: item,
    };
    if (cart) {
      const existingProduct = cart.find(
        (cartItem: CartItem) => cartItem.product_id === item.id
      );
      if (existingProduct) {
        cart.find(
          (cartItem: CartItem) => cartItem.product_id === item.id
        ).amount = amount ?? existingProduct.amount + 1;
        setCartItems(cart);
        localStorage.setItem(
          Constants.LOCAL_STORAGE.CART,
          JSON.stringify(cart)
        );
        return;
      }

      const updatedCart = [...cart, itemToAdd];
      setCartItems(updatedCart);
      localStorage.setItem(
        Constants.LOCAL_STORAGE.CART,
        JSON.stringify(updatedCart)
      );
      return;
    }
    setCartItems([itemToAdd]);
    localStorage.setItem(
      Constants.LOCAL_STORAGE.CART,
      JSON.stringify([itemToAdd])
    );
    return;
  };

  const removeFromCart = async (item: CartItem) => {
    if (localStorage.getItem(Constants.LOCAL_STORAGE.TOKEN)) {
      const response = await fetch(
        `${Constants.API_URL}/basket/remove/${item.product_id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              Constants.LOCAL_STORAGE.TOKEN
            )}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        fetchCart();
      }
      return;
    }
    const cart = JSON.parse(localStorage.getItem(Constants.LOCAL_STORAGE.CART));
    const updatedCart = cart.filter(
      (cartItem: CartItem) => cartItem.product_id !== item.product_id
    );
    setCartItems(updatedCart);
    localStorage.setItem(
      Constants.LOCAL_STORAGE.CART,
      JSON.stringify(updatedCart)
    );
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, fetchCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export { CartProvider, useCart };
