import {
  createContext,
  useState,
  useMemo,
  useContext,
  useCallback,
  ReactNode,
} from "react";

import { ShoppingCartItem } from "@/types/shopping-cart-item";
import { Product } from "@/types/product";

export const ShoppingCartContext = createContext({} as ShoppingCartContext);
export const useShoppingCart = () => useContext(ShoppingCartContext);

interface ShoppingCartProviderProps {
  children: ReactNode;
}

interface ShoppingCartContext {
  totalPrice: number;
  addToShoppingCart: (newProduct: Product) => void;
  removeFromShoppingCart: (productId: number) => void;
  clearShoppingCart: () => void;
  shoppingCart: ShoppingCartItem[];
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [shoppingCart, setShoppingCart] = useState<ShoppingCartItem[]>([]);

  const totalPrice = useMemo(() => {
    return shoppingCart.reduce(
      (pv, { product: { price }, amount }) => pv + price * amount,
      0
    );
  }, [shoppingCart]);

  const removeFromShoppingCart = useCallback((productId: number) => {
    setShoppingCart((prevCart) => {
      const filtered = prevCart.filter(
        ({ product }) => product.id !== productId
      );
      return filtered;
    });
  }, []);

  const addToShoppingCart = useCallback((newProduct: Product) => {
    // Product already in cart ? -> add amount to the amount already in cart, else just add the product
    setShoppingCart((prevCart) => {
      const productInCart = prevCart.find(
        ({ product: { id } }) => id === newProduct.id
      );
      if (productInCart) {
        return prevCart.map(({ product, amount: prevAmount }) =>
          product.id === newProduct.id
            ? { product, amount: prevAmount + 1 }
            : { product, amount: prevAmount }
        );
      }
      return [...prevCart, { product: newProduct, amount: 1 }];
    });
  }, []);

  const clearShoppingCart = useCallback(() => {
    setShoppingCart([]);
  }, []);

  const value = useMemo(
    () => ({
      addToShoppingCart,
      removeFromShoppingCart,
      clearShoppingCart,
      totalPrice,
      shoppingCart,
    }),
    [
      addToShoppingCart,
      removeFromShoppingCart,
      clearShoppingCart,
      totalPrice,
      shoppingCart,
    ]
  );

  return (
    <ShoppingCartContext.Provider value={value}>
      {children}
    </ShoppingCartContext.Provider>
  );
}
