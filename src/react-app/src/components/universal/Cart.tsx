import { createContext, useContext, useState, ReactNode } from "react";
import { Constants } from "./Constants";
import { useToast } from "./Toast";
import { IProduct } from "./interfaces/IProduct";

interface ICartItem {
  amount: number;
  product: IProduct;
}

interface ICartContextType {
  cartItems: ICartItem[];
  addToCart: (item: IProduct, amount?: number) => void;
  removeFromCart: (item: ICartItem) => void;
  fetchCart: () => void;
  payForBasket: () => void;
}

const CartContext = createContext<ICartContextType | undefined>(undefined);

const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);
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

  const addToCart = async (item: IProduct, amount?: number) => {
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
    const itemToAdd: ICartItem = {
      amount: amount ?? 1,
      product: item,
    };
    if (cart) {
      const existingProduct = cart.find(
        (cartItem: ICartItem) => cartItem.product.id === item.id
      );
      if (existingProduct) {
        cart.find(
          (cartItem: ICartItem) => cartItem.product.id === item.id
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

  const removeFromCart = async (item: ICartItem) => {
    if (localStorage.getItem(Constants.LOCAL_STORAGE.TOKEN)) {
      const response = await fetch(
        `${Constants.API_URL}/basket/remove/${item.product.id}`,
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
      (cartItem: ICartItem) => cartItem.product.id !== item.product.id
    );
    setCartItems(updatedCart);
    localStorage.setItem(
      Constants.LOCAL_STORAGE.CART,
      JSON.stringify(updatedCart)
    );
  };
  const payForBasket = async () => {
    await fetch(`${Constants.API_URL}/checkout`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          Constants.LOCAL_STORAGE.TOKEN
        )}`,
      },
    }).then(async (response) => {
      await response.json().then((data) => {
        window.location.href = data.url;
      })
    });
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, fetchCart, payForBasket }}
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


