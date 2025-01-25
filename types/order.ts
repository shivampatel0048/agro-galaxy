export interface Order {
    _id: string;
    userId: string;
    items: IOrderItem[];
    totalPrice: number;
    subtotal: number;
    gst: number;
    deliveryFee: number;
    orderStatus: string;
    shippingAddress: string;
    paymentStatus: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface IOrderItem {
    product: Product;
    quantity: number;
    price: number;
    totalPrice: number;
}

export interface Product {
    title: TranslatedText;
    description: TranslatedText;
    _id: string;
    price: number;
    thumbnail: string;
}

export interface TranslatedText {
    en: string;
    hi: string;
}

interface OrderItem {
    productId: string;
    quantity: number;
    price: number;
}

interface Address {
    street: string;
    city: string;
    state: string;
    pincode: string;
    landmark?: string;
}

interface OrderData {
    items: OrderItem[];
    address: Address;
    subtotal: number;
    gst: number;
    deliveryFee: number;
    total: number;
}

export type { OrderData, OrderItem, Address };