import API from "@/utils/config";
import { toast } from "sonner";

// Create a review
export const createReview = async (reviewData: { productId: string; rating: number; review: string }): Promise<{ review: any }> => {
    try {
        const response = await API.post("/api/review", reviewData);
        return { review: response.data };
    } catch (error: any) {
        console.error("Error creating review:", error);
        toast.error(error.response.data.message ?? "Failed to submit review.");
        throw error;
    }
};

// Get reviews by product ID
export const getReviewsByProductId = async (productId: string): Promise<{ reviews: any[] }> => {
    try {
        const response = await API.get(`/api/review/${productId}`);
        return { reviews: response.data };
    } catch (error: any) {
        console.error("Error fetching reviews:", error);
        toast.error(error.response.data.message ?? "Failed to fetch reviews.");
        throw error;
    }
};

// Update a review
export const updateReview = async (
    reviewId: string,
    reviewData: { rating: number; review: string }
): Promise<{ review: any }> => {
    try {
        const response = await API.put(`/api/review/${reviewId}`, reviewData);
        toast.success("Review updated successfully.");
        return { review: response.data };
    } catch (error: any) {
        console.error("Error updating review:", error);
        toast.error(error.response.data.message ?? "Failed to update review.");
        throw error;
    }
};

// Delete a review
export const deleteReview = async (reviewId: string): Promise<{ message: string }> => {
    try {
        const response = await API.delete(`/api/review/${reviewId}`);
        toast.success("Review deleted successfully.");
        return { message: response.data.message };
    } catch (error: any) {
        console.error("Error deleting review:", error);
        toast.error(error.response.data.message ?? "Failed to delete review.");
        throw error;
    }
};
