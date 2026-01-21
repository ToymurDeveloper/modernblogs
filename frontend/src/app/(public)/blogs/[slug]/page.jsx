"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import TrendingBlogs from "../../components/TrendingBlogs";
import PopularBlogs from "../../components/PopularBlogs";

export default function SingleBlogPage() {
  const [blog, setBlog] = useState(null);
  const [trendingBlogs, setTrendingBlogs] = useState([]);
  const [popularBlogs, setPopularBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const slug = params.slug;

  useEffect(() => {
    fetchTrendingBlogs();
    fetchPopularBlogs();
  }, []);

  useEffect(() => {
    if (slug) {
      fetchBlog();
    }
  }, [slug]);

  const fetchBlog = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/blogs/public/${slug}`,
      );
      setBlog(response.data.blog);
    } catch (error) {
      console.error("Failed to fetch blog:", error);
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

  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Blog not found
          </h1>
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Featured Image */}
            <div className="relative rounded-md overflow-hidden max-h-100">
              <Image
                src={blog.image}
                alt={blog.title}
                width={800}
                height={600}
                className="w-full h-full object-cover"
                priority
              />
            </div>

            {/* Content Container */}
            <div className="py-8">
              {/* Title */}
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-600 mb-6 leading-tight">
                {blog.title}
              </h1>

              {/* Meta Information */}
              <div className="flex items-center space-x-4 mb-3">
                <div className="flex items-center text-gray-700">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="font-medium">
                    {blog.authorDisplayName || blog.author?.name || "Editor"}
                  </span>
                </div>

                <span className="text-gray-400">|</span>

                <div className="text-gray-700">
                  {formatDate(blog.publishedAt || blog.createdAt)}
                </div>
              </div>

              {/* Reading Time */}
              <div className="flex items-center text-gray-700 mb-6">
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
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{blog.readingTime || 8} minutes</span>
              </div>

              {/* Subtitle */}
              {blog.subTitle && (
                <p className="text-lg sm:text-xl text-gray-700 mb-6 leading-relaxed">
                  {blog.subTitle}
                </p>
              )}

              {/* Blog Content */}
              <div
                className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />

              {/* Tags */}
              {blog.tags && blog.tags.length > 0 && (
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {blog.tags.map((tag, index) => (
                      <Link
                        key={index}
                        href={`/blogs/tag/${tag.toLowerCase()}`}
                        className="cursor-pointer px-3 py-1 bg-amber-300 text-gray-700 rounded-full text-sm font-medium hover:bg-blue-300 transition-colors"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* FAQs */}
              {blog.faqs && blog.faqs.length > 0 && (
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Frequently Asked Questions
                  </h2>
                  <div className="space-y-6">
                    {blog.faqs.map((faq, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {faq.question}
                        </h3>
                        <p className="text-gray-700 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Back to Blogs */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <Link
                  href="/"
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
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
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="flex flex-col">
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
    </div>
  );
}
