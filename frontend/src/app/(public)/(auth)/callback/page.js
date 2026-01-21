"use client";

import { Suspense, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import axios from "axios";
import toast from "react-hot-toast";

function CallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;
    const handleCallback = async () => {
      const accessToken = searchParams.get("accessToken");
      const refreshToken = searchParams.get("refreshToken");
      const error = searchParams.get("error");

      if (error) {
        toast.error("Google authentication failed");
        router.push(`/login?error=${error}`);
        return;
      }

      if (!accessToken || !refreshToken) {
        toast.error("Authentication failed. Please try again.");
        router.push("/login?error=authentication_failed");
        return;
      }

      try {
        // Set cookies
        Cookies.set("accessToken", accessToken, { expires: 7 });
        Cookies.set("refreshToken", refreshToken, { expires: 7 });

        // Fetch user info
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/me`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const user = response.data.user;

        // Show success toast
        toast.success(`Welcome back, ${user.name}!`);

        // Delay to show toast, then redirect based on role
        setTimeout(() => {
          window.location.href = "/";
        }, 1500);
      } catch (err) {
        console.error("Callback error:", err);
        toast.error("Authentication failed. Please try again.");
        setError("Authentication failed. Please try again.");
        setTimeout(() => {
          router.push("/login");
        }, 1500);
      }
    };
    handleCallback();
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Completing authentication...</p>
      </div>
    </div>
  );
}

export default function GoogleCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Completing authentication...</p>
          </div>
        </div>
      }
    >
      <CallbackContent />
    </Suspense>
  );
}
