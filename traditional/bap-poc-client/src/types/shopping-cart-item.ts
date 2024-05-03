import { Product } from "@/api/products";

export interface ShoppingCartItem {
    product: Product;
    amount: number;
}