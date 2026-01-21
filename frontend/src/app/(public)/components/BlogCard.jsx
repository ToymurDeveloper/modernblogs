import Link from "next/link";
import Image from "next/image";

export default function BlogCard({ blog }) {
  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  return (
    <Link href={`/blogs/${blog.slug}`}>
      <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
        {/* Image */}
        <div className="relative w-full h-48 bg-gray-200">
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-grow">
          {/* Title */}
          <h3 className="text-base font-semibold text-gray-900 mb-2 line-clamp-3 leading-snug">
            {blog.title}
          </h3>

          {/* Author & Date */}
          <div className="mt-auto space-y-2">
            <div className="flex items-center text-sm text-gray-600">
              <svg
                className="w-4 h-4 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
              <span>
                {blog.authorDisplayName || blog.author?.name || "Editor"}
              </span>
            </div>

            <div className="text-sm text-gray-500">
              Published: {formatDate(blog.publishedAt || blog.createdAt)}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
