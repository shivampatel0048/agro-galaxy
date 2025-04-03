"use client"

import { useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { fetchAllOrders, updateOrderStatus } from "@/redux/features/orderSlice"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import Pagination from "@/components/admin/Pagination"
import AdminLoader from "@/components/admin/AdminLoader"
import { cn, formatDate } from "@/lib/utils"

interface OrderItem {
    product: {
        title: {
            en: string
            hi: string
        }
        _id: string
    }
    quantity: number
}

const orderStatuses = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"]
const paymentStatuses = ["Pending", "Paid", "Failed", "Refunded"]

function getStatusColor(status: string): string {
    switch (status.toLowerCase()) {
        case "pending":
            return "bg-yellow-100 text-yellow-800"
        case "processing":
            return "bg-blue-100 text-blue-800"
        case "shipped":
            return "bg-purple-100 text-purple-800"
        case "delivered":
            return "bg-green-100 text-green-800"
        case "cancelled":
            return "bg-red-100 text-red-800"
        case "paid":
            return "bg-green-100 text-green-800"
        case "failed":
            return "bg-red-100 text-red-800"
        case "refunded":
            return "bg-gray-100 text-gray-800"
        default:
            return "bg-gray-100 text-gray-800"
    }
}

export default function OrdersPage() {
    const dispatch = useAppDispatch()
    const { status, allOrders } = useAppSelector((state) => state.orders)
    const [searchTerm, setSearchTerm] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [ordersPerPage] = useState(7)
    const [editingStatus, setEditingStatus] = useState<{
        [key: string]: { order?: string; payment?: string }
    }>({});


    useEffect(() => {
        if (!allOrders) {
            dispatch(fetchAllOrders())
        }
    }, [dispatch, allOrders])

    const handleStatusChange = (orderId: string, type: "order" | "payment", newStatus: string) => {
        setEditingStatus((prev) => ({
            ...prev,
            [orderId]: { ...prev[orderId], [type]: newStatus },
        }))
    }

    const handleStatusUpdate = async (orderId: string) => {
        const newOrderStatus = editingStatus[orderId]?.order ?? "Pending";
        const newPaymentStatus = editingStatus[orderId]?.payment ?? "Pending";

        await dispatch(
            updateOrderStatus({
                orderId,
                orderData: {
                    status: newOrderStatus,
                    paymentStatus: newPaymentStatus,
                },
            })
        );

        await dispatch(fetchAllOrders());
        setEditingStatus((prev) => ({ ...prev, [orderId]: {} }));
    };

    const filteredOrders = allOrders
        ? allOrders.filter(
            (order) =>
                order._id?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
                order.orderStatus?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
                order.paymentStatus?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
                order.items?.some((item) => item?.product?.title?.en?.toLowerCase().includes(searchTerm.toLowerCase())) ||
                order.userId?.name?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
                order.userId?.email?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
                (order?.userId?.phone?.includes(searchTerm)),
        )
        : []

    // Pagination logic
    const indexOfLastOrder = currentPage * ordersPerPage
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage
    const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder)
    const totalPages = Math.ceil(filteredOrders.length / ordersPerPage)

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

    if (status === "loading") return <AdminLoader />

    return (
        <div className="p-6 space-y-6 max-w-[1400px] mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <h1 className="text-3xl font-bold tracking-tight">Orders Management</h1>
                <div className="w-full md:w-[320px]">
                    <Input
                        type="text"
                        placeholder="Search by order ID, status, customer..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full"
                    />
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-gray-50 hover:bg-gray-50/90">
                            <TableHead className="font-semibold">User Name</TableHead>
                            <TableHead className="font-semibold">Phone No.</TableHead>
                            <TableHead className="font-semibold">Products</TableHead>
                            <TableHead className="font-semibold">Total Price</TableHead>
                            <TableHead className="font-semibold">Order Status</TableHead>
                            <TableHead className="font-semibold">Payment Status</TableHead>
                            <TableHead className="font-semibold">Created At</TableHead>
                            <TableHead className="font-semibold">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {currentOrders?.length > 0 ? (
                            currentOrders
                                ?.toSorted((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                                ?.map((order) => (
                                    <TableRow key={order._id} className="hover:bg-gray-50/50">
                                        <TableCell className="font-medium">{order.userId?.name}</TableCell>
                                        <TableCell>{order.userId?.phone ?? "Not found"}</TableCell>
                                        <TableCell>
                                            <div className="space-y-1">
                                                {order.items.map((item) => (
                                                    <div key={item.product._id} className="text-sm">
                                                        {item.product.title.en}{" "}
                                                        <span className="text-gray-500">
                                                            (x{item.quantity})
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </TableCell>
                                        <TableCell className="font-medium">₹{order.totalPrice.toFixed(2)}</TableCell>
                                        <TableCell>
                                            <Select
                                                value={editingStatus[order._id]?.order ?? order.orderStatus}
                                                onValueChange={(value) => handleStatusChange(order._id, "order", value)}
                                            >
                                                <SelectTrigger
                                                    className={cn(
                                                        "w-[8rem] font-medium",
                                                        getStatusColor(editingStatus[order._id]?.order ?? order.orderStatus)
                                                    )}
                                                >
                                                    <SelectValue placeholder="Select status" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {orderStatuses.map((status) => (
                                                        <SelectItem key={status} value={status}>
                                                            {status}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </TableCell>
                                        <TableCell>
                                            <Select
                                                value={editingStatus[order._id]?.payment ?? order.paymentStatus}
                                                onValueChange={(value) => handleStatusChange(order._id, "payment", value)}
                                            >
                                                <SelectTrigger
                                                    className={cn(
                                                        "w-[8rem] font-medium",
                                                        getStatusColor(editingStatus[order._id]?.payment ?? order.paymentStatus)
                                                    )}
                                                >
                                                    <SelectValue placeholder="Select payment status" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {paymentStatuses.map((status) => (
                                                        <SelectItem key={status} value={status}>
                                                            {status}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </TableCell>
                                        <TableCell className="text-gray-600">
                                            {formatDate(new Date(order.createdAt.toString()))}
                                        </TableCell>
                                        <TableCell>
                                            {(editingStatus[order._id]?.order !== undefined &&
                                                editingStatus[order._id]?.order !== order.orderStatus) ||
                                                (editingStatus[order._id]?.payment !== undefined &&
                                                    editingStatus[order._id]?.payment !== order.paymentStatus) ? (
                                                <Button
                                                    onClick={() => handleStatusUpdate(order._id)}
                                                    size="sm"
                                                    className="bg-green-600 hover:bg-green-700"
                                                >
                                                    <Check className="h-4 w-4" />
                                                </Button>
                                            ) : null}
                                        </TableCell>
                                    </TableRow>
                                ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={8}>
                                    <div className="text-center py-10">
                                        <p className="text-gray-500 text-lg">No orders found</p>
                                        <p className="text-gray-400 text-sm mt-1">Try adjusting your search criteria</p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            {currentOrders?.length > 0 && (
                <div className="mt-6 flex justify-center">
                    <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
                </div>
            )}
        </div>
    )
}