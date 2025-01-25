"use client"

import { useState, useEffect } from "react"
import { useAppSelector, useAppDispatch } from "@/redux/hooks"
import { clearShoppingCart, fetchCart } from "@/redux/features/cartSlice"
import { fetchUserInfo, updateUserById } from "@/redux/features/userSlice"
import { getToken } from "@/utils/tokenUtils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Address } from "@/types"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import { createNewOrder } from "@/redux/features/orderSlice"
import { OrderData } from "@/types/order"
import { useRouter } from "next/navigation"

const CheckoutPage = () => {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const { cart, status: cartStatus } = useAppSelector((state) => state.cart)
    const { user, status } = useAppSelector((state) => state.user)
    const [newAddress, setNewAddress] = useState<Address>({
        street: "",
        city: "",
        state: "",
        pincode: "",
        landmark: "",
    })
    const [selectedAddressIndex, setSelectedAddressIndex] = useState<number | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        const token = getToken()
        if (cartStatus === 'idle' && token) {
            dispatch(fetchCart())
        }

        if (status === 'idle' && token) {
            dispatch(fetchUserInfo())
        }
    }, [dispatch, cartStatus])

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewAddress({ ...newAddress, [e.target.name]: e.target.value })
    }

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
                    toast.success("Address added successfully!");
                } else {
                    throw new Error("Unexpected error occurred while adding the address.");
                }
            } catch (error: any) {
                toast.error(error.message || "Failed to add address. Please try again.");
            } finally {
                setIsLoading(false);
            }
        } else {
            toast.error("User ID not found. Please log in and try again.");
        }
    };

    const handleToggleAddress = (index: number) => {
        setSelectedAddressIndex(index)
    }

    const subtotal = cart?.totalPrice ?? 0
    const gst = subtotal * 0.18 // Assuming 18% GST
    const deliveryFee = 50 // Fixed delivery fee
    const total = subtotal + gst + deliveryFee

    const handleCreateOrder = async () => {
        const selectedAddress = user?.addresses?.[selectedAddressIndex ?? 0];

        if (!selectedAddress) {
            return toast.error("Please select an address to proceed.");
        }

        const orderData: OrderData = {
            items: cart?.items.map((item) => ({
                productId: item.product._id,
                title: item.product.title.en,
                quantity: item.quantity,
                price: item.totalPrice,
            })) ?? [],
            address: selectedAddress,
            subtotal: subtotal,
            gst: gst,
            deliveryFee: deliveryFee,
            total: total
        };
        try {
            const action = await dispatch(createNewOrder(orderData));
            if (action) {
                const isCleared = await dispatch(clearShoppingCart()).unwrap();
                if (isCleared) router.push("/");
            } else {
                toast.error("Failed to place order. Please try again.");
            }
        } catch (error) {
            toast.error("Failed to place order. Please try again.");
        }
    };


    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold mb-8">Checkout</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h2 className="text-2xl font-semibold mb-4">Your Items</h2>
                    {cart?.items.map((item) => (
                        <div key={item.product._id} className="flex items-center mb-4 p-4 bg-gray-100 rounded-lg">
                            <img
                                src={item.product.thumbnail || "/placeholder.svg"}
                                alt={item.product.title.en}
                                className="w-20 h-20 object-cover rounded mr-4"
                            />
                            <div>
                                <h3 className="font-semibold">{item.product.title.en}</h3>
                                <p className="text-sm text-gray-600">{item.product.description.en.substring(0, 100)}...</p>
                                <p className="mt-1">Quantity: {item.quantity}</p>
                                <p className="font-semibold">₹{item.totalPrice.toLocaleString("en-IN")}</p>
                            </div>
                        </div>
                    ))}

                    <h2 className="text-2xl font-semibold mt-8 mb-4">Delivery Address</h2>
                    {user?.addresses?.map((address, index) => (
                        <div key={index} className="flex items-center mb-2">
                            <Checkbox
                                id={`address-${index}`}
                                checked={selectedAddressIndex === index}
                                onCheckedChange={() => handleToggleAddress(index)}
                            />
                            <label htmlFor={`address-${index}`} className="ml-2">
                                {address.street}, {address.city}, {address.state} - {address.pincode}
                                {address.landmark && `, Landmark: ${address.landmark}`}
                            </label>
                        </div>
                    ))}

                    <form onSubmit={handleAddAddress} className="mt-4">
                        <h3 className="text-xl font-semibold mb-2">Add New Address</h3>
                        <Input
                            type="text"
                            name="street"
                            value={newAddress.street}
                            onChange={handleAddressChange}
                            placeholder="Street"
                            className="mb-2"
                            required
                        />
                        <Input
                            type="text"
                            name="city"
                            value={newAddress.city}
                            onChange={handleAddressChange}
                            placeholder="City"
                            className="mb-2"
                            required
                        />
                        <Input
                            type="text"
                            name="state"
                            value={newAddress.state}
                            onChange={handleAddressChange}
                            placeholder="State"
                            className="mb-2"
                            required
                        />
                        <Input
                            type="text"
                            name="pincode"
                            value={newAddress.pincode}
                            onChange={handleAddressChange}
                            placeholder="Pincode"
                            className="mb-2"
                            required
                        />
                        <Input
                            type="text"
                            name="landmark"
                            value={newAddress.landmark}
                            onChange={handleAddressChange}
                            placeholder="Landmark (Optional)"
                            className="mb-2"
                        />
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? (
                                <div className="flex items-center gap-2">
                                    <Loader2 className="animate-spin" />
                                    <span>Adding...</span>
                                </div>
                            ) : (
                                "Add Address"
                            )}
                        </Button>
                    </form>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
                    <div className="bg-gray-100 p-6 rounded-lg">
                        <div className="flex justify-between mb-2">
                            <span>Subtotal</span>
                            <span>₹{subtotal.toLocaleString("en-IN")}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span>GST (18%)</span>
                            <span>₹{gst.toLocaleString("en-IN")}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span>Delivery Fee</span>
                            <span>₹{deliveryFee.toLocaleString("en-IN")}</span>
                        </div>
                        <div className="flex justify-between font-semibold text-lg mt-4 pt-4 border-t">
                            <span>Total</span>
                            <span>₹{total.toLocaleString("en-IN")}</span>
                        </div>
                    </div>
                    <Button onClick={handleCreateOrder} className="w-full mt-6">Place Order</Button>
                </div>
            </div>
        </div>
    )
}

export default CheckoutPage