export interface Product {
    _id: string;
    title: {
        en: string;
        hi: string;
    };
    description: {
        en: string;
        hi: string;
    };
    price: number;
    discountPercentage: number;
    stock: number;
    brand: string;
    category: {
        en: string;
        hi: string;
    };
    thumbnail: string;
    deleted: boolean;
    __v?: number;
    averageRating?: number;
    reviews?: string[] | Review[];
}

export interface Review {
    _id: string;
    productId: string;
    rating: number;
    userId: {
        id?: string;
        name: string;
    };
    review: string;
    createdAt: string;
    __v: number;
}


export interface Address {
    street: string;
    city: string;
    state: string;
    pincode: string;
    landmark?: string;
}

export interface User {
    _id?: string;
    name: string;
    email?: string;
    phone?: string;
    password: string;
    role?: "user" | "vendor" | "admin";
    resetPasswordToken?: string;
    resetPasswordExpires?: Date;
    addresses?: Address[];
    createdAt?: Date;
    updatedAt?: Date;
}

// Interface for the product details
export interface CartProduct {
    _id: string;
    title: {
        en: string;
        hi: string;
    };
    description: {
        en: string;
        hi: string;
    };
    price: number;
    discountPercentage: number;
    thumbnail: string;
}

export interface CartItem {
    product: CartProduct;
    quantity: number;
    price: number;
    totalPrice: number;
}

export interface Cart {
    _id: string;
    userId: string;
    items: CartItem[];
    totalPrice: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
}