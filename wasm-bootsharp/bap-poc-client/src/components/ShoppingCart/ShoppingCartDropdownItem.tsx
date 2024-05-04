import { ShoppingCartItem } from "@/types/shopping-cart-item";
import { formatToEuroCurrency } from "@/utils/formatValues";
import { Button } from "flowbite-react";
import { IoMdClose } from "react-icons/io";

interface ShoppingCartDropdownItemProps {
  shoppingCartItem: ShoppingCartItem;
  onRemoveFromCart: () => void;
}

const ShoppingCartDropdownItem = ({
  shoppingCartItem: { product: {name, price}, amount },
  onRemoveFromCart
}: ShoppingCartDropdownItemProps) => {
  return (
    <div className="flex flex-col relative">
      <div className="absolute top-0 right-0">
        <Button  pill size={6} color="failure" onClick={onRemoveFromCart} >
            <IoMdClose />
        </Button>
      </div>
      <h5 className="font-semibold tracking-tight text-gray-900 dark:text-white">
        {name}
      </h5>
      <div className="grid grid-cols-2 gap-2">
        <p>{formatToEuroCurrency(price)}</p>
        <p className="justify-self-end">Hoeveelheid: {amount}</p>
      </div>
    </div>
  );
};

export default ShoppingCartDropdownItem;
