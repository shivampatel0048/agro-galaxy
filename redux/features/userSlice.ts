import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/types";
import { getUserInfo, updateUser, deleteUser } from "../apis/userAPI";
import { RootState } from "../store";

interface UserState {
    user: User | null;
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

const initialState: UserState = {
    user: null,
    status: "idle",
    error: null,
};

// Thunks
export const fetchUserInfo = createAsyncThunk<User>("user/fetchUser", async () => {
    const response = await getUserInfo();
    return response.user;
});

export const updateUserById = createAsyncThunk<User, { id: string; userData: Partial<User> }>(
    "user/updateUserById",
    async ({ id, userData }) => {
        const response = await updateUser(id, userData);
        return response.user;
    }
);

export const deleteUserById = createAsyncThunk<string, string>(
    "user/deleteUserById",
    async (id) => {
        const response = await deleteUser(id);
        return response.message;
    }
);

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch user info
            .addCase(fetchUserInfo.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchUserInfo.fulfilled, (state, action: PayloadAction<User>) => {
                state.status = "succeeded";
                state.user = action.payload;
            })
            .addCase(fetchUserInfo.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message ?? "Failed to fetch user";
            })
            // Update user
            .addCase(updateUserById.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updateUserById.fulfilled, (state, action: PayloadAction<User>) => {
                state.status = "succeeded";
                state.user = action.payload;
            })
            .addCase(updateUserById.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message ?? "Failed to update user";
            })
            // Delete user
            .addCase(deleteUserById.pending, (state) => {
                state.status = "loading";
            })
            .addCase(deleteUserById.fulfilled, (state) => {
                state.status = "succeeded";
                state.user = null; // Clear the user from state on deletion
            })
            .addCase(deleteUserById.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message ?? "Failed to delete user";
            });
    },
});

// Selectors
export const selectUser = (state: RootState) => state.user.user;
export const selectUserStatus = (state: RootState) => state.user.status;
export const selectUserError = (state: RootState) => state.user.error;

export default userSlice.reducer;