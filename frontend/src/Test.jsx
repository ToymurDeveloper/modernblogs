import Link from "next/link";
import Image from "next/image";

export default function BlogCard({ blog }) {
  const formatDate = (date) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  return (
    <article className="h-full">
      <Link
        href={`/blogs/${blog.slug}`}
        aria-label={`Read blog post: ${blog.title}`}
        className="block h-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg"
      >
        <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col group hover:-translate-y-1 border border-gray-100">
          
          {/* Image Container */}
          <div className="relative w-full aspect-[16/9] bg-gray-100 overflow-hidden">
            <Image
              src={blog.image || "/default-blog.jpg"}
              alt={blog.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              loading="lazy"
              quality={80}
            />
            
            {/* Category Badge */}
            {blog.category && (
              <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                {blog.category}
              </span>
            )}
          </div>

          {/* Content Container */}
          <div className="p-5 flex flex-col grow">
            <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
              {blog.title}
            </h3>
            
            {/* Excerpt */}
            {blog.excerpt && (
              <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
                {blog.excerpt}
              </p>
            )}
            
            {/* Metadata */}
            <div className="pt-4 mt-auto border-t border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  {blog.authorImage ? (
                    <div className="relative w-8 h-8 rounded-full overflow-hidden mr-3">
                      <Image
                        src={blog.authorImage}
                        alt={blog.authorDisplayName}
                        fill
                        className="object-cover"
                        sizes="32px"
                      />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-200 mr-3 flex items-center justify-center">
                      <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                      </svg>
                    </div>
                  )}
                  <span className="text-sm font-medium text-gray-700">
                    {blog.authorDisplayName || blog.author?.name || "Editor"}
                  </span>
                </div>
                
                <time 
                  className="text-sm text-gray-500" 
                  dateTime={blog.publishedAt || blog.createdAt}
                >
                  {formatDate(blog.publishedAt || blog.createdAt)}
                </time>
              </div>
              
              {/* Read time and stats */}
              {(blog.readTime || blog.views) && (
                <div className="flex items-center text-xs text-gray-500 space-x-4">
                  {blog.readTime && (
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {blog.readTime} min read
                    </span>
                  )}
                  {blog.views && (
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      {blog.views.toLocaleString()} views
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}