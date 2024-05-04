import { useShoppingCart } from "@/contexts/ShoppingCart.context";
import ProductListItem from "./ProductListItem";
import { Product } from "@/types/product";

interface ProductsListProps {
  products: Product[];
}

const ProductList = ({ products }: ProductsListProps) => {
  const { addToShoppingCart } = useShoppingCart();

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 items-center align-middle content-center">
      {products.map((product) => (
        <ProductListItem
          key={product.id}
          product={product}
          onAddToCart={() => addToShoppingCart(product)}
        />
      ))}
    </div>
  );
};

export default ProductList;
