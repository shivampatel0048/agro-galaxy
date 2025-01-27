"use client";

import { useEffect } from "react";
import { useLanguage } from "@/constants/context/LanguageProvider";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { fetchProducts } from "@/redux/features/ProductSlice";
import { fetchCart } from "@/redux/features/cartSlice";
import ProductCard from "@/components/shared/ProductCard";
import { Section } from "@/components/ui/Section";
import LoadingUI from "@/components/loaders/LoadingUI";

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
    <Section id="products" className="bg-background py-16">
      <h2 className="text-center text-4xl font-bold text-text-primary md:text-5xl">
        {currentTexts.featuredProducts}
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-center text-gray-600">
        {currentTexts.discoverProducts}
      </p>

      <div className="mt-12">
        {productStatus === "failed" && (
          <p>
            {currentTexts.errorLoadingProducts.replace(
              "{error}",
              productError || ""
            )}
          </p>
        )}
        {productStatus === "succeeded" && products?.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                id={product?._id ?? '#'}
                title={product.title}
                description={product.description}
                category={product.category}
                price={product.price}
                discountPercentage={product.discountPercentage}
                stock={product.stock}
                brand={product.brand}
                thumbnail={product.thumbnail}
                averageRating={Number(`${product.averageRating}`)}
                language={language}
              />
            ))}
          </div>
        ) : (
          <p>{currentTexts.noProducts}</p>
        )}
      </div>
    </Section>
  );
};

export default Page;
