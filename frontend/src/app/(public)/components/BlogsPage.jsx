"use client";

import { useState, useEffect } from "react";
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

  // useEffect(() => {
  //   fetchCategories();
  //   fetchTrendingBlogs();
  //   fetchPopularBlogs();
  // }, []);

  // useEffect(() => {
  //   fetchBlogs();
  // }, [currentPage, selectedCategory]);

  // const fetchCategories = async () => {
  //   try {
  //     const response = await axios.get(
  //       `${process.env.NEXT_PUBLIC_API_URL}/categories`,
  //     );
  //     setCategories(response.data.categories);
  //   } catch (error) {
  //     console.error("Failed to fetch categories:", error);
  //   }
  // };

  // const fetchTrendingBlogs = async () => {
  //   try {
  //     const response = await axios.get(
  //       `${process.env.NEXT_PUBLIC_API_URL}/blogs/trending?limit=5&status=published`,
  //     );
  //     setTrendingBlogs(response.data.blogs);
  //   } catch (error) {
  //     console.error("Failed to fetch latest blogs:", error);
  //   }
  // };
  // const fetchPopularBlogs = async () => {
  //   try {
  //     const response = await axios.get(
  //       `${process.env.NEXT_PUBLIC_API_URL}/blogs/popular?limit=5&status=published`,
  //     );
  //     setPopularBlogs(response.data.blogs);
  //   } catch (error) {
  //     console.error("Failed to fetch latest blogs:", error);
  //   }
  // };

  // const fetchBlogs = async () => {
  //   setLoading(true);
  //   try {
  //     const params = {
  //       page: currentPage,
  //       limit: 9,
  //       status: "published",
  //       ...(selectedCategory && { category: selectedCategory }),
  //     };

  //     const response = await axios.get(
  //       `${process.env.NEXT_PUBLIC_API_URL}/blogs/public`,
  //       { params },
  //     );
  //     setBlogs(response.data.blogs);
  //     setTotalPages(response.data.totalPages);
  //   } catch (error) {
  //     console.error("Failed to fetch blogs:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
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

    fetchCategories();
    fetchTrendingBlogs();
    fetchPopularBlogs();
  }, []);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const params = {
          page: currentPage,
          limit: 9,
          status: "published",
          ...(selectedCategory && { category: selectedCategory }),
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

    fetchBlogs();
  }, [currentPage, selectedCategory]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
  };

  // if (loading && currentPage === 1) {
  //   return (
  //     <div className="h-100 flex items-center justify-center">
  //       <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Tabs */}
        <div className="mb-8">
          <div className="flex items-center space-x-8 border-b-2 pb-4 border-gray-300 overflow-x-auto">
            <button
              onClick={() => handleCategoryChange("")}
              className={`cursor-pointer text-base font-medium whitespace-nowrap border-b-2 transition-colors ${
                selectedCategory === ""
                  ? "border-orange-500 text-orange-500"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-blue-400"
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category._id}
                onClick={() => handleCategoryChange(category._id)}
                className={`cursor-pointer text-base font-medium whitespace-nowrap border-b-2 transition-colors ${
                  selectedCategory === category._id
                    ? "border-orange-500 text-orange-500"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-blue-400"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
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
                        <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : blogs.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No blogs found</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
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
