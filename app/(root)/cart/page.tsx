"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchCart, removeFromCart } from "@/redux/features/cartSlice";
import { getToken } from "@/utils/tokenUtils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useLanguage } from "@/constants/context/LanguageProvider";

const CartPage = () => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart.cart);
  const { language } = useLanguage();


  useEffect(() => {
    const token = getToken();

    if (!cart && token) {
      dispatch(fetchCart());
    }
  }, [dispatch, cart]);

  const handleRemove = (productId: string) => {
    dispatch(removeFromCart(productId));
  };

  return (
    <section id="cart" className="py-16 max-w-[90%] md:max-w-6xl mx-auto">
      <h2 className="text-center text-4xl font-bold">Your Cart</h2>
      {!cart?.items?.length ? (
        <p className="text-center mt-4">Your cart is empty!</p>
      ) : (
        <>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {cart?.items.map((item) => (
              <div
                key={item.product._id}
                className="flex flex-col p-4 bg-gray-100 rounded-lg shadow-md"
              >
                <img
                  src={item.product.thumbnail}
                  alt={item.product.title[language]}
                  className="w-full h-40 object-cover rounded-lg"
                />

                <div className="mt-4 flex-grow">
                  <h3 className="text-lg font-semibold">
                    {item.product.title[language]}
                  </h3>
                  <p className="text-sm text-gray-600 mt-2">
                    {item.product.description[language]}
                  </p>
                  <div className="mt-2">
                    <span className="font-medium">Quantity:</span>{" "}
                    {item.quantity}
                  </div>
                  <div className="text-lg font-bold mt-2">
                    ₹{item.totalPrice.toLocaleString("en-IN")}
                  </div>
                </div>

                <button
                  className="mt-4 py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  onClick={() => handleRemove(item.product._id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="pt-7 w-full flex justify-end">
            <Link href="/checkout">
              <Button className="">
                Checkout
              </Button>
            </Link>
          </div>
        </>
      )}
    </section>
  );
};

// Interface for the product details
interface Product {
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
  thumbnail: string;
}

// Interface for each cart item
interface CartItem {
  product: Product;
  quantity: number;
  price: number;
  totalPrice: number;
}

// Interface for the entire cart
interface Cart {
  _id: string;
  userId: string;
  items: CartItem[];
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}


export default CartPage;