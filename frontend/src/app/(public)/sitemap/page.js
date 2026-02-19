"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import {
  Home,
  BookOpen,
  FolderOpen,
  Tag,
  TrendingUp,
  Calendar,
  ChevronRight,
  Flame,
} from "lucide-react";

export default function SitemapPage() {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [blogsRes, categoriesRes] = await Promise.all([
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/blogs/public?limit=100`),
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories`),
      ]);

      setBlogs(blogsRes.data.blogs);
      setCategories(categoriesRes.data.categories);

      // Extract unique tags from all blogs
      const allTags = blogsRes.data.blogs.flatMap((blog) => blog.tags || []);
      const uniqueTags = [...new Set(allTags)];
      setTags(uniqueTags);
    } catch (error) {
      console.error("Failed to fetch sitemap data:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Sitemap</h1>
          <p className="text-lg text-gray-600">
            Navigate through all pages and content on our website
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Pages */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <div className="flex items-center gap-3 mb-6">
                <Home className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">Main Pages</h2>
              </div>

              <ul className="space-y-3">
                <li>
                  <Link
                    href="/"
                    className="flex items-center gap-1 text-gray-700 hover:text-blue-600 transition-colors group"
                  >
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-px transition-transform" />
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blogs"
                    className="flex items-center gap-1 text-gray-700 hover:text-blue-600 transition-colors group"
                  >
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-px transition-transform" />
                    All Blogs
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="flex items-center gap-1 text-gray-700 hover:text-blue-600 transition-colors group"
                  >
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-px transition-transform" />
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="flex items-center gap-1 text-gray-700 hover:text-blue-600 transition-colors group"
                  >
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-px transition-transform" />
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Categories */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <div className="flex items-center gap-3 mb-6">
                <FolderOpen className="w-6 h-6 text-green-600" />
                <h2 className="text-2xl font-bold text-gray-900">Categories</h2>
              </div>

              <ul className="space-y-3">
                {categories.map((category) => (
                  <li key={category._id}>
                    <Link
                      href={`/category/${category.name
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                      className="flex items-center gap-1 text-gray-700 hover:text-green-600 transition-colors group"
                    >
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-px transition-transform" />
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tags */}
            {tags.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Tag className="w-6 h-6 text-purple-600" />
                  <h2 className="text-2xl font-bold text-gray-900">
                    Popular Tags
                  </h2>
                </div>

                <div className="flex flex-wrap gap-2">
                  {tags.slice(0, 20).map((tag, index) => (
                    <Link
                      key={index}
                      href={`/blogs/tag/${tag.toLowerCase()}`}
                      className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm hover:bg-purple-100 transition-colors"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* All Blog Posts */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-3 mb-6">
                <BookOpen className="w-6 h-6 text-orange-600" />
                <h2 className="text-2xl font-bold text-gray-900">
                  All Blog Posts ({blogs.length})
                </h2>
              </div>

              {/* Group blogs by month */}
              {Object.entries(
                blogs.reduce((acc, blog) => {
                  const date = new Date(blog.publishedAt || blog.createdAt);
                  const monthYear = date.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                  });
                  if (!acc[monthYear]) acc[monthYear] = [];
                  acc[monthYear].push(blog);
                  return acc;
                }, {}),
              ).map(([monthYear, monthBlogs]) => (
                <div key={monthYear} className="mb-8">
                  <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-200">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <h3 className="text-lg font-semibold text-gray-800">
                      {monthYear}
                    </h3>
                    <span className="text-sm text-gray-500">
                      ({monthBlogs.length} posts)
                    </span>
                  </div>

                  <ul className="space-y-3 ml-7">
                    {monthBlogs.map((blog) => (
                      <li key={blog._id}>
                        <Link
                          href={`/blogs/${blog.slug}`}
                          className="group flex items-start gap-1 hover:bg-gray-50 p-2 rounded-lg transition-colors"
                        >
                          <ChevronRight className="w-4 h-4 text-gray-400 mt-1 group-hover:text-orange-600 group-hover:translate-x-px transition-all flex-shrink-0" />
                          <div className="flex-1">
                            <div className="flex items-start justify-between gap-4">
                              <span className="text-gray-700 group-hover:text-orange-600 transition-colors font-medium">
                                {blog.title}
                              </span>
                              <div className="flex items-center gap-2 flex-shrink-0">
                                {blog.isTrending && (
                                  <TrendingUp className="w-4 h-4 text-red-500" />
                                )}
                                {blog.isPopular && (
                                  <Flame className="w-4 h-4 text-orange-500" />
                                )}
                              </div>
                            </div>
                            <span className="text-xs text-gray-500">
                              {formatDate(blog.publishedAt || blog.createdAt)}
                            </span>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Last Updated */}
        <div className="mt-12 text-center text-sm text-gray-500">
          Last updated:{" "}
          {new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>
    </div>
  );
}
