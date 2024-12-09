// app/cart/page.tsx
"use client";

import { useCart } from "@/constants/context/CartContext";

const CartPage = () => {
  const { cart } = useCart();

  return (
    <section id="cart" className="py-16">
      <h2 className="text-center text-4xl font-bold">Your Cart</h2>
      {cart.length === 0 ? (
        <p className="text-center mt-4">Your cart is empty!</p>
      ) : (
        <div className="mt-12">
          <ul>
            {cart.map((item) => (
              <li
                key={item.id}
                className="flex justify-between p-4 bg-gray-100 rounded-lg mb-4"
              >
                <span>{item.name}</span>
                <span>
                  {item.quantity} x ${item.price}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};

export default CartPage;
