import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "@/api/products";
import { Spinner } from "flowbite-react";
import ProductList from "@/components/Products/ProductList";

export default function Home() {
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });

  if (isLoading) {
    return (
      <div className="flex gap-3">
        <Spinner aria-label="Left-aligned spinner example" />
        <span>Loading...</span>
      </div>
    );
  }

  if (isError) {
    return <p>Something went wrong..</p>;
  }

  return <ProductList products={products!} />;
}
