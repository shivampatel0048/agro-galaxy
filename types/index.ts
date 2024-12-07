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
