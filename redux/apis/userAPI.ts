import { User } from "@/types";
import API from "@/utils/config";

// Get User by ID
export const getUserInfo = async (): Promise<{ user: User }> => {
    try {
        const response = await API.get(`/api/user`);
        return { user: response.data };
    } catch (error) {
        console.error("Error fetching user by ID:", error);
        throw error;
    }
};

// Update User
export const updateUser = async (
    id: string,
    userData: Partial<User>
): Promise<{ user: User }> => {
    try {
        const response = await API.patch(`/api/user/${id}`, userData);
        return { user: response.data };
    } catch (error) {
        console.error("Error updating user:", error);
        throw error;
    }
};

// Delete User
export const deleteUser = async (id: string): Promise<{ message: string }> => {
    try {
        const response = await API.delete(`/api/user/${id}`);
        return { message: response.data.message };
    } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
    }
};