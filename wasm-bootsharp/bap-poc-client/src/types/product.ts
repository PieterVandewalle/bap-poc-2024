export interface ProductResponse {
    products: Product[],
    totalAmount: number
}

export interface Product {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    description: string;
}
