import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-indigo-600 mb-4">404</h1>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="mb-8">
          <svg
            className="mx-auto h-32 w-32 text-indigo-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <div className="flex sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-8 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Go Home
          </Link>
          <Link
            href="/contact"
            className="px-8 py-3 bg-white text-gray-700 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            Contact Support
          </Link>
        </div>

        <div className="mt-12">
          <p className="text-sm text-gray-500">
            Lost? Here are some helpful links:
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            <Link
              href="/blogs"
              className="text-indigo-600 hover:text-indigo-800 text-sm"
            >
              Blogs
            </Link>
            <Link
              href="/services"
              className="text-indigo-600 hover:text-indigo-800 text-sm"
            >
              Services
            </Link>
            <Link
              href="/about"
              className="text-indigo-600 hover:text-indigo-800 text-sm"
            >
              About Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
