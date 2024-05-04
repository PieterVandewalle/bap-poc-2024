import { Product } from "./product";

export interface ShoppingCartItem {
    product: Product;
    amount: number;
}