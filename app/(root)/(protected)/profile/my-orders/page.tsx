"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { getToken } from "@/utils/tokenUtils"
import { fetchUserOrders } from "@/redux/features/orderSlice"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/context/LanguageProvider"
import { ArrowLeft, Calendar, ChevronDown, ChevronUp, CreditCard, ExternalLink, Package, Truck } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import LoadingUI from "@/components/loaders/LoadingUI"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { 
  Clock, 
  MapPin, 
  Receipt, 
  CheckCircle, 
  XCircle 
} from "lucide-react"

const orderStatusConfig = {
  Pending: {
    color: "bg-yellow-100 text-yellow-800 border-yellow-200",
    icon: <Clock className="h-3 w-3" />
  },
  Processing: {
    color: "bg-blue-100 text-blue-800 border-blue-200",
    icon: <Package className="h-3 w-3" />
  },
  Shipped: {
    color: "bg-purple-100 text-purple-800 border-purple-200",
    icon: <Truck className="h-3 w-3" />
  },
  Delivered: {
    color: "bg-green-100 text-green-800 border-green-200",
    icon: <CheckCircle className="h-3 w-3" />
  },
  Cancelled: {
    color: "bg-red-100 text-red-800 border-red-200",
    icon: <XCircle className="h-3 w-3" />
  }
}

const paymentStatusColors = {
    Pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    Paid: "bg-green-100 text-green-800 border-green-200",
    Failed: "bg-red-100 text-red-800 border-red-200",
}

export default function OrdersPage() {
    const dispatch = useAppDispatch()
    const { orders, status } = useAppSelector((state) => state.orders)
    const router = useRouter()
    const { language } = useLanguage()
    const [expandedOrders, setExpandedOrders] = useState<Record<string, boolean>>({})

    const texts = {
        en: {
            myOrders: "My Orders",
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
            viewProduct: "View Product",
            noOrders: "You haven't placed any orders yet",
            noOrdersDesc: "When you place orders, they'll appear here for you to track.",
            quantity: "Quantity",
            price: "Price",
            orderId: "Order ID",
            back: "Back",
            showDetails: "Show Details",
            hideDetails: "Hide Details",
            orderInfo: "Order Information",
            all: "All Orders",
            pending: "Pending",
            processing: "Processing",
            shipped: "Shipped",
            delivered: "Delivered",
            cancelled: "Cancelled",
            loadingOrders: "Loading your orders...",
            errorOrders: "Could not load your orders"
        },
        hi: {
            myOrders: "मेरे आदेश",
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
            viewProduct: "उत्पाद देखें",
            noOrders: "आपने अभी तक कोई आदेश नहीं दिया है",
            noOrdersDesc: "जब आप आदेश देंगे, तो वे यहां ट्रैक करने के लिए दिखाई देंगे।",
            quantity: "मात्रा",
            price: "कीमत",
            orderId: "आदेश आईडी",
            back: "वापस",
            showDetails: "विवरण दिखाएं",
            hideDetails: "विवरण छिपाएं",
            orderInfo: "आदेश की जानकारी",
            all: "सभी आदेश",
            pending: "लंबित",
            processing: "प्रक्रियाधीन",
            shipped: "भेजा गया",
            delivered: "वितरित",
            cancelled: "रद्द",
            loadingOrders: "आपके आदेश लोड हो रहे हैं...",
            errorOrders: "आपके आदेश लोड नहीं हो सके"
        },
    }

    const t = texts[language] || texts.en

    useEffect(() => {
        const token = getToken()

        if (status === "idle" && token) {
            dispatch(fetchUserOrders())
        }
    }, [dispatch, status])

    const toggleOrderExpansion = (orderId: string) => {
        setExpandedOrders(prev => ({
            ...prev,
            [orderId]: !prev[orderId]
        }))
    }

    if (status === "loading") {
        return <LoadingUI />
    }

    if (status === "failed") {
        return (
            <div className="max-w-4xl w-full mx-auto p-4 py-16 text-center">
                <div className="bg-red-50 p-6 rounded-lg">
                    <h2 className="text-xl font-semibold text-red-800 mb-2">{t.errorOrders}</h2>
                    <p className="text-red-600 mb-4">Please try refreshing the page or come back later.</p>
                    <Button onClick={() => dispatch(fetchUserOrders())}>
                        Try Again
                    </Button>
                </div>
            </div>
        )
    }

    const renderOrderStatus = (status: string) => {
        const config = orderStatusConfig[status as keyof typeof orderStatusConfig] 
            || { color: "bg-gray-100 text-gray-800 border-gray-200", icon: null }
        
        return (
            <Badge variant="outline" className={cn(
            "flex items-center gap-1.5 py-1 px-2 text-xs font-medium",
            config.color
            )}>
            {config.icon}
            {status}
            </Badge>
        )
    }

    const renderPaymentStatus = (status: string) => {
        const colorClass = paymentStatusColors[status as keyof typeof paymentStatusColors] || "bg-gray-100 text-gray-800 border-gray-200"
        return (
            <Badge variant="outline" className={`${colorClass} py-1 px-2 text-xs font-medium`}>
                {status}
            </Badge>
        )
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return new Intl.DateTimeFormat(language === 'en' ? 'en-US' : 'hi-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date)
    }

    return (
        <div className="max-w-4xl w-full mx-auto p-4 py-8">
            <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => router.back()}
                            className="h-8 w-8 rounded-full"
                        >
                            <ArrowLeft size={16} />
                        </Button>
                        <h1 className="text-2xl sm:text-3xl font-bold">{t.myOrders}</h1>
                    </div>
                    <p className="text-gray-500 mt-1 ml-10">Track and manage your past purchases</p>
                </div>
            </div>

            {orders && orders.length > 0 ? (
                <div className="space-y-8">
                    <Tabs defaultValue="all" className="w-full">
                        <div className="border-b border-gray-200 overflow-x-auto sr-only">
                            <TabsList className="bg-transparent h-auto p-0 w-full justify-start">
                                <TabsTrigger
                                    value="all"
                                    className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none py-3 font-medium"
                                >
                                    {t.all}
                                </TabsTrigger>
                                <TabsTrigger
                                    value="pending"
                                    className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none py-3 font-medium"
                                >
                                    {t.pending}
                                </TabsTrigger>
                                <TabsTrigger
                                    value="processing"
                                    className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none py-3 font-medium"
                                >
                                    {t.processing}
                                </TabsTrigger>
                                <TabsTrigger
                                    value="shipped"
                                    className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none py-3 font-medium"
                                >
                                    {t.shipped}
                                </TabsTrigger>
                                <TabsTrigger
                                    value="delivered"
                                    className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none py-3 font-medium"
                                >
                                    {t.delivered}
                                </TabsTrigger>
                            </TabsList>
                        </div>

                        <TabsContent value="all" className="space-y-6 mt-6">
                            {[...orders] // Create a new array before sorting
                                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                                .map((order) => (
                                    <Card key={order._id} className="w-full overflow-hidden border border-gray-100 shadow-sm hover:border-gray-200 transition-all duration-200">
                                        <Collapsible
                                            open={expandedOrders[order._id]}
                                            onOpenChange={() => toggleOrderExpansion(order._id)}
                                        >
                                            <CardContent className="p-0">
                                                {/* Order Header */}
                                                <div className="p-6 bg-white border-b border-gray-100">
                                                    <div className="flex flex-col sm:flex-row justify-between gap-4">
                                                        <div className="space-y-3">
                                                            <div className="space-y-1">
                                                                <div className="flex items-center gap-2 text-sm">
                                                                    <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                                                                        #{order._id.slice(-8).toUpperCase()}
                                                                    </span>
                                                                    <span className="text-gray-500">•</span>
                                                                    <span className="text-gray-500 text-sm">
                                                                        {formatDate(order.createdAt)}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className="flex flex-wrap gap-2">
                                                                {renderOrderStatus(order.orderStatus)}
                                                                {renderPaymentStatus(order.paymentStatus)}
                                                            </div>
                                                        </div>

                                                        <div className="flex items-center gap-4">
                                                            <div className="text-right">
                                                                <p className="text-sm text-gray-500">{t.total}</p>
                                                                <p className="text-lg font-semibold">
                                                                    ₹{order.totalPrice.toLocaleString("en-IN", {
                                                                        minimumFractionDigits: 2,
                                                                        maximumFractionDigits: 2
                                                                    })}
                                                                </p>
                                                            </div>
                                                            <CollapsibleTrigger asChild>
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    className="h-9 px-4 rounded-full"
                                                                >
                                                                    {expandedOrders[order._id] ? (
                                                                        <span className="flex items-center gap-2">
                                                                            <ChevronUp className="h-4 w-4" />
                                                                            {t.hideDetails}
                                                                        </span>
                                                                    ) : (
                                                                        <span className="flex items-center gap-2">
                                                                            <ChevronDown className="h-4 w-4" />
                                                                            {t.showDetails}
                                                                        </span>
                                                                    )}
                                                                </Button>
                                                            </CollapsibleTrigger>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Order Details */}
                                                <CollapsibleContent>
                                                    <ScrollArea className="max-h-[600px]">
                                                        <div className="p-6 space-y-6 bg-gray-50/50">
                                                            {/* Products List */}
                                                            <div className="space-y-4">
                                                                <h3 className="font-medium flex items-center gap-2">
                                                                    <Package className="h-4 w-4 text-gray-500" />
                                                                    {t.items}
                                                                </h3>
                                                                <div className="grid gap-4">
                                                                    {order.items.map((item) => (
                                                                        <div
                                                                            key={item.product._id}
                                                                            className="bg-white p-4 rounded-lg border border-gray-100 flex gap-4"
                                                                        >
                                                                            <div className="relative h-20 w-20 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                                                                                <Image
                                                                                    src={item.product.thumbnail}
                                                                                    alt={item.product.title[language]}
                                                                                    fill
                                                                                    className="object-cover"
                                                                                />
                                                                            </div>
                                                                            <div className="flex-1 min-w-0">
                                                                                <div className="flex items-start justify-between gap-4">
                                                                                    <div>
                                                                                        <h4 className="font-medium text-gray-900">
                                                                                            {item.product.title[language]}
                                                                                        </h4>
                                                                                        <p className="text-sm text-gray-500 mt-1 line-clamp-1">
                                                                                            {item.product.description[language]}
                                                                                        </p>
                                                                                    </div>
                                                                                    <Link href={`/products/details/${item.product._id}`}>
                                                                                        <Button 
                                                                                            variant="ghost" 
                                                                                            size="sm"
                                                                                            className="h-8 w-8 rounded-full"
                                                                                        >
                                                                                            <ExternalLink className="h-4 w-4" />
                                                                                        </Button>
                                                                                    </Link>
                                                                                </div>
                                                                                <div className="mt-2 flex items-center gap-4 text-sm text-gray-600">
                                                                                    <span>{t.quantity}: {item.quantity}</span>
                                                                                    <span>•</span>
                                                                                    <span>{t.price}: ₹{item.price.toLocaleString("en-IN")}</span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>

                                                            {/* Order Summary and Shipping */}
                                                            <div className="grid sm:grid-cols-2 gap-6">
                                                                <div className="space-y-4">
                                                                    <h3 className="font-medium flex items-center gap-2">
                                                                        <Receipt className="h-4 w-4 text-gray-500" />
                                                                        {t.orderInfo}
                                                                    </h3>
                                                                    <div className="bg-white p-4 rounded-lg border border-gray-100">
                                                                        <div className="flex justify-between text-sm">
                                                                            <span className="text-gray-600">{t.subtotal}</span>
                                                                            <span>₹{order.subtotal.toLocaleString("en-IN", {
                                                                                minimumFractionDigits: 2,
                                                                                maximumFractionDigits: 2
                                                                            })}</span>
                                                                        </div>
                                                                        <div className="flex justify-between text-sm">
                                                                            <span className="text-gray-600">{t.gst}</span>
                                                                            <span>₹{order.gst.toLocaleString("en-IN", {
                                                                                minimumFractionDigits: 2,
                                                                                maximumFractionDigits: 2
                                                                            })}</span>
                                                                        </div>
                                                                        <div className="flex justify-between text-sm">
                                                                            <span className="text-gray-600">{t.deliveryFee}</span>
                                                                            <span>₹{order.deliveryFee.toLocaleString("en-IN", {
                                                                                minimumFractionDigits: 2,
                                                                                maximumFractionDigits: 2
                                                                            })}</span>
                                                                        </div>
                                                                        <Separator className="my-2" />
                                                                        <div className="flex justify-between font-medium">
                                                                            <span>{t.total}</span>
                                                                            <span>₹{order.totalPrice.toLocaleString("en-IN", {
                                                                                minimumFractionDigits: 2,
                                                                                maximumFractionDigits: 2
                                                                            })}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="space-y-4">
                                                                    <h3 className="font-medium flex items-center gap-2">
                                                                        <MapPin className="h-4 w-4 text-gray-500" />
                                                                        {t.shippingAddress}
                                                                    </h3>
                                                                    <div className="bg-white p-4 rounded-lg border border-gray-100">
                                                                        <p className="text-gray-600 text-sm whitespace-pre-line">
                                                                            {order.shippingAddress}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <ScrollBar />
                                                    </ScrollArea>
                                                </CollapsibleContent>
                                            </CardContent>
                                        </Collapsible>
                                    </Card>
                                ))}
                        </TabsContent>

                        {/* These content tabs will filter orders by status */}
                        <TabsContent value="pending" className="space-y-6 mt-6">
                            {[...orders]
                                .filter(order => order.orderStatus === "Pending")
                                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                                .map((order) => (
                                    <Card key={order._id} className="w-full overflow-hidden border border-gray-100 shadow-sm hover:border-gray-200 transition-all duration-200">
                                        <Collapsible
                                            open={expandedOrders[order._id]}
                                            onOpenChange={() => toggleOrderExpansion(order._id)}
                                        >
                                            <CardContent className="p-0">
                                                {/* Order Header */}
                                                <div className="p-6 bg-white border-b border-gray-100">
                                                    <div className="flex flex-col sm:flex-row justify-between gap-4">
                                                        <div className="space-y-3">
                                                            <div className="space-y-1">
                                                                <div className="flex items-center gap-2 text-sm">
                                                                    <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                                                                        #{order._id.slice(-8).toUpperCase()}
                                                                    </span>
                                                                    <span className="text-gray-500">•</span>
                                                                    <span className="text-gray-500 text-sm">
                                                                        {formatDate(order.createdAt)}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className="flex flex-wrap gap-2">
                                                                {renderOrderStatus(order.orderStatus)}
                                                                {renderPaymentStatus(order.paymentStatus)}
                                                            </div>
                                                        </div>

                                                        <div className="flex items-center gap-4">
                                                            <div className="text-right">
                                                                <p className="text-sm text-gray-500">{t.total}</p>
                                                                <p className="text-lg font-semibold">
                                                                    ₹{order.totalPrice.toLocaleString("en-IN", {
                                                                        minimumFractionDigits: 2,
                                                                        maximumFractionDigits: 2
                                                                    })}
                                                                </p>
                                                            </div>
                                                            <CollapsibleTrigger asChild>
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    className="h-9 px-4 rounded-full"
                                                                >
                                                                    {expandedOrders[order._id] ? (
                                                                        <span className="flex items-center gap-2">
                                                                            <ChevronUp className="h-4 w-4" />
                                                                            {t.hideDetails}
                                                                        </span>
                                                                    ) : (
                                                                        <span className="flex items-center gap-2">
                                                                            <ChevronDown className="h-4 w-4" />
                                                                            {t.showDetails}
                                                                        </span>
                                                                    )}
                                                                </Button>
                                                            </CollapsibleTrigger>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Order Details */}
                                                <CollapsibleContent>
                                                    <ScrollArea className="max-h-[600px]">
                                                        <div className="p-6 space-y-6 bg-gray-50/50">
                                                            {/* Products List */}
                                                            <div className="space-y-4">
                                                                <h3 className="font-medium flex items-center gap-2">
                                                                    <Package className="h-4 w-4 text-gray-500" />
                                                                    {t.items}
                                                                </h3>
                                                                <div className="grid gap-4">
                                                                    {order.items.map((item) => (
                                                                        <div
                                                                            key={item.product._id}
                                                                            className="bg-white p-4 rounded-lg border border-gray-100 flex gap-4"
                                                                        >
                                                                            <div className="relative h-20 w-20 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                                                                                <Image
                                                                                    src={item.product.thumbnail}
                                                                                    alt={item.product.title[language]}
                                                                                    fill
                                                                                    className="object-cover"
                                                                                />
                                                                            </div>
                                                                            <div className="flex-1 min-w-0">
                                                                                <div className="flex items-start justify-between gap-4">
                                                                                    <div>
                                                                                        <h4 className="font-medium text-gray-900">
                                                                                            {item.product.title[language]}
                                                                                        </h4>
                                                                                        <p className="text-sm text-gray-500 mt-1 line-clamp-1">
                                                                                            {item.product.description[language]}
                                                                                        </p>
                                                                                    </div>
                                                                                    <Link href={`/products/details/${item.product._id}`}>
                                                                                        <Button 
                                                                                            variant="ghost" 
                                                                                            size="sm"
                                                                                            className="h-8 w-8 rounded-full"
                                                                                        >
                                                                                            <ExternalLink className="h-4 w-4" />
                                                                                        </Button>
                                                                                    </Link>
                                                                                </div>
                                                                                <div className="mt-2 flex items-center gap-4 text-sm text-gray-600">
                                                                                    <span>{t.quantity}: {item.quantity}</span>
                                                                                    <span>•</span>
                                                                                    <span>{t.price}: ₹{item.price.toLocaleString("en-IN")}</span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>

                                                            {/* Order Summary and Shipping */}
                                                            <div className="grid sm:grid-cols-2 gap-6">
                                                                <div className="space-y-4">
                                                                    <h3 className="font-medium flex items-center gap-2">
                                                                        <Receipt className="h-4 w-4 text-gray-500" />
                                                                        {t.orderInfo}
                                                                    </h3>
                                                                    <div className="bg-white p-4 rounded-lg border border-gray-100">
                                                                        <div className="flex justify-between text-sm">
                                                                            <span className="text-gray-600">{t.subtotal}</span>
                                                                            <span>₹{order.subtotal.toLocaleString("en-IN", {
                                                                                minimumFractionDigits: 2,
                                                                                maximumFractionDigits: 2
                                                                            })}</span>
                                                                        </div>
                                                                        <div className="flex justify-between text-sm">
                                                                            <span className="text-gray-600">{t.gst}</span>
                                                                            <span>₹{order.gst.toLocaleString("en-IN", {
                                                                                minimumFractionDigits: 2,
                                                                                maximumFractionDigits: 2
                                                                            })}</span>
                                                                        </div>
                                                                        <div className="flex justify-between text-sm">
                                                                            <span className="text-gray-600">{t.deliveryFee}</span>
                                                                            <span>₹{order.deliveryFee.toLocaleString("en-IN", {
                                                                                minimumFractionDigits: 2,
                                                                                maximumFractionDigits: 2
                                                                            })}</span>
                                                                        </div>
                                                                        <Separator className="my-2" />
                                                                        <div className="flex justify-between font-medium">
                                                                            <span>{t.total}</span>
                                                                            <span>₹{order.totalPrice.toLocaleString("en-IN", {
                                                                                minimumFractionDigits: 2,
                                                                                maximumFractionDigits: 2
                                                                            })}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="space-y-4">
                                                                    <h3 className="font-medium flex items-center gap-2">
                                                                        <MapPin className="h-4 w-4 text-gray-500" />
                                                                        {t.shippingAddress}
                                                                    </h3>
                                                                    <div className="bg-white p-4 rounded-lg border border-gray-100">
                                                                        <p className="text-gray-600 text-sm whitespace-pre-line">
                                                                            {order.shippingAddress}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <ScrollBar />
                                                    </ScrollArea>
                                                </CollapsibleContent>
                                            </CardContent>
                                        </Collapsible>
                                    </Card>
                                ))}
                        </TabsContent>

                        {/* Repeat for processing, shipped, delivered tabs */}
                        {/* ... */}
                    </Tabs>
                </div>
            ) : (
                <div className="text-center py-16">
                    <div className="bg-gray-50 p-10 rounded-xl">
                        <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 mb-4">
                            <Package className="h-10 w-10 text-gray-400" />
                        </div>
                        <h2 className="text-xl font-semibold mb-2">{t.noOrders}</h2>
                        <p className="text-gray-500 max-w-md mx-auto mb-6">{t.noOrdersDesc}</p>
                        <Link href="/products">
                            <Button>Browse Products</Button>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    )
}
