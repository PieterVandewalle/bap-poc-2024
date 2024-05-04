import { Product } from "@/types/product";
import { formatToEuroCurrency } from "@/utils/formatValues";
import { Button, Card } from "flowbite-react";
import Image from "next/image";

interface ProductListItemProps {
  product: Product;
  onAddToCart: () => void;
}

const ProductListItem = ({ product, onAddToCart }: ProductListItemProps) => {
  return (
    <Card
      className="max-w-sm justify-self-center"
      renderImage={() => <Image width={300} height={200} className="w-full h-auto" src={product.imageUrl} alt={product.name} />}
      
    >
      <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
        {product.name}
      </h5>

      <h4 className="text-sm tracking-tight text-gray-700 dark:text-white">
        {product.description}
      </h4>

      <div className="flex items-center justify-between">
        <span className="text-3xl font-bold text-gray-900 dark:text-white">
          {formatToEuroCurrency(product.price)}
        </span>
        <Button
          onClick={onAddToCart}
          className="rounded-lg bg-cyan-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
        >
          In winkelwagen
        </Button>
      </div>
    </Card>
  );
};

export default ProductListItem;
