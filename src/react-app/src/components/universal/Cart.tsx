import { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "./interfaces/Product";
import { Constants } from "./Constants";
import { useToast } from "./Toast";

interface CartContextType {
  getCartItems: () => Promise<Product[]>;
  addToCart: (item: Product) => Promise<Product[]>;
  removeFromCart: (item: Product) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const showToast = useToast();

  const getSessionStorageCart = () => {
    const sessionStorageCart = JSON.parse(
      sessionStorage.getItem(Constants.SESSION_STORAGE.CART)
    );
    if (sessionStorageCart) {
      setCartItems(sessionStorageCart);

      return true;
    }
    return false;
  };

  const getCartItems = async () => {
    if (!getSessionStorageCart()) {
      await fetchCart();
    }
    return cartItems;
  };

  const fetchCart = async () => {
    const response = await fetch(`${Constants.API_URL}/basket`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem(
          Constants.SESSION_STORAGE.TOKEN
        )}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      setCartItems(data);
      sessionStorage.setItem(
        Constants.SESSION_STORAGE.CART,
        JSON.stringify(data)
      );
    }
  };

  const addToCart = async (item: Product) => {
    const response = await fetch(`${Constants.API_URL}/basket`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem(
          Constants.SESSION_STORAGE.TOKEN
        )}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ product_id: item.id, amount: 1 }),
    });

    if (response.ok) {
      showToast(true, "Produkts pievienots grozam!");
      const newCartItems = [...cartItems, item];
      setCartItems(newCartItems);
      saveCartToLocalStorage(item);
      return newCartItems; // Return the updated cart
    } else {
      showToast(false, "Kļūda pievienojot produktu grozam.");
    }

    return [];
  };

  const removeFromCart = async (item: Product) => {
    //TODO: back-end function!
    const newArray = cartItems.filter((i: Product) => i.id !== item.id);
    sessionStorage.setItem(
      Constants.SESSION_STORAGE.CART,
      JSON.stringify(newArray)
    );
    setCartItems(newArray);
  };

  const saveCartToLocalStorage = (item: Product) => {
    const cart =
      JSON.parse(sessionStorage.getItem(Constants.SESSION_STORAGE.CART)) ?? [];
    const existingItem = cart.find((i: Product) => i.id === item.id);

    if (existingItem) {
      existingItem.amount++;
    } else {
      cart.push({ ...item, amount: 1 });
    }

    sessionStorage.setItem(
      Constants.SESSION_STORAGE.CART,
      JSON.stringify(cart)
    );
  };

  return (
    <CartContext.Provider value={{ getCartItems, addToCart, removeFromCart }}>
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
