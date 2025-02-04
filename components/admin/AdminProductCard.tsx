"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface AdminProductCardProps {
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
}

const AdminProductCard: React.FC<AdminProductCardProps> = ({
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
}) => {
  const router = useRouter();

  const discountedPrice = (price - (price * discountPercentage) / 100).toFixed(
    2
  );

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg bg-white shadow-md hover:shadow-lg">
      <Link href={`/products/details/${id}`} className="w-full">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={thumbnail}
            alt={title.en}
            height={400}
            width={400}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">
          {title.en}
        </h3>
        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{description.en}</p>
        <p className="text-sm text-gray-500 mt-1">
          Rating: {averageRating.toFixed(2) || "0"}
        </p>
        <p className="text-sm text-gray-500 mt-1">
          Brand: {brand}
        </p>
        <p className="text-sm text-gray-500 mt-1">
          Category: {category.en}
        </p>
        <p className="text-sm text-gray-500 mt-1">
          Stocks: {stock}
        </p>
        <p className="text-lg font-bold text-gray-900 mt-2 ">
          Price: ₹{discountedPrice}
        </p>
        <div className="mt-4 flex flex-col gap-4 sm:flex-row-reverse sm:justify-between items-center">
          <button
            className="flex items-center justify-center w-full sm:w-1/2 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300 transition"
          >
            Delete
          </button>
          <button
            type="button"
            onClick={() => router.push(`/admin/products/add-or-edit?id=${id}`)}
            className="flex items-center justify-center w-full sm:w-1/2 mt-2 sm:mt-0 ml-0 sm:ml-2 px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 transition"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminProductCard;
