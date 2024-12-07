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
    images: string[];
    deleted: boolean;
    __v?: number;
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
    email: string;
    password: string;
    role?: "user" | "vendor" | "admin";
    resetPasswordToken?: string;
    resetPasswordExpires?: Date;
    phone?: string;
    addresses?: Address[];
    createdAt?: Date;
    updatedAt?: Date;
  }
  