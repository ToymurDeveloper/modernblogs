//app/category/[slug]/CategoryPageClient.js
"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import BlogCard from "@/app/(public)/components/BlogCard";
import Pagination from "@/app/(public)/components/Pagination";
import TrendingBlogs from "@/app/(public)/components/TrendingBlogs";
import PopularBlogs from "@/app/(public)/components/PopularBlogs";

export default function CategoryPageClient({ params }) {
  const [blogs, setBlogs] = useState([]);
  const [trendingBlogs, setTrendingBlogs] = useState([]);
  const [popularBlogs, setPopularBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const categorySlug = params.slug;

  // Convert slug back to category name for display
  const categoryName = categorySlug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  useEffect(() => {
    fetchTrendingBlogs();
    fetchPopularBlogs();
  }, []);

  useEffect(() => {
    if (categorySlug) {
      fetchBlogsByCategory();
    }
  }, [categorySlug, currentPage]);

  const fetchBlogsByCategory = async () => {
    setLoading(true);
    try {
      // You'll need to get the category ID first
      const categoriesResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/categories`,
      );
      const category = categoriesResponse.data.categories.find(
        (cat) => cat.name.toLowerCase().replace(/\s+/g, "-") === categorySlug,
      );

      if (category) {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/blogs/public`,
          {
            params: {
              category: category._id,
              page: currentPage,
              limit: 9,
            },
          },
        );
        setBlogs(response.data.blogs);
        setTotalPages(response.data.totalPages);
      }
    } catch (error) {
      console.error("Failed to fetch blogs by category:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTrendingBlogs = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/blogs/trending?limit=5&status=published`,
      );
      setTrendingBlogs(response.data.blogs);
    } catch (error) {
      console.error("Failed to fetch trending blogs:", error);
    }
  };

  const fetchPopularBlogs = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/blogs/popular?limit=5&status=published`,
      );
      setPopularBlogs(response.data.blogs);
    } catch (error) {
      console.error("Failed to fetch popular blogs:", error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading && currentPage === 1) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to all blogs
          </Link>

          <div className="flex items-center gap-3">
            <svg
              className="w-8 h-8 text-orange-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
              />
            </svg>
            <h1 className="text-3xl font-bold text-gray-900">{categoryName}</h1>
          </div>
          <p className="text-gray-600 mt-2">
            {blogs.length > 0
              ? `Found ${blogs.length} blog${blogs.length !== 1 ? "s" : ""} in this category`
              : "No blogs found in this category"}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Blog Cards */}
          <div className="lg:col-span-2">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
              </div>
            ) : blogs.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                <svg
                  className="w-16 h-16 text-gray-300 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <p className="text-gray-500 text-lg">
                  No blogs found in `{categoryName}` category
                </p>
                <Link
                  href="/"
                  className="inline-block mt-4 text-orange-600 hover:text-orange-700 font-medium"
                >
                  Browse all blogs
                </Link>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {blogs.map((blog) => (
                    <BlogCard key={blog._id} blog={blog} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                )}
              </>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="top-8">
              <TrendingBlogs blogs={trendingBlogs} />
            </div>

            <div className="mt-8 top-8">
              <PopularBlogs blogs={popularBlogs} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
