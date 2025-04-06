"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageProvider";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { fetchProducts, deleteExistingProduct } from "@/redux/features/ProductSlice";
import LoadingUI from "@/components/loaders/LoadingUI";
import { Button } from "@/components/ui/button";
import AdminProductCard from "@/components/admin/AdminProductCard";
import Link from "next/link";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

const Page = () => {
    const dispatch = useAppDispatch();
    const { language } = useLanguage();
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState<string | null>(null);

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

    const handleDeleteClick = (productId: string) => {
        setProductToDelete(productId);
        setIsDeleteDialogOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!productToDelete) return;

        try {
            await dispatch(deleteExistingProduct(productToDelete)).unwrap();
            toast.success("Product deleted successfully");
        } catch (error) {
            toast.error("Failed to delete product");
        } finally {
            setIsDeleteDialogOpen(false);
            setProductToDelete(null);
        }
    };

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
                                onDelete={() => handleDeleteClick(product._id ?? '')}
                            />
                        ))}
                    </div>
                ) : (
                    <p>{currentTexts.noProducts}</p>
                )}
            </div>

            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the
                            product from the database.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleConfirmDelete}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default Page;