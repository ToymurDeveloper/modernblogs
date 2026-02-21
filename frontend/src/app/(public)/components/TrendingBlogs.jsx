import { ArrowRight, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function TrendingBlogs({ blogs, loading }) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900 mb-5">
        Trending on
        <span>
          <TrendingUp className="ms-2 text-red-500 w-5 h-5 inline-block" />
        </span>
      </h2>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="animate-pulse">
              <div className="h-3 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="border-b border-gray-300 pb-2 last:border-b-0 last:pb-0"
            >
              <Link href={`/blogs/${blog.slug}`}>
                <div className="flex justify-between items-center gap-2">
                  <h3 className="text-base font-medium text-gray-900 mb-1 line-clamp-3 leading-relaxed">
                    {blog.title}
                  </h3>
                  <div className="relative w-24 h-18 shrink-0 rounded-sm overflow-hidden">
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      fill
                      sizes="96px"
                      className="object-cover"
                      loading="lazy"
                      quality={80}
                    />
                  </div>
                </div>
              </Link>
              <Link
                href={`/blogs/${blog.slug}`}
                className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors group"
              >
                Read now
                <ArrowRight className="ms-1 w-4 h-4 group-hover:translate-x-px transition-transform" />
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
