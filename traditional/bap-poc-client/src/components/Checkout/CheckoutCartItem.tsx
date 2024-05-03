import { ShoppingCartItem } from "@/types/shopping-cart-item";
import { formatToEuroCurrency } from "@/utils/formatValues";
import { Button, Card } from "flowbite-react";
import Image from "next/image";
import { IoMdClose } from "react-icons/io";

interface CheckoutCartItemProps {
  shoppingCartItem: ShoppingCartItem;
}

const CheckoutCartItem = ({
  shoppingCartItem: {
    product: { name, price, imageUrl },
    amount,
  },
}: CheckoutCartItemProps) => {
  return (
    <div className="max-h-24 flex gap-4 border-gray-100 border-2 p-1 rounded-md">
      <Image src={imageUrl} width={80} height={80} alt="product image" />
      <div className="flex flex-col gap-2 w-full">
        <div className="flex w-full justify-between items-center">
          <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
            {name}
          </h5>
          <p className="font-semibold">
            {formatToEuroCurrency(price * amount)}
          </p>
        </div>
        <div className="flex w-full justify-between items-center">
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Hoeveelheid: {amount}
          </p>
          <p className="text-gray-600">
            {formatToEuroCurrency(price)} per stuk
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutCartItem;
