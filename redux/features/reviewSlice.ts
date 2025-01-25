import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
    createReview,
    getReviewsByProductId,
    updateReview,
    deleteReview,
} from "../apis/reviewAPI";
import { RootState } from "../store";
import { Review } from "@/types";

interface ReviewsState {
    reviews: Review[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

const initialState: ReviewsState = {
    reviews: [],
    status: "idle",
    error: null,
};

export const fetchReviews = createAsyncThunk(
    "reviews/fetchReviews",
    async (productId: string) => {
        const response = await getReviewsByProductId(productId);
        return response.reviews;
    }
);

export const addReview = createAsyncThunk(
    "reviews/addReview",
    async (reviewData: { productId: string; rating: number; review: string }) => {
        const response = await createReview(reviewData);
        return response.review;
    }
);

export const editReview = createAsyncThunk(
    "reviews/editReview",
    async (params: { reviewId: string; reviewData: { rating: number; review: string } }) => {
        const response = await updateReview(params.reviewId, params.reviewData);
        return response.review;
    }
);

export const removeReview = createAsyncThunk(
    "reviews/removeReview",
    async (reviewId: string) => {
        await deleteReview(reviewId);
        return reviewId;
    }
);

const reviewsSlice = createSlice({
    name: "reviews",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchReviews.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchReviews.fulfilled, (state, action: PayloadAction<Review[]>) => {
                state.status = "succeeded";
                state.reviews = action.payload;
            })
            .addCase(fetchReviews.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message ?? "Failed to fetch reviews.";
            })
            .addCase(addReview.pending, (state) => {
                state.status = "loading";
            })
            .addCase(addReview.fulfilled, (state, action: PayloadAction<Review>) => {
                state.status = "succeeded";
                state.reviews.push(action.payload);
            })
            .addCase(addReview.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message ?? "Failed to add review.";
            })
            .addCase(editReview.pending, (state) => {
                state.status = "loading";
            })
            .addCase(editReview.fulfilled, (state, action: PayloadAction<Review>) => {
                state.status = "succeeded";
                const index = state.reviews.findIndex((review) => review._id === action.payload._id);
                if (index !== -1) {
                    state.reviews[index] = action.payload;
                }
            })
            .addCase(editReview.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message ?? "Failed to update review.";
            })
            .addCase(removeReview.pending, (state) => {
                state.status = "loading";
            })
            .addCase(removeReview.fulfilled, (state, action: PayloadAction<string>) => {
                state.status = "succeeded";
                state.reviews = state.reviews.filter((review) => review._id !== action.payload);
            })
            .addCase(removeReview.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message ?? "Failed to delete review.";
            });
    },
});

export const selectReviews = (state: RootState) => state.reviews.reviews;
export const selectReviewStatus = (state: RootState) => state.reviews.status;
export const selectReviewError = (state: RootState) => state.reviews.error;

export default reviewsSlice.reducer;