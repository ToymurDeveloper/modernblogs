//app/blogs/[slug]/page.js
import { Suspense } from "react";
import SingleBlogClient from "./SingleBlogClient";

// Generate static params for all blog slugs at build time
export async function generateStaticParams() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/blogs/public?limit=1000`,
      { next: { revalidate: 3600 } },
    );
    const data = await response.json();

    return data.blogs.map((blog) => ({
      slug: blog.slug,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

// Enable dynamic rendering for new blogs
export const dynamicParams = true;

// Metadata generation - AWAIT params here
export async function generateMetadata({ params }) {
  // ✅ AWAIT params before using it
  const resolvedParams = await params;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/blogs/public/${resolvedParams.slug}`,
      { next: { revalidate: 3600 } },
    );
    const data = await response.json();

    return {
      title: data.blog.title,
      description: data.blog.subTitle || data.blog.title,
    };
  } catch (error) {
    return {
      title: "Blog Not Found",
    };
  }
}

// Main component - AWAIT params here too
export default async function SingleBlogPage({ params }) {
  // ✅ AWAIT params before passing to client component
  const resolvedParams = await params;

  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      }
    >
      <SingleBlogClient params={resolvedParams} />
    </Suspense>
  );
}
