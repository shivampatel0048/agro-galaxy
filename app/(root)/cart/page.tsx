"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchCart, removeFromCart } from "@/redux/features/cartSlice";

const CartPage = () => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart.cart);
  const [isAddedToCart, setIsAddedToCart] = useState<boolean>(false);

  useEffect(() => {
    if (!cart) {
      dispatch(fetchCart());
    }
  }, [dispatch, cart]);

  const handleRemove = (productId: string) => {
    dispatch(removeFromCart(productId));
  };

  return (
    <section id="cart" className="py-16 max-w-[90%] md:max-w-4xl mx-auto">
      <h2 className="text-center text-4xl font-bold">Your Cart</h2>
      {!cart?.items?.length ? (
        <p className="text-center mt-4">Your cart is empty!</p>
      ) : (
        <div className="mt-12">
          <ul>
            {cart.items.map((item) => (
              <li
                key={item.productId}
                className="flex justify-between p-4 bg-gray-100 rounded-lg mb-4"
              >
                <span>{item.productId}</span>
                <span>
                  {item.quantity} x ₹{item.price}
                </span>
                <button
                  className="ml-4 text-red-500 hover:text-red-700"
                  onClick={() => handleRemove(item.productId)} // Handle the click to remove item
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};

export default CartPage;
