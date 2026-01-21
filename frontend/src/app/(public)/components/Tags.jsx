import Link from "next/link";

export default function Tags({ tags }) {
  if (!tags || tags.length === 0) return null;

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Tags</h2>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <Link
            key={index}
            href={`/blogs/tag/${tag.toLowerCase()}`}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
          >
            {tag}
          </Link>
        ))}
      </div>
    </div>
  );
}
