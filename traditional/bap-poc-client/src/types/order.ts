import { Customer } from "./customer";
import { OrderItem } from "./order-item";

export interface CreateOrderResponse {
	id: number;
}

export interface Order {
  customer: Customer;
  items: OrderItem[];
}
