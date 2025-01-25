export interface Order {
    _id: string;
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