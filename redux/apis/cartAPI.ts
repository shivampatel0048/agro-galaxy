import { Cart, CartItem } from "@/types";
import API from "@/utils/config";

// Fetch all items in the cart
export const getCart = async (): Promise<{ cart: Cart }> => {
  try {
    const response = await API.get("/api/cart");
    return { cart: response.data };
  } catch (error) {
    console.error("Error fetching cart:", error);
    throw error;
  }
};

// Add an item to the cart
export const addItemToCart = async (itemData: {productId:string, quantity:number}): Promise<{ cartItem: {productId:string, quantity:number} }> => {
  try {
    const response = await API.post("/api/cart", itemData);
    return { cartItem: response.data }; // Ensure the response contains the cartItem
  } catch (error) {
    console.error("Error adding item to cart:", error);
    throw error;
  }
};

// Update the quantity of an item in the cart
export const updateItemQuantity = async (itemData: { productId: string; quantity: number }): Promise<{ cartItem: CartItem }> => {
  try {
    const response = await API.put("/api/cart", itemData);
    return { cartItem: response.data };
  } catch (error) {
    console.error("Error updating item quantity:", error);
    throw error;
  }
};

// Remove an item from the cart
export const removeItemFromCart = async (productId: string): Promise<{ message: string }> => {
  try {
    const response = await API.delete(`/api/cart/${productId}`);
    return { message: response.data.message };
  } catch (error) {
    console.error("Error removing item from cart:", error);
    throw error;
  }
};

// Clear the entire cart
export const clearCart = async (): Promise<{ message: string }> => {
  try {
    const response = await API.delete("/api/cart");
    return { message: response.data.message };
  } catch (error) {
    console.error("Error clearing cart:", error);
    throw error;
  }
};
