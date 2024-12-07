import { Product } from "@/types";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getProducts, getProductById, addProduct, updateProduct, deleteProduct } from "../apis/productAPI";
import { RootState } from "../store";

interface ProductState {
    products: Product[] | null;
    currentProduct: Product | null;
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

const initialState: ProductState = {
    products: null,
    currentProduct: null,
    status: "idle",
    error: null,
};

// Fix here: the payload of fetchProducts must be typed as Product[]
export const fetchProducts = createAsyncThunk<Product[]>("products/fetchProducts", async () => {
    const response = await getProducts(); 
    console.log({response})
    return response.products; 
});

export const fetchProductById = createAsyncThunk("products/fetchProductById", async (id: string) => {
    const response = await getProductById(id);
    return response.product;
});

export const addNewProduct = createAsyncThunk("products/addNewProduct", async (productData: Omit<Product, "id">) => {
    const response = await addProduct(productData);
    return response.product;
});

export const updateExistingProduct = createAsyncThunk("products/updateExistingProduct", async ({ id, productData }: { id: string, productData: Omit<Product, "id"> }) => {
    const response = await updateProduct(id, productData);
    return response.product;
});

export const deleteExistingProduct = createAsyncThunk("products/deleteExistingProduct", async (id: string) => {
    const response = await deleteProduct(id);
    return response.message;
});

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
                state.status = "succeeded";
                state.products = action.payload; // Now this works because payload is Product[]
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message ?? "Failed to fetch products";
            })
            .addCase(fetchProductById.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchProductById.fulfilled, (state, action: PayloadAction<Product>) => {
                state.status = "succeeded";
                state.currentProduct = action.payload;
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message ?? "Failed to fetch product by ID";
            })
            .addCase(addNewProduct.pending, (state) => {
                state.status = "loading";
            })
            .addCase(addNewProduct.fulfilled, (state, action: PayloadAction<Product>) => {
                state.status = "succeeded";
                if (state.products) {
                    state.products.push(action.payload);
                }
            })
            .addCase(addNewProduct.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message ?? "Failed to add product";
            })
            .addCase(updateExistingProduct.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updateExistingProduct.fulfilled, (state, action: PayloadAction<Product>) => {
                state.status = "succeeded";
                const index = state.products?.findIndex((product) => product._id === action.payload._id);
                if (index !== undefined && index >= 0 && state.products) {
                    state.products[index] = action.payload;
                }
            })
            .addCase(updateExistingProduct.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message ?? "Failed to update product";
            })
            .addCase(deleteExistingProduct.pending, (state) => {
                state.status = "loading";
            })
            .addCase(deleteExistingProduct.fulfilled, (state, action) => {
                state.status = "succeeded";
                if (state.products) {
                    state.products = state.products.filter((product) => product._id !== action.payload);
                }
            })
            .addCase(deleteExistingProduct.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message ?? "Failed to delete product";
            });
    },
});

export const selectProducts = (state: RootState) => state.products.products;
export const selectCurrentProduct = (state: RootState) => state.products.currentProduct;

export default productSlice.reducer;
