"use client";

import { useEffect } from "react";
import { useLanguage } from "@/context/LanguageProvider";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { fetchProducts } from "@/redux/features/ProductSlice";
import LoadingUI from "@/components/loaders/LoadingUI";
import { Button } from "@/components/ui/button";
import AdminProductCard from "@/components/admin/AdminProductCard";
import Link from "next/link";

const Page = () => {
    const dispatch = useAppDispatch();
    const { language } = useLanguage();

    const {
        products,
        status: productStatus,
        error: productError,
    } = useAppSelector((state: RootState) => state.products);

    const texts = {
        en: {
            loadingProducts: "Loading products...",
            errorLoadingProducts: "Error: {error}",
            noProducts: "No products available.",
            loadingCart: "Loading cart...",
            errorLoadingCart: "Error: {error}",
            emptyCart: "Your cart is empty.",
            yourCart: "Your Cart",
            totalCartPrice: "Total Cart Price: ₹{price}",
            featuredProducts: "Featured Products",
            discoverProducts: "Discover our range of innovative solutions.",
        },
        hi: {
            loadingProducts: "उत्पाद लोड हो रहे हैं...",
            errorLoadingProducts: "त्रुटि: {error}",
            noProducts: "कोई उत्पाद उपलब्ध नहीं है।",
            loadingCart: "कार्ट लोड हो रही है...",
            errorLoadingCart: "त्रुटि: {error}",
            emptyCart: "आपकी कार्ट खाली है।",
            yourCart: "आपकी कार्ट",
            totalCartPrice: "कुल कार्ट मूल्य: ₹{price}",
            featuredProducts: "विशेष उत्पाद",
            discoverProducts: "हमारे अभिनव समाधानों की खोज करें।",
        },
    };

    const currentTexts = texts[language] || texts.en;

    useEffect(() => {
        if (productStatus === "idle" && !products?.length) {
            dispatch(fetchProducts());
        }
    }, [dispatch, productStatus, products]);

    if (productStatus === "loading") return <LoadingUI />

    return (
        <div id="products" className="bg-background">
            <div className="flex items-center justify-between mb-5">
                <h1 className="text-3xl font-bold">Products</h1>

                <Link href={`/admin/products/add-or-edit`}>
                    <Button>Add Product</Button>
                </Link>
            </div>
            <div>
                {productStatus === "failed" && (
                    <p>
                        {currentTexts.errorLoadingProducts.replace(
                            "{error}",
                            productError ?? ""
                        )}
                    </p>
                )}
                {productStatus === "succeeded" && products?.length ? (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {products.map((product) => (
                            <AdminProductCard
                                key={product._id}
                                id={product._id ?? ''}
                                title={product.title}
                                description={product.description}
                                category={product.category}
                                price={product.price}
                                discountPercentage={product.discountPercentage}
                                stock={product.stock}
                                brand={product.brand}
                                thumbnail={product.thumbnail}
                                averageRating={Number(`${product.averageRating}`)}
                            />
                        ))}
                    </div>
                ) : (
                    <p>{currentTexts.noProducts}</p>
                )}
            </div>
        </div>
    );
};

export default Page;