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
  email: string,
  otp: string,
  newPassword: string
): Promise<{ message: string }> => {
  try {
    const response = await API.post("/api/auth/reset-password", {
      email,
      otp,
      newPassword,
    });
    return { message: response.data.message };
  } catch (error) {
    console.error("Error during password reset:", error);
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

// Update Password by userId
export const updatePasswordByUserId = async (
  id: string,
  newPassword: string
): Promise<{ message: string }> => {
  try {
    const response = await API.put("/api/auth/update-password", {
      id, newPassword,
    });
    return { message: response.data.message };
  } catch (error) {
    console.error("Error updating password:", error);
    throw error;
  }
};
