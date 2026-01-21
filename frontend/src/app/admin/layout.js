"use client";
import { useAuth } from "@/contexts/AuthContext";
import AdminLayout from "./adminComponents/AdminLayout";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function Layout({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.push("/login");
      return;
    }

    if (user.role !== "admin" && user.role !== "subadmin") {
      toast.error("Access denied. Admin privileges required.");
      router.push("/");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!user || (user.role !== "admin" && user.role !== "subadmin")) {
    return null;
  }

  return <AdminLayout>{children}</AdminLayout>;
}
