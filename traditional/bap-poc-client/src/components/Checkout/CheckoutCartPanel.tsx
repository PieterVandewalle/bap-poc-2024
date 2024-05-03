import CheckoutCartItem from "./CheckoutCartItem";
import { ShoppingCartItem } from "@/types/shopping-cart-item";
import { formatToEuroCurrency } from "@/utils/formatValues";

interface CheckoutCartPanelProps {
  shoppingCart: ShoppingCartItem[];
  totalPrice: number;
}
const CheckoutCartPanel = ({ shoppingCart, totalPrice }: CheckoutCartPanelProps) => {
  return (
    <div className="flex flex-col w-full gap-4 p-4">
      <h4 className="font-bold text-lg">Bestelling</h4>
      {shoppingCart.map((item, index) => (
        <CheckoutCartItem
          key={`checkoutCartItem-${index}`}
          shoppingCartItem={item}
        />
      ))}
      <div className="flex justify-between">
        <h4 className="font-bold text-lg">Totaal</h4>
        <h4 className="font-bold text-lg">{formatToEuroCurrency(totalPrice)}</h4>
      </div>
    </div>
  );
};

export default CheckoutCartPanel;