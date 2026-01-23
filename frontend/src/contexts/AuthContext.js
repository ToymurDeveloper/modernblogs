"use client";

import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // Axios instance with interceptors
  const axiosInstance = axios.create({
    baseURL: API_URL,
  });

  // Request interceptor
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = Cookies.get("accessToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error),
  );

  // Response interceptor
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const refreshToken = Cookies.get("refreshToken");
          if (!refreshToken) {
            throw new Error("No refresh token");
          }

          const response = await axios.post(`${API_URL}/auth/refresh-token`, {
            refreshToken,
          });

          const { accessToken, refreshToken: newRefreshToken } = response.data;

          Cookies.set("accessToken", accessToken, { expires: 7 });
          Cookies.set("refreshToken", newRefreshToken, { expires: 7 });

          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          logout();
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    },
  );

  // Load user from token
  useEffect(() => {
    const loadUser = async () => {
      const token = Cookies.get("accessToken");

      if (token) {
        try {
          const response = await axiosInstance.get("/auth/me");
          setUser(response.data.user);
        } catch (error) {
          console.error("Failed to load user:", error);
          Cookies.remove("accessToken");
          Cookies.remove("refreshToken");
        }
      }

      setLoading(false);
    };

    loadUser();
  }, []);

  // Register
  const register = async (name, email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, {
        name,
        email,
        password,
      });

      const { accessToken, refreshToken, user } = response.data;

      // Cookies.set("accessToken", accessToken, { expires: 7 });
      // Cookies.set("refreshToken", refreshToken, { expires: 7 });

      // setUser(user);

      // Redirect based on role
      // if (user.role === "admin" || user.role === "subadmin") {
      //   router.push("/admin/dashboard");
      // } else {
      toast.success(response.data.message);
      router.push("/login");

      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  };

  // Login
  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });

      const { accessToken, refreshToken, user } = response.data;

      Cookies.set("accessToken", accessToken, { expires: 7 });
      Cookies.set("refreshToken", refreshToken, { expires: 7 });

      setUser(user);

      toast.success(response.data.message);

      // Redirect based on role
      if (user.role === "admin" || user.role === "subadmin") {
        router.push("/admin/dashboard");
      } else {
        router.push("/");
      }

      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  };

  // Google login
  const loginWithGoogle = () => {
    window.location.href = `${API_URL}/auth/google`;
  };

  // Logout
  const logout = async () => {
    try {
      const response = await axiosInstance.post("/auth/logout");
      if (response.data.alreadyLoggedOut) {
        toast.success(response.data.message);
      } else {
        toast.success(response.data.message);
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error(error.response?.data?.message);
    } finally {
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      setUser(null);
      router.push("/login");
    }
  };

  // Forgot password
  const forgotPassword = async (email) => {
    try {
      const response = await axios.post(`${API_URL}/auth/forgot-password`, {
        email,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  };

  // Reset password
  const resetPassword = async (token, password) => {
    try {
      const response = await axios.put(
        `${API_URL}/auth/reset-password/${token}`,
        { password },
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  };

  const value = {
    user,
    loading,
    register,
    login,
    loginWithGoogle,
    logout,
    forgotPassword,
    resetPassword,
    axiosInstance,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
