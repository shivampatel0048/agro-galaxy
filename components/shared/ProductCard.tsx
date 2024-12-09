"use client";

import React from "react";
import Image from "next/image";

interface ProductCardProps {
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
  onAddToCart: () => void;
  onBuy: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
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
  onAddToCart,
  onBuy,
}) => {
  const discountedPrice = (price - (price * discountPercentage) / 100).toFixed(
    2
  );

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg bg-white shadow-md hover:shadow-lg">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={thumbnail}
          alt={title[language]}
          height={400}
          width={400}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">
          {title[language]}
        </h3>
        <p className="text-sm text-gray-500 mt-1">{description[language]}</p>
        {/* <p className="text-sm text-gray-500 mt-1">
          {language === "en" ? "Category" : "श्रेणी"}: {category[language]}
        </p> */}
        {/* <p className="text-sm text-gray-500 mt-1">
          {language === "en" ? "Brand" : "ब्रांड"}: {brand}
        </p> */}
        <p className="text-sm text-gray-500 mt-1">
          {language === "en" ? "Rating" : "रेटिंग"}: {averageRating || "N/A"}
        </p>
        {/* <p className="text-sm text-gray-500 mt-1">
          {language === "en" ? "Stock" : "स्टॉक"}: {stock}
        </p> */}
        {/* <p className="text-lg font-bold text-gray-900 mt-2">
          {language === "en" ? "discountedPrice " : "मूल्य"}: ₹{discountedPrice}
        </p> */}
        <p className="text-lg font-bold text-gray-900 mt-2 ">
          {language === "en" ? "Price" : "मूल्य"}: ₹{price}
        </p>
        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:justify-between items-center">
          <button
            className="flex items-center justify-center w-full sm:w-1/2 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300 transition"
            onClick={onAddToCart}
          >
            🛒 {language === "en" ? "Add Cart" : "कार्ट में जोड़ें"}
          </button>
          <button
            className="flex items-center justify-center w-full sm:w-1/2 mt-2 sm:mt-0 ml-0 sm:ml-2 px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 transition"
            onClick={onBuy}
          >
            🛍 {language === "en" ? "Buy" : "खरीदें"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
