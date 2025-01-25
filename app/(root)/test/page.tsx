"use client";

import { useEffect } from "react";
import { useLanguage } from "@/constants/context/LanguageProvider";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { fetchProducts } from "@/redux/features/ProductSlice";
import { Product } from "@/types";
import Image from "next/image";
import { fetchCart } from "@/redux/features/cartSlice";
import { getToken } from "@/utils/tokenUtils";

const Page = () => {
  const dispatch = useAppDispatch();
  const { language } = useLanguage();

  const {
    products,
    status: productStatus,
    error: productError,
  } = useAppSelector((state: RootState) => state.products);
  const {
    cart,
    status: cartStatus,
    error: cartError,
  } = useAppSelector((state: RootState) => state.cart);

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
    },
  };

  const currentTexts = texts[language] || texts.en; // Default to English if language is not set

  useEffect(() => {
    const token = getToken();
    if (productStatus === "idle") {
      dispatch(fetchProducts());
    }
    if (cartStatus === "idle" && token) {
      dispatch(fetchCart());
    }
  }, [dispatch, productStatus, cartStatus]);

  return (
    <div className="mt-20 text-center text-2xl">
      <p>Language: {language}</p>

      {/* Display Products */}
      <div>
        {productStatus === "loading" && <p>{currentTexts.loadingProducts}</p>}
        {productStatus === "failed" && productError && (
          <p>
            {currentTexts.errorLoadingProducts.replace("{error}", productError)}
          </p>
        )}
        {productStatus === "succeeded" && products && products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product: Product) => (
              <div
                key={product._id}
                className="border p-4 rounded-lg shadow-lg"
              >
                <Image
                  src={product.thumbnail}
                  alt={product.title[language]}
                  className="w-full h-48 object-cover rounded"
                  width={500}
                  height={500}
                  loading="lazy"
                />
                <h2 className="text-xl font-semibold mt-2">
                  {product.title[language]}
                </h2>
                <p className="mt-2">{product.description[language]}</p>
                <p className="mt-2 text-lg font-bold">₹{product.price}</p>
                <p className="mt-2 text-sm text-gray-600">
                  Stock: {product.stock}
                </p>
                <p className="mt-2 text-sm text-gray-500">
                  {product.category[language]}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p>{currentTexts.noProducts}</p>
        )}
      </div>

      {/* Display Cart */}
      <div className="mt-8">
        {cartStatus === "loading" && <p>{currentTexts.loadingCart}</p>}
        {cartStatus === "failed" && cartError && (
          <p>{currentTexts.errorLoadingCart.replace("{error}", cartError)}</p>
        )}
        {cartStatus === "succeeded" && cart?.items?.length ? (
          <div>
            <h3 className="text-2xl font-semibold">{currentTexts.yourCart}</h3>
            <div className="mt-4">
              <h4 className="text-lg font-bold">
                {currentTexts.totalCartPrice.replace(
                  "{price}",
                  cart.totalPrice.toString()
                )}
              </h4>
            </div>
          </div>
        ) : (
          <p>{currentTexts.emptyCart}</p>
        )}
      </div>
    </div>
  );
};

export default Page;
