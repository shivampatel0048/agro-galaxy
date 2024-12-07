import { Product } from "@/types";
import API from "@/utils/config";

// Fetch all products
export const getProducts = async (): Promise<{ products: Product[] }> => {
  try {
    const response = await API.get("/api/product");
    return { products: response.data };
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// Fetch a single product by ID
export const getProductById = async (id: string): Promise<{ product: Product }> => {
  try {
    const response = await API.get(`/api/product/${id}`);
    return { product: response.data };
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    throw error;
  }
};

// Add a new product
export const addProduct = async (productData: Omit<Product, "id">): Promise<{ product: Product }> => {
  try {
    const response = await API.post("/api/product", productData);
    return { product: response.data };
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};

// Update an existing product
export const updateProduct = async (id: string, productData: Omit<Product, "id">): Promise<{ product: Product }> => {
  try {
    const response = await API.put(`/api/product/${id}`, productData);
    return { product: response.data };
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

// Delete a product
export const deleteProduct = async (id: string): Promise<{ message: string }> => {
  try {
    const response = await API.delete(`/api/product/${id}`);
    return { message: response.data.message };
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};
