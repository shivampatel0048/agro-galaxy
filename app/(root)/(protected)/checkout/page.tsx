"use client";

import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { clearShoppingCart, fetchCart } from "@/redux/features/cartSlice";
import { fetchUserInfo, updateUserById } from "@/redux/features/userSlice";
import { getToken } from "@/utils/tokenUtils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Address } from "@/types";
import { toast } from "sonner";
import { createNewOrder, fetchUserOrders } from "@/redux/features/orderSlice";
import { OrderData } from "@/types/order";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/constants/context/LanguageProvider";
import LoadingUI from "@/components/loaders/LoadingUI";

const CheckoutPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { language } = useLanguage();
  const { cart, status: cartStatus } = useAppSelector((state) => state.cart);
  const { user, status } = useAppSelector((state) => state.user);

  const [newAddress, setNewAddress] = useState<Address>({
    street: "",
    city: "",
    state: "",
    pincode: "",
    landmark: "",
  });
  const [selectedAddressIndex, setSelectedAddressIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const texts = {
    en: {
      checkout: "Checkout",
      yourItems: "Your Items",
      deliveryAddress: "Delivery Address",
      addNewAddress: "Add New Address",
      street: "Street",
      city: "City",
      state: "State",
      pincode: "Pincode",
      landmark: "Landmark (Optional)",
      addAddress: "Add Address",
      adding: "Adding...",
      orderSummary: "Order Summary",
      subtotal: "Subtotal",
      gst: "GST (18%)",
      deliveryFee: "Delivery Fee",
      total: "Total",
      placeOrder: "Place Order",
      errorAddress: "Please select an address to proceed.",
      successAddress: "Address added successfully!",
      errorUserId: "User ID not found. Please log in and try again.",
      errorPlaceOrder: "Failed to place order. Please try again.",
    },
    hi: {
      checkout: "चेकआउट",
      yourItems: "आपकी वस्तुएं",
      deliveryAddress: "डिलीवरी पता",
      addNewAddress: "नया पता जोड़ें",
      street: "सड़क",
      city: "शहर",
      state: "राज्य",
      pincode: "पिनकोड",
      landmark: "लैंडमार्क (वैकल्पिक)",
      addAddress: "पता जोड़ें",
      adding: "जोड़ रहा है...",
      orderSummary: "ऑर्डर सारांश",
      subtotal: "उप-योग",
      gst: "जीएसटी (18%)",
      deliveryFee: "डिलीवरी शुल्क",
      total: "कुल",
      placeOrder: "ऑर्डर करें",
      errorAddress: "आगे बढ़ने के लिए कृपया एक पता चुनें।",
      successAddress: "पता सफलतापूर्वक जोड़ा गया!",
      errorUserId: "उपयोगकर्ता आईडी नहीं मिली। कृपया लॉग इन करें और पुनः प्रयास करें।",
      errorPlaceOrder: "ऑर्डर करने में विफल। कृपया पुनः प्रयास करें।",
    },
  };

  const t = texts[language] || texts.en;

  useEffect(() => {
    const token = getToken();
    if (cartStatus === "idle" && token) {
      dispatch(fetchCart());
    }

    if (status === "idle" && token) {
      dispatch(fetchUserInfo());
    }
  }, [dispatch, cartStatus]);

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  };

  const handleAddAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user?._id) {
      setIsLoading(true);
      try {
        const updatedAddresses = [...(user.addresses || []), newAddress];
        const response = await dispatch(
          updateUserById({ id: user._id, userData: { addresses: updatedAddresses } })
        ).unwrap();

        if (response) {
          setNewAddress({ street: "", city: "", state: "", pincode: "", landmark: "" });
          toast.success(t.successAddress);
        } else {
          throw new Error("Unexpected error occurred while adding the address.");
        }
      } catch (error: any) {
        toast.error(error.message || "Failed to add address. Please try again.");
      } finally {
        setIsLoading(false);
      }
    } else {
      toast.error(t.errorUserId);
    }
  };

  const handleToggleAddress = (index: number) => {
    setSelectedAddressIndex(index);
  };

  const subtotal = cart?.totalPrice ?? 0;
  const gst = subtotal * 0.18; // Assuming 18% GST
  const deliveryFee = 50; // Fixed delivery fee
  const total = subtotal + gst + deliveryFee;

  const handleCreateOrder = async () => {
    const selectedAddress = user?.addresses?.[selectedAddressIndex ?? 0];

    if (!selectedAddress) {
      return toast.error(t.errorAddress);
    }

    const orderData: OrderData = {
      items: cart?.items.map((item) => ({
        productId: item.product._id,
        title: item.product.title[language],
        quantity: item.quantity,
        price: item.totalPrice,
      })) ?? [],
      address: selectedAddress,
      subtotal: subtotal,
      gst: gst,
      deliveryFee: deliveryFee,
      total: total,
    };
    try {
      const action = await dispatch(createNewOrder(orderData));
      if (action) {
        const isCleared = await dispatch(clearShoppingCart()).unwrap();
        await dispatch(fetchUserOrders())
        if (isCleared) router.push("/profile/my-orders");
      } else {
        toast.error(t.errorPlaceOrder);
      }
    } catch (error) {
      toast.error(t.errorPlaceOrder);
    }
  };

  if (status === "loading" || cartStatus === "loading") return <LoadingUI />

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">{t.checkout}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">{t.yourItems}</h2>
          {cart?.items.map((item) => (
            <div key={item.product._id} className="flex items-center mb-4 p-4 bg-gray-100 rounded-lg">
              <img
                src={item.product.thumbnail || "/placeholder.svg"}
                alt={item.product.title[language]}
                className="w-20 h-20 object-cover rounded mr-4"
              />
              <div>
                <h3 className="font-semibold">{item.product.title[language]}</h3>
                <p className="text-sm text-gray-600">{item.product.description[language].substring(0, 100)}...</p>
                <p className="mt-1">{`Quantity: ${item.quantity}`}</p>
                <p className="font-semibold">{`₹${item.totalPrice.toLocaleString("en-IN")}`}</p>
              </div>
            </div>
          ))}

          <h2 className="text-2xl font-semibold mt-8 mb-4">{t.deliveryAddress}</h2>
          {user?.addresses?.map((address, index) => (
            <div key={index} className="flex items-center mb-2">
              <Checkbox
                id={`address-${index}`}
                checked={selectedAddressIndex === index}
                onCheckedChange={() => handleToggleAddress(index)}
              />
              <label htmlFor={`address-${index}`} className="ml-2">
                {`${address.street}, ${address.city}, ${address.state} - ${address.pincode}`}
                {address.landmark && `, ${t.landmark}: ${address.landmark}`}
              </label>
            </div>
          ))}

          <form onSubmit={handleAddAddress} className="mt-4">
            <h3 className="text-xl font-semibold mb-2">{t.addNewAddress}</h3>
            <Input
              type="text"
              name="street"
              value={newAddress.street}
              onChange={handleAddressChange}
              placeholder={t.street}
              className="mb-2"
              required
            />
            <Input
              type="text"
              name="city"
              value={newAddress.city}
              onChange={handleAddressChange}
              placeholder={t.city}
              className="mb-2"
              required
            />
            <Input
              type="text"
              name="state"
              value={newAddress.state}
              onChange={handleAddressChange}
              placeholder={t.state}
              className="mb-2"
              required
            />
            <Input
              type="text"
              name="pincode"
              value={newAddress.pincode}
              onChange={handleAddressChange}
              placeholder={t.pincode}
              className="mb-2"
              required
            />
            <Input
              type="text"
              name="landmark"
              value={newAddress.landmark}
              onChange={handleAddressChange}
              placeholder={t.landmark}
              className="mb-2"
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? t.adding : t.addAddress}
            </Button>
          </form>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">{t.orderSummary}</h2>
          <div className="bg-gray-100 p-4 rounded-lg mb-4">
            <div className="flex justify-between mb-2">
              <span>{t.subtotal}</span>
              <span>{`₹${subtotal.toLocaleString("en-IN")}`}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>{t.gst}</span>
              <span>{`₹${gst.toLocaleString("en-IN")}`}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>{t.deliveryFee}</span>
              <span>{`₹${deliveryFee.toLocaleString("en-IN")}`}</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>{t.total}</span>
              <span>{`₹${total.toLocaleString("en-IN")}`}</span>
            </div>
          </div>
          <Button onClick={handleCreateOrder}>{t.placeOrder}</Button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
