import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getCart, addItemToCart, updateItemQuantity, removeItemFromCart, clearCart } from "../apis/cartAPI";
import { RootState } from "../store";
import { Cart, CartItem } from "@/types";

interface CartState {
  cart: Cart | null; // Cart is a single object, not an array
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: CartState = {
  cart: null,
  status: "idle",
  error: null,
};

export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  const response = await getCart();
  return response.cart; // response.cart should now be an object with items and other properties
});

export const addToCart = createAsyncThunk("cart/addToCart", async (itemData: { productId: string, quantity: number }) => {
  const response = await addItemToCart(itemData);
  return response.cartItem;
});

export const updateCartItem = createAsyncThunk("cart/updateCartItem", async (itemData: { productId: string; quantity: number }) => {
  const response = await updateItemQuantity(itemData);
  return response.cartItem;
});

export const removeFromCart = createAsyncThunk("cart/removeFromCart", async (productId: string) => {
  await removeItemFromCart(productId);
  return productId;
});

export const clearShoppingCart = createAsyncThunk("cart/clearShoppingCart", async () => {
  const response = await clearCart();
  return response.message;
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCart.fulfilled, (state, action: PayloadAction<Cart>) => {
        state.status = "succeeded";
        state.cart = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to fetch cart items";
      })
      .addCase(addToCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCart.fulfilled, (state, action: PayloadAction<{ productId: string, quantity: number }>) => {
        state.status = "succeeded";
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to add item to cart";
      })
      .addCase(updateCartItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCartItem.fulfilled, (state, action: PayloadAction<CartItem>) => {
        state.status = "succeeded";
        const index = state.cart?.items.findIndex((item: CartItem) => item.product._id === action.payload.product._id);
        if (index !== undefined && index >= 0 && state.cart) {
          state.cart.items[index] = action.payload;
        }
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to update item quantity";
      })
      .addCase(removeFromCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeFromCart.fulfilled, (state, action: PayloadAction<string>) => {
        state.status = "succeeded";
        if (state.cart) {
          state.cart.items = state.cart.items.filter((item: CartItem) => item.product._id !== action.payload); // Remove the item from the cart
        }
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to remove item from cart";
      })
      .addCase(clearShoppingCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(clearShoppingCart.fulfilled, (state) => {
        state.status = "succeeded";
        state.cart = {
          ...state.cart,
          items: [],
          _id: state.cart?._id ?? "",
          userId: state.cart?.userId ?? "",
          totalPrice: 0,
          createdAt: state.cart?.createdAt ?? "",
          updatedAt: state.cart?.updatedAt ?? "",
          __v: state.cart?.__v ?? 0
        };
      })
      .addCase(clearShoppingCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to clear cart";
      });
  },
});

export const selectCart = (state: RootState) => state.cart.cart;

export default cartSlice.reducer;