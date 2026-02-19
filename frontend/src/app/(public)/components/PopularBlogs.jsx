import { ArrowRight, Flame } from "lucide-react";
import Link from "next/link";

export default function PopularBlogs({ blogs }) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-800 mb-5">
        Popular Now
        <span>
          <Flame className="ms-2 mb-1 text-orange-500 w-5 h-5 inline-block" />
        </span>
      </h2>

      <div className="space-y-4">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="border-b border-gray-300 pb-2 last:border-b-0 last:pb-0"
          >
            <h3 className="text-base font-medium text-gray-900 mb-1 line-clamp-3 leading-relaxed">
              {blog.title}
            </h3>

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
    </div>
  );
}
