import CheckoutCartItem from "./CheckoutCartItem";
import { ShoppingCartItem } from "@/types/shopping-cart-item";
import { formatToEuroCurrency } from "@/utils/formatValues";

interface CheckoutCartPanelProps {
  shoppingCart: ShoppingCartItem[];
  subtotal: number;
  shippingCost: number;
  total: number;

}
const CheckoutCartPanel = ({ shoppingCart, subtotal, shippingCost, total }: CheckoutCartPanelProps) => {
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
        <h4 className="text-lg">Subtotaal</h4>
        <h4 className="text-lg w-24 text-left">{formatToEuroCurrency(subtotal)}</h4>
      </div>

      <div className="flex justify-between">
        <h4 className="text-lg">Verzending</h4>
        <h4 className="text-lg w-24 text-left">{formatToEuroCurrency(shippingCost)}</h4>
      </div>

      <div className="flex justify-between">
        <h4 className="font-bold text-lg">Totaal</h4>
        <h4 className="font-bold text-lg w-24 text-left">{formatToEuroCurrency(total)}</h4>
      </div>
    </div>
  );
};

export default CheckoutCartPanel;