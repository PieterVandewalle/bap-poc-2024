import { Product, ProductResponse } from '@/types/product';
import axios from '.';

export const getAllProducts = async () : Promise<Product[]>  => {
	const res = await axios.get<ProductResponse>('product');
	return res.data.products;
};