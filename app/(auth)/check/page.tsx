import React from "react";

const CheckoutPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Checkout</h1>

        <div className="cart-summary mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Cart Summary</h2>
          <ul className="space-y-2 text-gray-600">
            {/* Example cart items, you can replace with dynamic data */}
            <li className="flex justify-between">
              <span>Product 1</span>
              <span>$10</span>
            </li>
            <li className="flex justify-between">
              <span>Product 2</span>
              <span>$20</span>
            </li>
          </ul>
          <p className="mt-4 text-xl font-semibold text-gray-800">Total: $30</p>
        </div>

        <div className="customer-details mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Customer Details</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-600">Name:</label>
              <input
                type="text"
                name="name"
                value="John Doe"  // Hardcoded value
                readOnly  // Making the field static
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-600">Email:</label>
              <input
                type="email"
                name="email"
                value="john.doe@example.com"  // Hardcoded value
                readOnly  // Making the field static
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-600">Address:</label>
              <textarea
                name="address"
                value="1234 Elm Street, Springfield"  // Hardcoded value
                readOnly  // Making the field static
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </form>
        </div>

        <div className="payment-options">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Payment Options</h2>
          {/* Add payment methods like Credit Card, PayPal, etc. */}
          <button className="w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
