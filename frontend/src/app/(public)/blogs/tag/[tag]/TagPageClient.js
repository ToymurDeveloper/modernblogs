//app/blogs/tag/[tag]/TagPageClient.js
"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import BlogCard from "@/app/(public)/components/BlogCard";
import Pagination from "@/app/(public)/components/Pagination";
import TrendingBlogs from "@/app/(public)/components/TrendingBlogs";
import PopularBlogs from "@/app/(public)/components/PopularBlogs";

export default function TagPageClient({ params }) {
  const [blogs, setBlogs] = useState([]);
  const [trendingBlogs, setTrendingBlogs] = useState([]);
  const [popularBlogs, setPopularBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const tag = params.tag;

  useEffect(() => {
    fetchTrendingBlogs();
    fetchPopularBlogs();
  }, []);

  useEffect(() => {
    if (tag) {
      fetchBlogsByTag();
    }
  }, [tag, currentPage]);

  const fetchBlogsByTag = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/blogs/tag/${tag}`,
        {
          params: {
            page: currentPage,
            limit: 9,
          },
        },
      );
      setBlogs(response.data.blogs);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Failed to fetch blogs by tag:", error);
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
      console.error("Failed to fetch latest blogs:", error);
    }
  };

  const fetchPopularBlogs = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/blogs/popular?limit=5&status=published`,
      );
      setPopularBlogs(response.data.blogs);
    } catch (error) {
      console.error("Failed to fetch latest blogs:", error);
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
        {/* Tag Header */}
        <div className="mb-8">
          <Link
            href="/blogs"
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
              className="w-6 h-6 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z"
                clipRule="evenodd"
              />
            </svg>
            <h1 className="text-3xl font-bold text-gray-900 capitalize">
              {decodeURIComponent(tag)}
            </h1>
          </div>
          <p className="text-gray-600 mt-2">
            {blogs.length > 0
              ? `Found ${blogs.length} blog${blogs.length !== 1 ? "s" : ""}`
              : "No blogs found"}
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
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                  />
                </svg>
                <p className="text-gray-500 text-lg">
                  No blogs found with tag `{decodeURIComponent(tag)}`
                </p>
                <Link
                  href="/blogs"
                  className="inline-block mt-4 text-blue-600 hover:text-blue-700 font-medium"
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
