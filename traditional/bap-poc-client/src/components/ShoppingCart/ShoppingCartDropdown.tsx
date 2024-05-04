import { Dropdown, Button } from "flowbite-react";
import { MdOutlineShoppingCart } from "react-icons/md";
import ShoppingCartDropdownItem from "./ShoppingCartDropdownItem";
import { useShoppingCart } from "@/contexts/ShoppingCart.context";
import { formatToEuroCurrency } from "@/utils/formatValues";
import Link from "next/link";

const ShoppingCartDropdown = () => {
  const { shoppingCart, subtotal, total, shippingCost, removeFromShoppingCart } =
    useShoppingCart();
  const numberOfItemsInCart = shoppingCart.length;

  return (
    <Dropdown
      arrowIcon={false}
      inline
      label={
        <div className="relative px-2">
          <MdOutlineShoppingCart size={24} />
          {numberOfItemsInCart > 0 && (
            <span className="absolute -bottom-3 -right-2 text-white bg-red-600 px-[6px] py-[1px] text-sm border-l rounded-full">
              {numberOfItemsInCart}
            </span>
          )}
        </div>
      }
    >
      <Dropdown.Header className="font-bold text-lg">
        Winkelwagen
      </Dropdown.Header>

      <div className="flex flex-col p-3 gap-3">
        {shoppingCart.length ? (
          <>
            {shoppingCart.map((item, index) => (
              <ShoppingCartDropdownItem
                key={`shoppingCartItem-${index}`}
                shoppingCartItem={item}
                onRemoveFromCart={() => removeFromShoppingCart(item.product.id)}
              />
            ))}
            <Dropdown.Divider />
            <div className="flex ">
              <div className="w-28">Subtotaal:</div>
              <span>{formatToEuroCurrency(subtotal)}</span>
            </div>
            <div className="flex ">
              <div className="w-28">Verzending:</div>
              <span>{formatToEuroCurrency(shippingCost)}</span>
            </div>
            <div className="flex ">
              <div className="w-28 font-semibold">Totaal:</div>
              <span className="font-semibold">{formatToEuroCurrency(total)}</span>
            </div>
            <Link href="/checkout">
              <Button>Bestellen</Button>
            </Link>
          </>
        ) : (
          <p>Nog geen producten in winkelwagen</p>
        )}
      </div>
    </Dropdown>
  );
};

export default ShoppingCartDropdown;
