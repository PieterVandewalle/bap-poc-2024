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
  subtotal: number;
  shippingCost: number;
  total: number;
  addToShoppingCart: (newProduct: Product) => void;
  removeFromShoppingCart: (productId: number) => void;
  clearShoppingCart: () => void;
  shoppingCart: ShoppingCartItem[];
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [shoppingCart, setShoppingCart] = useState<ShoppingCartItem[]>([]);

  const subtotal = useMemo(() => {
    return shoppingCart.reduce(
      (pv, { product: { price }, amount }) => pv + price * amount,
      0
    );
  }, [shoppingCart]);

  const shippingCost: number = useMemo(() => {
    if(subtotal < 100)
        return 19.99;

    if (subtotal < 400)
    {
        return 9.99;
    }

    if(subtotal < 3000)
    {
        return 2.99;
    }

    return 0;
  },[subtotal]);

  const total = subtotal + shippingCost;

  const removeFromShoppingCart = useCallback((productId: number) => {
    setShoppingCart((prevCart) => {
      const filtered = prevCart.filter(
        ({ product }) => product.id !== productId
      );
      return filtered;
    });
  }, []);

  const addToShoppingCart = useCallback((newProduct: Product) => {
    // Product already in cart ? -> add 1 to the amount already in cart, else just add the product
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
      subtotal,
      shippingCost,
      total,
      shoppingCart,
    }),
    [
      addToShoppingCart,
      removeFromShoppingCart,
      clearShoppingCart,
      subtotal,
      shippingCost,
      total,
      shoppingCart,
    ]
  );

  return (
    <ShoppingCartContext.Provider value={value}>
      {children}
    </ShoppingCartContext.Provider>
  );
}
