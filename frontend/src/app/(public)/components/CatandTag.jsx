"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { Home, FolderOpen, Tag, ChevronRight } from "lucide-react";

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

  if (loading) {
    return (
      <div className="flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Categories */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <FolderOpen className="w-6 h-6 text-green-600" />
              <h2 className="text-2xl font-bold text-gray-900">Categories</h2>
            </div>

            <ul className="flex flex-wrap gap-4">
              {categories.map((category) => (
                <li key={category._id}>
                  <Link
                    href={`/category/${category.name
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                    className="flex items-center gap-0.5 text-gray-700 hover:text-green-600 transition-colors group"
                  >
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-px transition-transform" />
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tags */}
          <div>
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
        </div>
      </div>
    </div>
  );
}
