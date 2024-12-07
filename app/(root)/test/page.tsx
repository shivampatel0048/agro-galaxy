'use client'

import { useEffect } from 'react';
import { useLanguage } from '@/context/LanguageProvider';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';
import { fetchProducts } from '@/redux/features/ProductSlice';
import { Product } from '@/types';
import Image from 'next/image';

const Page = () => {
    const dispatch = useAppDispatch();
    const { language } = useLanguage();

    const { products, status, error } = useAppSelector((state: RootState) => state.products);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchProducts());
        }
    }, [dispatch, status]);

    return (
        <div className="mt-20 text-center text-2xl">
            <p>Language: {language}</p>

            {/* Display products */}
            {status === "loading" && <p>Loading products...</p>}
            {status === "failed" && <p>Error: {error}</p>}
            {status === "succeeded" && products && products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {products.map((product: Product) => (
                        <div key={product._id} className="border p-4 rounded-lg shadow-lg">
                            <Image
                                src={product.thumbnail}
                                alt={product.title[language]}
                                className="w-full h-48 object-cover rounded"
                                width={500}
                                loading='lazy'
                                height={500}
                            />

                            <h2 className="text-xl font-semibold mt-2">{product.title[language]}</h2>
                            <p className="mt-2">{product.description[language]}</p>
                            <p className="mt-2 text-lg font-bold">₹{product.price}</p>
                            <p className="mt-2 text-sm text-gray-600">Stock: {product.stock}</p>
                            <p className="mt-2 text-sm text-gray-500">{product.category[language]}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No products available.</p>
            )}
        </div>
    );
}

export default Page;
