//app/blogs/page.js
"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import Pagination from "../components/Pagination";
import TrendingBlogs from "../components/TrendingBlogs";
import PopularBlogs from "../components/PopularBlogs";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [trendingBlogs, setTrendingBlogs] = useState([]);
  const [popularBlogs, setPopularBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");

  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  useEffect(() => {
    fetchCategories();
    fetchTrendingBlogs();
    fetchPopularBlogs();
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [currentPage, selectedCategory, searchQuery]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/categories`,
      );
      setCategories(response.data.categories);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
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

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const params = {
        page: currentPage,
        limit: 9,
        ...(selectedCategory && { category: selectedCategory }),
        ...(searchQuery && { search: searchQuery }),
      };

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/blogs/public`,
        { params },
      );
      setBlogs(response.data.blogs);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Results Header */}
        {searchQuery && (
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Search results for `{searchQuery}`
            </h2>
            <p className="text-gray-600 mt-1">
              Found{" "}
              {blogs.length > 0 ? `${blogs.length} results` : "no results"}
            </p>
          </div>
        )}

        {/* Category Tabs */}
        <div className="mb-8">
          {loading ? (
            <div className="grid gap-6">
              {[1].map((item) => (
                <div
                  key={item}
                  className="bg-white rounded-lg overflow-hidden shadow-sm h-full flex flex-col animate-pulse"
                >
                  <div className="w-full bg-gray-200"></div>
                  <div className="p-4 flex flex-col grow">
                    <div className="h-3 bg-gray-200 rounded mb-2 w-full"></div>
                    <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center space-x-8 border-b border-gray-200 overflow-x-auto">
              <button
                onClick={() => handleCategoryChange("")}
                className={`pb-4 px-1 text-base font-medium whitespace-nowrap border-b-2 transition-colors ${
                  selectedCategory === ""
                    ? "border-orange-500 text-orange-500"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category._id}
                  onClick={() => handleCategoryChange(category._id)}
                  className={`pb-4 px-1 text-base font-medium whitespace-nowrap border-b-2 transition-colors ${
                    selectedCategory === category._id
                      ? "border-orange-500 text-orange-500"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Blog Cards */}
          <div className="lg:col-span-2">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {/* Show skeleton loading cards */}
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div
                    key={item}
                    className="bg-white rounded-lg overflow-hidden shadow-sm h-full flex flex-col animate-pulse"
                  >
                    <div className="w-full h-48 bg-gray-200"></div>
                    <div className="p-4 flex flex-col grow">
                      <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded mb-2 w-1/2"></div>
                      <div className="mt-auto space-y-2">
                        <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : blogs.length === 0 ? (
              <div className="text-center py-12">
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
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-gray-500 text-lg">No blogs found</p>
                {searchQuery && (
                  <p className="text-gray-400 text-sm mt-2">
                    Try searching with different keywords
                  </p>
                )}
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

          {/* Sidebar - Latest and Popular Blogs */}
          <div className="lg:col-span-1">
            <div>
              <TrendingBlogs blogs={trendingBlogs} />
            </div>

            <div className="mt-8">
              <PopularBlogs blogs={popularBlogs} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
