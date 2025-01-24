import axios from "axios";
import { getToken } from "./tokenUtils";

const API = axios.create({
  baseURL: `http://localhost:5000`,
  // baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor
API.interceptors.request.use(
  (config) => {
    const token = getToken();

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    if (!(error instanceof Error)) {
      error = new Error(String(error));
    }
    return Promise.reject(error);
  }
);

export default API;
