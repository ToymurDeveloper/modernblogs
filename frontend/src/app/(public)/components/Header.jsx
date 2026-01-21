"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);
  const router = useRouter();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Search as user types (debounced)
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchQuery.trim().length >= 2) {
        performSearch(searchQuery.trim());
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    }, 300); // 300ms delay

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  const performSearch = async (query) => {
    setIsSearching(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/blogs/public`,
        {
          params: {
            search: query,
            limit: 5,
          },
        },
      );
      setSearchResults(response.data.blogs);
      setShowResults(true);
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowResults(false);
      router.push(`/blogs?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleResultClick = () => {
    setShowResults(false);
    setSearchQuery("");
  };

  const stripHtml = (html) => {
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <header className="bg-white py-16 px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-amber-500 mb-4">
          Enjoy your world of joy
        </h1>
        <h3 className="mb-10 text-base sm:text-lg">
          From local escapes to far-flung adventures, find what makes you happy
          anytime, anywhere
        </h3>

        {/* Search Bar */}
        <div ref={searchRef} className="relative">
          <form onSubmit={handleSearch}>
            <div className="flex items-center bg-white rounded-full shadow-lg border border-gray-200 overflow-hidden">
              {/* Search Icon */}
              <div className="pl-6 pr-4">
                <Search className="w-5 h-5 text-gray-500" />
              </div>

              {/* Input */}
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => searchResults.length > 0 && setShowResults(true)}
                placeholder="Places to go, things to do, explore to deep..."
                className="flex-1 text-gray-700 text-base outline-none placeholder-gray-400"
              />

              {/* Search Button */}
              <button
                type="submit"
                className="cursor-pointer bg-green-500 hover:bg-green-600 border border-green-600 text-gray-700 font-semibold px-6 py-2 m-1 rounded-full transition-colors"
              >
                Search
              </button>
            </div>
          </form>
          {/* Search Results Dropdown */}
          {showResults && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 max-h-[500px] overflow-y-auto z-50">
              {searchResults.map((blog) => (
                <Link
                  key={blog._id}
                  href={`/blogs/${blog.slug}`}
                  onClick={handleResultClick}
                  className="flex items-start gap-4 p-4 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors"
                >
                  {/* Blog Image */}
                  <div className="relative w-32 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-200">
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Blog Info */}
                  <div className="flex-1 text-left">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
                      {blog.title}
                    </h3>
                    {blog.subTitle && (
                      <p className="text-sm text-gray-600 mb-2 line-clamp-1">
                        {blog.subTitle}
                      </p>
                    )}
                    {/* <p className="text-sm text-gray-500 line-clamp-2">
                      {truncateText(stripHtml(blog.content), 120)}
                    </p> */}
                  </div>
                </Link>
              ))}

              {/* View All Results */}
              <button
                onClick={() => {
                  setShowResults(false);
                  router.push(
                    `/blogs?search=${encodeURIComponent(searchQuery.trim())}`,
                  );
                }}
                className="cursor-pointer w-full p-4 text-center text-green-600 font-semibold hover:bg-gray-50 transition-colors"
              >
                View all results for `{searchQuery}`
              </button>
            </div>
          )}

          {/* Loading State */}
          {isSearching && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mx-auto"></div>
              <p className="text-gray-500 mt-2">Searching...</p>
            </div>
          )}

          {/* No Results */}
          {showResults &&
            !isSearching &&
            searchQuery.trim().length >= 2 &&
            searchResults.length === 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 p-8 text-center">
                <svg
                  className="w-12 h-12 text-gray-300 mx-auto mb-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <p className="text-gray-500 font-medium">
                  No results found for `{searchQuery}`
                </p>
                <p className="text-gray-400 text-sm mt-1">
                  Try searching with different keywords
                </p>
              </div>
            )}
        </div>
      </div>
    </header>
  );
}
