//app/category/[slug]/page.js
import { Suspense } from "react";
import CategoryPageClient from "./CategoryPageClient";

// Generate static params for all categories at build time
export async function generateStaticParams() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/categories`,
      { next: { revalidate: 3600 } },
    );
    const data = await response.json();

    // Convert category names to URL-friendly slugs
    return data.categories.map((category) => ({
      slug: category.name.toLowerCase().replace(/\s+/g, "-"),
    }));
  } catch (error) {
    console.error("Error generating static params for categories:", error);
    return [];
  }
}

// Enable dynamic rendering for new categories
export const dynamicParams = true;

// Metadata generation
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const categoryName = resolvedParams.slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    title: `${categoryName} - Blog Category`,
    description: `Browse all blog posts in the ${categoryName} category`,
  };
}

export default async function CategoryPage({ params }) {
  const resolvedParams = await params;

  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        </div>
      }
    >
      <CategoryPageClient params={resolvedParams} />
    </Suspense>
  );
}
