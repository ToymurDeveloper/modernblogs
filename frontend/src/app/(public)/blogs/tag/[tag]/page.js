//app/blogs/tag/[tag]/page.js
import { Suspense } from "react";
import TagPageClient from "./TagPageClient";

// Generate static params for all tags at build time
export async function generateStaticParams() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/blogs/public?limit=1000`,
      { next: { revalidate: 3600 } }
    );
    const data = await response.json();
    
    // Extract all unique tags from all blogs
    const allTags = new Set();
    data.blogs.forEach((blog) => {
      if (blog.tags && Array.isArray(blog.tags)) {
        blog.tags.forEach((tag) => {
          allTags.add(tag.toLowerCase());
        });
      }
    });
    
    // Convert to array of params objects
    return Array.from(allTags).map((tag) => ({
      tag: tag,
    }));
  } catch (error) {
    console.error("Error generating static params for tags:", error);
    return [];
  }
}

// Enable dynamic rendering for new tags
export const dynamicParams = true;

// Metadata generation
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const decodedTag = decodeURIComponent(resolvedParams.tag);
  
  return {
    title: `${decodedTag.charAt(0).toUpperCase() + decodedTag.slice(1)} - Blog Posts`,
    description: `Browse all blog posts tagged with ${decodedTag}`,
  };
}

export default async function TagPage({ params }) {
  const resolvedParams = await params;
  
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    }>
      <TagPageClient params={resolvedParams} />
    </Suspense>
  );
}