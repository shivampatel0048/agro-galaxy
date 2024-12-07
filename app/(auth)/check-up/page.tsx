"use client";

import Navbar from "@/components/shared/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Section } from "@/components/ui/Section";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";

const CheckoutPage = () => {
  const { toast } = useToast();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("creditCard");
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Sandqvist Zack", size: "35 L", quantity: 2, price: 110.99 },
    { id: 2, name: "Sandqvist Bernt", size: "30 L", quantity: 1, price: 159.99 },
    { id: 3, name: "Sandqvist Zack 5", size: "25 L", quantity: 1, price: 89.99 },
  ]);

  const handleQuantityChange = (id: number, delta: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.quantity * item.price, 0).toFixed(2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Order Placed",
      description: `Your order has been placed successfully with ${
        selectedPaymentMethod === "creditCard"
          ? "Credit Card"
          : selectedPaymentMethod === "paypal"
          ? "PayPal"
          : "Cash on Delivery"
      }!`,
    });
  };

  return (
 <>
    <Navbar/>
   
    <main className="min-h-screen bg-gradient-to-br from-green-100 via-yellow-50 to-green-100 flex items-center justify-center px-4">
      <Section
        className="w-full max-w-[1500px] bg-white shadow-xl rounded-3xl p-10 flex flex-col space-y-8 lg:flex-row lg:space-y-0 lg:space-x-12"
      >
        {/* Left Section: Cart Items */}
        <div className="flex-1 space-y-6">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Your Cart</h2>
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-gray-50 p-6 rounded-lg shadow-sm"
            >
              <div className="flex items-center space-x-6">
                <img
                  src={`/path/to/product${item.id}.jpg`}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-md border border-gray-200 shadow-sm"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.size}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleQuantityChange(item.id, -1)}
                  className="p-3 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 transition"
                >
                  <FiMinus />
                </button>
                <span className="text-lg font-medium">{item.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(item.id, 1)}
                  className="p-3 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 transition"
                >
                  <FiPlus />
                </button>
                <p className="text-lg font-semibold text-gray-800">
                  ${(item.quantity * item.price).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
          <div className="mt-6 space-y-4">
            <div className="flex justify-between text-lg">
              <p className="font-semibold text-gray-800">Subtotal:</p>
              <p className="text-gray-700">${calculateTotal()}</p>
            </div>
            <div className="flex justify-between text-lg">
              <p className="font-semibold text-gray-800">Shipping:</p>
              <p className="text-gray-700">Free</p>
            </div>
            <div className="flex justify-between text-xl font-bold">
              <p>Total:</p>
              <p>${calculateTotal()}</p>
            </div>
          </div>
        </div>

        {/* Right Section: Payment */}
        <div className="flex-1 space-y-8">
          <h3 className="text-3xl font-bold text-gray-800">Payment Method</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Payment Options */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <input
                  type="radio"
                  name="paymentMethod"
                  id="creditCard"
                  value="creditCard"
                  checked={selectedPaymentMethod === "creditCard"}
                  onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                  className="w-5 h-5 accent-blue-600"
                />
                <label htmlFor="creditCard" className="text-lg text-gray-800">
                  Credit Card
                </label>
              </div>
              <div className="flex items-center space-x-4">
                <input
                  type="radio"
                  name="paymentMethod"
                  id="paypal"
                  value="paypal"
                  checked={selectedPaymentMethod === "paypal"}
                  onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                  className="w-5 h-5 accent-blue-600"
                />
                <label htmlFor="paypal" className="text-lg text-gray-800">
                  PayPal
                </label>
              </div>
              <div className="flex items-center space-x-4">
                <input
                  type="radio"
                  name="paymentMethod"
                  id="cashOnDelivery"
                  value="cashOnDelivery"
                  checked={selectedPaymentMethod === "cashOnDelivery"}
                  onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                  className="w-5 h-5 accent-blue-600"
                />
                <label htmlFor="cashOnDelivery" className="text-lg text-gray-800">
                  Cash on Delivery
                </label>
              </div>
            </div>

            {/* Credit Card Details */}
            {selectedPaymentMethod === "creditCard" && (
              <div className="space-y-4">
                <Input
                  type="text"
                  placeholder="Name on Card"
                  required
                  className="w-full border-gray-300 rounded-lg p-4 placeholder-gray-400 focus:ring-2 focus:ring-blue-400 shadow-sm"
                />
                <Input
                  type="text"
                  placeholder="Card Number"
                  required
                  className="w-full border-gray-300 rounded-lg p-4 placeholder-gray-400 focus:ring-2 focus:ring-blue-400 shadow-sm"
                />
                <div className="flex space-x-4">
                  <Input
                    type="text"
                    placeholder="MM/YY"
                    required
                    className="w-1/2 border-gray-300 rounded-lg p-4 placeholder-gray-400 focus:ring-2 focus:ring-blue-400 shadow-sm"
                  />
                  <Input
                    type="text"
                    placeholder="CVV"
                    required
                    className="w-1/2 border-gray-300 rounded-lg p-4 placeholder-gray-400 focus:ring-2 focus:ring-blue-400 shadow-sm"
                  />
                </div>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 shadow-md transition"
            >
              Place Order
            </Button>
          </form>

          {/* Continue Shopping */}
          <div className="text-center">
            <Link href="/shop" className="text-blue-600 hover:underline">
              Continue Shopping
            </Link>
          </div>
        </div>
      </Section>
    </main>
    </>
  );
};

export default CheckoutPage;
