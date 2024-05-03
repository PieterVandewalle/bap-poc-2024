import { Order } from '@/types/order';
import axios from '.';

interface CreateOrderResponse {
	id: number
}

export const createOrder = async (order: Order) : Promise<number>  => {
	const res = await axios.post<CreateOrderResponse>("order", order)
	return res.data.id;
};