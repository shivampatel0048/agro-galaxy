"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { getToken } from "@/utils/tokenUtils"
import { fetchUserOrders } from "@/redux/features/orderSlice"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/constants/context/LanguageProvider"

export default function OrdersPage() {
    const dispatch = useAppDispatch()
    const { orders, status } = useAppSelector((state) => state.orders)
    const router = useRouter()
    const { language } = useLanguage();

    const texts = {
        en: {
            orderDate: "Order Date",
            status: "Status",
            paymentStatus: "Payment Status",
            items: "Items",
            subtotal: "Subtotal",
            gst: "GST",
            deliveryFee: "Delivery Fee",
            total: "Total",
            shippingAddress: "Shipping Address",
            viewDetails: "View Details",
            noOrders: "You have no orders yet.",
            quantity: "Quantity",
            price: "Price"
        },
        hi: {
            orderDate: "आदेश तिथि",
            status: "स्थिति",
            paymentStatus: "भुगतान स्थिति",
            items: "सामान",
            subtotal: "उप-योग",
            gst: "जीएसटी",
            deliveryFee: "डिलीवरी शुल्क",
            total: "कुल",
            shippingAddress: "शिपिंग पता",
            viewDetails: "विवरण देखें",
            noOrders: "आपके पास अभी तक कोई आदेश नहीं है।",
            quantity: "मात्रा",
            price: "कीमत"
        },
    }
    
    const t = texts[language] || texts.en;

    useEffect(() => {
        const token = getToken()

        if (status === "idle" && token) {
            dispatch(fetchUserOrders())
        }
    }, [dispatch, status])

    if (status === "loading") {
        return <div className="container mx-auto p-4">{t.noOrders}</div>
    }

    if (status === "failed") {
        return <div className="container mx-auto p-4">{t.noOrders}</div>
    }

    return (
        <div className="max-w-4xl w-full mx-auto p-4">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-3xl font-bold">{t.items}</h1>
                <Button onClick={() => router.back()}>
                    Back
                </Button>
            </div>
            {orders && orders.length > 0 ? (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <Card key={order._id} className="w-full">
                            <CardHeader className="sr-only">
                                <CardTitle className="sr-only">Order</CardTitle>
                            </CardHeader>
                            <CardContent className="p-4 sm:p-6">
                                <div className="grid gap-4">
                                    <div>
                                        <p>
                                            <strong>{t.orderDate}:</strong> {new Date(order.createdAt).toLocaleString()}
                                        </p>
                                        <p>
                                            <strong>{t.status}:</strong> {order.orderStatus}
                                        </p>
                                        <p>
                                            <strong>{t.paymentStatus}:</strong> {order.paymentStatus}
                                        </p>
                                    </div>
                                    <Separator />
                                    <div>
                                        <h3 className="text-lg font-semibold mb-2">{t.items}</h3>
                                        <div className="grid gap-4">
                                            {order.items.map((item) => (
                                                <Card key={item.product._id}>
                                                    <CardContent className="flex flex-col sm:flex-row justify-between items-center gap-y-4 gap-x-2 p-4">
                                                        <div className="flex items-center space-x-4">
                                                            <Image
                                                                src={item.product.thumbnail}
                                                                alt={item.product.title[language]}
                                                                width={100}
                                                                height={100}
                                                                className="rounded-md"
                                                            />
                                                            <div className="flex-grow">
                                                                <h4 className="font-semibold">{item.product.title[language]}</h4>
                                                                <p className="text-sm text-gray-600 max-w-xs w-full line-clamp-1">{item.product.description[language]}</p>
                                                                <p>Quantity: {item.quantity}</p>
                                                                <p>Price: ₹{item.price.toLocaleString("en-IN")}</p>
                                                            </div>
                                                        </div>

                                                        <Link href={`/products/details/${item.product._id}`} passHref>
                                                            <Button type="button" variant="outline">
                                                                {t.viewDetails}
                                                            </Button>
                                                        </Link>
                                                    </CardContent>
                                                </Card>
                                            ))}
                                        </div>
                                    </div>
                                    <Separator />
                                    <div>
                                        <p>
                                            <strong>{t.subtotal}:</strong> ₹{order.subtotal.toLocaleString("en-IN")}
                                        </p>
                                        <p>
                                            <strong>{t.gst}:</strong> ₹{order.gst.toLocaleString("en-IN")}
                                        </p>
                                        <p>
                                            <strong>{t.deliveryFee}:</strong> ₹{order.deliveryFee.toLocaleString("en-IN")}
                                        </p>
                                        <p className="text-lg font-semibold">
                                            <strong>{t.total}:</strong> ₹{order.totalPrice.toLocaleString("en-IN")}
                                        </p>
                                    </div>
                                    <Separator />
                                    <div>
                                        <h3 className="text-lg font-semibold mb-2">{t.shippingAddress}</h3>
                                        <p>{order.shippingAddress}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                <p>{t.noOrders}</p>
            )}
        </div>
    )
}
