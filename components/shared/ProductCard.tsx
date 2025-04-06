"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useAppDispatch } from "@/redux/hooks";
import { addToCart, fetchCart } from "@/redux/features/cartSlice";
import { getToken } from "@/utils/tokenUtils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, ShoppingCart, ShoppingBag } from "lucide-react";
import { FiLoader } from "react-icons/fi";

interface ProductCardProps {
  id: string;
  title: { [key: string]: string };
  description: { [key: string]: string };
  category: { [key: string]: string };
  price: number;
  discountPercentage: number;
  stock: number;
  brand: string;
  thumbnail: string;
  averageRating: number;
  language: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  description,
  category,
  price,
  discountPercentage,
  stock,
  brand,
  thumbnail,
  averageRating,
  language,
}) => {
  const dispatch = useAppDispatch();
  const token = getToken()
  const router = useRouter();

  const discountedPrice = (price - (price * discountPercentage) / 100).toFixed(
    2
  );
  const [isAddedToCart, setIsAddedToCart] = useState<boolean>(false);
  const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false);
  const [isBuying, setIsBuying] = useState<boolean>(false);

  useEffect(() => {
    const token = getToken();

    if (isAddedToCart && token) {
      dispatch(fetchCart());
    }
  }, [isAddedToCart, dispatch]);

  const handleAddToCart = () => {
    if (!token) {
      toast.info('Please sign in to add item to cart')
      router.push('/sign-in')
      return;
    }

    setIsAddingToCart(true);
    const cartItemData = {
      productId: id,
      quantity: 1,
    };

    dispatch(addToCart(cartItemData))
      .unwrap()
      .then(() => {
        setIsAddedToCart(!isAddedToCart);
        router.push('/cart')
      })
      .catch((error) => {
        console.error("Failed to add item to cart:", error);
        toast.error("Failed to add item to cart");
      })
      .finally(() => {
        setIsAddingToCart(false);
      });
  };

  const handleBuyNow = () => {
    if (!token) {
      toast.info('Please sign in to buy this item')
      router.push('/sign-in')
      return;
    }

    setIsBuying(true);
    const cartItemData = {
      productId: id,
      quantity: 1,
    };

    dispatch(addToCart(cartItemData))
      .unwrap()
      .then(() => {
        setIsAddedToCart(!isAddedToCart);
        router.push('/checkout')
      })
      .catch((error) => {
        console.error("Failed to buy item:", error);
        toast.error("Failed to process your purchase");
      })
      .finally(() => {
        setIsBuying(false);
      });
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg bg-white shadow-md hover:shadow-lg">
      <Link href={`/products/details/${id}`} className="w-full">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={thumbnail}
            alt={title[language]}
            height={400}
            width={400}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">
          {title[language]}
        </h3>
        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{description[language]}</p>
        <p className="text-sm text-gray-500 mt-1">
          {language === "en" ? "Rating" : "रेटिंग"}: {averageRating.toFixed(2) || "0"}
        </p>
        <p className="text-lg font-bold text-gray-900 mt-2 ">
          {language === "en" ? "Price" : "मूल्य"}: ₹{discountedPrice}
        </p>
        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:justify-between items-center">
          <button
            className="flex items-center justify-center w-full sm:w-1/2 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300 transition disabled:opacity-70 disabled:cursor-not-allowed"
            onClick={handleAddToCart}
            disabled={isAddingToCart || isBuying}
          >
            {isAddingToCart ? (
              <span className="animate-spin mr-2">
                <FiLoader className="h-4 w-4" />
              </span>
            ) : (
              <ShoppingCart className="h-4 w-4 mr-2" />
            )}
            {language === "en" ? "Add Cart" : "कार्ट में जोड़ें"}
          </button>
          <button
            className="flex items-center justify-center w-full sm:w-1/2 mt-2 sm:mt-0 ml-0 sm:ml-2 px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 transition disabled:opacity-70 disabled:cursor-not-allowed"
            onClick={handleBuyNow}
            disabled={isAddingToCart || isBuying}
          >
            {isBuying ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <ShoppingBag className="h-4 w-4 mr-2" />
            )}
            {language === "en" ? "Buy" : "खरीदें"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;