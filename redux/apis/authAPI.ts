import API from "@/utils/config";
import { User } from "@/types";

export interface SignupResponse {
  token: string;
  user: {
    id: string;
    email?: string;
    phone?: string;
    name: string;
    role: string;
  };
}


export const signup = async (
  data: {
    name: string;
    email?: string;
    phone?: string;
    password: string
  }
): Promise<SignupResponse> => {
  const response = await API.post("/api/auth/signup", data);
  return response.data;
};


export const login = async (
  query: { email?: string; phone?: string },
  password: string
): Promise<{ token: string; user: User }> => {
  try {
    const response = await API.post("/api/auth/login", { ...query, password });
    return { token: response.data.token, user: response.data.user };
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

// Forgot Password
export const forgotPassword = async (email: string): Promise<{ message: string }> => {
  try {
    const response = await API.post("/api/auth/forgot-password", { email });
    return { message: response.data.message };
  } catch (error) {
    console.error("Error during forgot password:", error);
    throw error;
  }
};

// Reset Password
export const resetPassword = async (
  token: string,
  newPassword: string
): Promise<{ message: string }> => {
  try {
    const response = await API.post("/api/auth/reset-password", {
      token,
      newPassword,
    });
    return { message: response.data.message };
  } catch (error) {
    console.error("Error during reset password:", error);
    throw error;
  }
};

// Change Password
export const changePassword = async (
  oldPassword: string,
  newPassword: string
): Promise<{ message: string }> => {
  try {
    const response = await API.post("/api/auth/change-password", {
      oldPassword,
      newPassword,
    });
    return { message: response.data.message };
  } catch (error) {
    console.error("Error during change password:", error);
    throw error;
  }
};

// Get User by ID
export const getUserById = async (id: string): Promise<{ user: User }> => {
  try {
    const response = await API.get(`/api/auth/${id}`);
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
    const response = await API.patch(`/api/auth/${id}`, userData);
    return { user: response.data };
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

// Delete User
export const deleteUser = async (id: string): Promise<{ message: string }> => {
  try {
    const response = await API.delete(`/api/auth/${id}`);
    return { message: response.data.message };
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};
