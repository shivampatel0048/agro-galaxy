import { AllOrders, Order, OrderData } from "@/types/order";
import API from "@/utils/config";
import { toast } from "sonner";

// Create a new order
export const createOrder = async (orderData: OrderData): Promise<{ order: Order }> => {
    try {
        const response = await API.post("/api/order", orderData);
        toast.success("Order created successfully.");
        return { order: response.data };
    } catch (error) {
        console.error("Error creating order:", error);
        throw error;
    }
};

// Update an order by its ID
export const updateOrder = async (orderId: string, orderData: { status: string, paymentStatus: string }): Promise<{ order: Order }> => {
    try {
        const response = await API.put(`/api/order/${orderId}`, orderData);
        toast.success("Order updated successfully.");
        return { order: response.data };
    } catch (error) {
        console.error("Error updating order:", error);
        throw error;
    }
};

// Get a specific order by ID
export const getOrderById = async (orderId: string): Promise<{ order: Order }> => {
    try {
        const response = await API.get(`/api/order/${orderId}`);
        return { order: response.data };
    } catch (error) {
        console.error("Error fetching order:", error);
        throw error;
    }
};

// Get all orders for the authenticated user
export const getUserOrders = async (): Promise<{ orders: Order[] }> => {
    try {
        const response = await API.get("/api/order/my-orders");
        return { orders: response.data };
    } catch (error) {
        console.error("Error fetching user orders:", error);
        throw error;
    }
};

// Cancel an order by its ID
export const cancelOrder = async (orderId: string): Promise<{ message: string }> => {
    try {
        const response = await API.put(`/api/order/cancel/${orderId}`);
        toast.success("Order canceled successfully.");
        return { message: response.data.message };
    } catch (error) {
        console.error("Error canceling order:", error);
        throw error;
    }
};

// Get all orders (admin)
export const getAllOrders = async (): Promise<{ orders: AllOrders[] }> => {
    try {
        const response = await API.get("/api/order");
        return { orders: response.data };
    } catch (error) {
        console.error("Error fetching all orders:", error);
        throw error;
    }
};