import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
    createOrder as apiCreateOrder,
    updateOrder as apiUpdateOrder,
    getOrderById as apiGetOrderById,
    getUserOrders as apiGetUserOrders,
    cancelOrder as apiCancelOrder,
    getAllOrders as apiGetAllOrders,
} from "../apis/orderAPI"; // Assuming these API functions are exported from a file named orderAPI.ts
import { RootState } from "../store";
import { Order, OrderData } from "@/types/order";

interface OrderState {
    orders: Order[] | null;
    selectedOrder: Order | null;
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

const initialState: OrderState = {
    orders: null,
    selectedOrder: null,
    status: "idle",
    error: null,
};

// Fetch all orders (admin)
export const fetchAllOrders = createAsyncThunk("orders/fetchAllOrders", async () => {
    const response = await apiGetAllOrders();
    return response.orders;
});

// Create a new order
export const createNewOrder = createAsyncThunk(
    "orders/createNewOrder",
    async (orderData: OrderData) => {
        const response = await apiCreateOrder(orderData);
        return response.order;
    });

// Update an order by ID
export const updateOrderStatus = createAsyncThunk("orders/updateOrderStatus", async ({ orderId, orderData }: { orderId: string; orderData: { status: string } }) => {
    const response = await apiUpdateOrder(orderId, orderData);
    return response.order;
});

// Get a specific order by ID
export const fetchOrderById = createAsyncThunk("orders/fetchOrderById", async (orderId: string) => {
    const response = await apiGetOrderById(orderId);
    return response.order;
});

// Get all orders for the authenticated user
export const fetchUserOrders = createAsyncThunk("orders/fetchUserOrders", async () => {
    const response = await apiGetUserOrders();
    return response.orders;
});

// Cancel an order by ID
export const cancelOrderById = createAsyncThunk("orders/cancelOrderById", async (orderId: string) => {
    const response = await apiCancelOrder(orderId);
    return response.message;
});

const orderSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Handling the fetch all orders action (admin)
        builder.addCase(fetchAllOrders.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(fetchAllOrders.fulfilled, (state, action: PayloadAction<Order[]>) => {
            state.status = "succeeded";
            state.orders = action.payload;
        });
        builder.addCase(fetchAllOrders.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message ?? "Failed to fetch orders";
        });

        // Handling the create new order action
        builder.addCase(createNewOrder.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(createNewOrder.fulfilled, (state, action: PayloadAction<Order>) => {
            state.status = "succeeded";
            state.orders?.push(action.payload);
        });
        builder.addCase(createNewOrder.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message ?? "Failed to create order";
        });

        // Handling the update order status action
        builder.addCase(updateOrderStatus.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(updateOrderStatus.fulfilled, (state, action: PayloadAction<Order>) => {
            state.status = "succeeded";
            const index = state.orders?.findIndex((order) => order._id === action.payload._id);
            if (index !== undefined && index >= 0 && state.orders) {
                state.orders[index] = action.payload;
            }
        });
        builder.addCase(updateOrderStatus.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message ?? "Failed to update order status";
        });

        // Handling the fetch order by ID action
        builder.addCase(fetchOrderById.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(fetchOrderById.fulfilled, (state, action: PayloadAction<Order>) => {
            state.status = "succeeded";
            state.selectedOrder = action.payload;
        });
        builder.addCase(fetchOrderById.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message ?? "Failed to fetch order by ID";
        });

        // Handling the fetch user orders action
        builder.addCase(fetchUserOrders.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(fetchUserOrders.fulfilled, (state, action: PayloadAction<Order[]>) => {
            state.status = "succeeded";
            state.orders = action.payload;
        });
        builder.addCase(fetchUserOrders.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message ?? "Failed to fetch user orders";
        });

        // Handling the cancel order action
        builder.addCase(cancelOrderById.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(cancelOrderById.fulfilled, (state, action: PayloadAction<string>) => {
            state.status = "succeeded";
            if (state.orders) {
                state.orders = state.orders.filter((order) => order._id !== action.payload);
            }
        });
        builder.addCase(cancelOrderById.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message ?? "Failed to cancel order";
        });
    },
});

export const selectOrders = (state: RootState) => state.orders.orders;
export const selectSelectedOrder = (state: RootState) => state.orders.selectedOrder;

export default orderSlice.reducer;
