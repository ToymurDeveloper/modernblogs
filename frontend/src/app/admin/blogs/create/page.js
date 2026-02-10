"use client";
import "../../../../app/styles/tiptap.css";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";

const TiptapEditor = dynamic(
  () => import("../../../(public)/components/TiptapEditor"),
  {
    ssr: false,
    loading: () => (
      <div className="border border-gray-300 rounded-md p-4 min-h-75 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    ),
  },
);

export default function CreateBlogPage() {
  const [formData, setFormData] = useState({
    title: "",
    subTitle: "",
    content: "",
    tags: "",
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
    category: "",
    contentType: "BlogPosting",
    authorDisplayName: "Editor",
    canonicalUrl: "",
    isPopular: false,
    isTrending: false,
    status: "published",
    faqs: [],
  });
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [imageUploading, setImageUploading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const { user, axiosInstance } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user || (user.role !== "admin" && user.role !== "subadmin")) {
      router.push("/");
      return;
    }
    fetchCategories();
  }, [user, router]);

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get("/categories");
      setCategories(response.data.categories);
    } catch (error) {
      toast.error("Failed to fetch categories");
    } finally {
      setCategoriesLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  //
  const handleContentChange = (html) => {
    setFormData({
      ...formData,
      content: html,
    });
  };

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
    );

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      },
    );

    const data = await response.json();
    return data.secure_url;
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file");
      return;
    }

    // Show preview immediately
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);

    // Upload to Cloudinary in background
    setImageUploading(true);
    const loadingToast = toast.loading("Uploading image...");
    try {
      const imageUrl = await uploadToCloudinary(file);
      setUploadedImageUrl(imageUrl);
      toast.success("Image uploaded successfully", { id: loadingToast });
    } catch (error) {
      toast.error(error.message || "Failed to upload image", {
        id: loadingToast,
      });
      setImagePreview("");
      setUploadedImageUrl("");
    } finally {
      setImageUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setUploadedImageUrl("");
    setImagePreview("");
    // Reset the file input
    const fileInput = document.getElementById("image");
    if (fileInput) fileInput.value = "";
  };

  const handleAddFaq = () => {
    setFormData({
      ...formData,
      faqs: [...formData.faqs, { question: "", answer: "" }],
    });
  };

  const handleFaqChange = (index, field, value) => {
    const updatedFaqs = [...formData.faqs];
    updatedFaqs[index][field] = value;
    setFormData({ ...formData, faqs: updatedFaqs });
  };

  const handleRemoveFaq = (index) => {
    const updatedFaqs = formData.faqs.filter((_, i) => i !== index);
    setFormData({ ...formData, faqs: updatedFaqs });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      toast.error("Title is required");
      return;
    }

    if (!formData.content.trim() || formData.content === "<p></p>") {
      toast.error("Content is required");
      return;
    }

    if (!formData.category) {
      toast.error("Please select a category");
      return;
    }

    if (!uploadedImageUrl) {
      toast.error("Please upload a featured image");
      return;
    }

    if (imageUploading) {
      toast.error("Please wait for image upload to complete");
      return;
    }

    setLoading(true);

    try {
      const tagsArray = formData.tags
        ? formData.tags.split(",").map((tag) => tag.trim())
        : [];
      const keywordsArray = formData.metaKeywords
        ? formData.metaKeywords.split(",").map((kw) => kw.trim())
        : [];

      const blogData = {
        ...formData,
        image: uploadedImageUrl, // Direct Cloudinary URL
        tags: tagsArray,
        metaKeywords: keywordsArray,
        faqs: formData.faqs.filter((faq) => faq.question && faq.answer),
      };

      await axiosInstance.post("/blogs", blogData);
      toast.success("Blog created successfully");
      router.push("/admin/blogs");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create blog");
    } finally {
      setLoading(false);
    }
  };

  if (categoriesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link
                href="/admin/blogs"
                className="text-gray-600 hover:text-gray-900 mr-4"
              >
                ← Back to Blogs
              </Link>
              <h1 className="text-xl font-bold text-gray-900">Create Blog</h1>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Basic Information
              </h2>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    disabled={loading}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
                    placeholder="Enter blog title"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subTitle"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Subtitle
                  </label>
                  <input
                    type="text"
                    id="subTitle"
                    name="subTitle"
                    value={formData.subTitle}
                    onChange={handleChange}
                    disabled={loading}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
                    placeholder="Enter blog subtitle"
                  />
                </div>

                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Category *
                  </label>
                  <select
                    id="category"
                    name="category"
                    required
                    value={formData.category}
                    onChange={handleChange}
                    disabled={loading}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
                  >
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="image"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Featured Image *
                  </label>
                  <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    disabled={loading || imageUploading}
                    className="cursor-pointer w-full file:px-3 file:py-2 file:border-r-2 text-gray-800 file:bg-indigo-50 file:hover:bg-indigo-100 file:border-gray-300 file:mr-3 file:pr-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
                  />

                  {imageUploading && (
                    <div className="mt-2 flex items-center text-sm text-indigo-600">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Uploading image to Cloudinary...
                    </div>
                  )}

                  {uploadedImageUrl && !imageUploading && (
                    <div className="mt-2 text-sm text-green-600 flex items-center">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Image uploaded successfully
                    </div>
                  )}

                  {imagePreview && (
                    <div className="mt-3">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="max-h-48 rounded-md"
                      />
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        disabled={loading || imageUploading}
                        className="cursor-pointer mt-2 px-3 py-1 text-sm font-medium text-red-600 border border-red-600 rounded-md hover:bg-red-100 disabled:opacity-50"
                      >
                        Remove Image
                      </button>
                    </div>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="tags"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    id="tags"
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    disabled={loading}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
                    placeholder="e.g., technology, web development, javascript"
                  />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Content *
              </h2>
              <TiptapEditor
                content={formData.content}
                onChange={handleContentChange}
                disabled={loading}
              />
            </div>

            {/* SEO Settings */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                SEO Settings
              </h2>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="metaTitle"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Meta Title (max 90 characters)
                  </label>
                  <input
                    type="text"
                    id="metaTitle"
                    name="metaTitle"
                    maxLength="90"
                    value={formData.metaTitle}
                    onChange={handleChange}
                    disabled={loading}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
                    placeholder="Leave empty to use title"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    {formData.metaTitle.length}/90 characters
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="metaDescription"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Meta Description (max 160 characters)
                  </label>
                  <textarea
                    id="metaDescription"
                    name="metaDescription"
                    rows="3"
                    maxLength="160"
                    value={formData.metaDescription}
                    onChange={handleChange}
                    disabled={loading}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
                    placeholder="Leave empty to use subtitle"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    {formData.metaDescription.length}/160 characters
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="metaKeywords"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Meta Keywords (comma-separated)
                  </label>
                  <input
                    type="text"
                    id="metaKeywords"
                    name="metaKeywords"
                    value={formData.metaKeywords}
                    onChange={handleChange}
                    disabled={loading}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
                    placeholder="e.g., web, development, coding"
                  />
                </div>

                <div>
                  <label
                    htmlFor="canonicalUrl"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Canonical URL
                  </label>
                  <input
                    type="url"
                    id="canonicalUrl"
                    name="canonicalUrl"
                    value={formData.canonicalUrl}
                    onChange={handleChange}
                    disabled={loading}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
                    placeholder="https://example.com/blog-post"
                  />
                </div>
              </div>
            </div>

            {/* Advanced Settings */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Advanced Settings
              </h2>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="contentType"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Content Type
                  </label>
                  <select
                    id="contentType"
                    name="contentType"
                    value={formData.contentType}
                    onChange={handleChange}
                    disabled={loading}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
                  >
                    <option value="BlogPosting">Blog Posting</option>
                    <option value="Article">Article</option>
                    <option value="NewsArticle">News Article</option>
                    <option value="TechArticle">Tech Article</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="authorDisplayName"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Author Display Name
                  </label>
                  <input
                    type="text"
                    id="authorDisplayName"
                    name="authorDisplayName"
                    value={formData.authorDisplayName}
                    onChange={handleChange}
                    disabled={loading}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
                  />
                </div>

                <div className="flex items-center space-x-6">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="isPopular"
                      checked={formData.isPopular}
                      onChange={handleChange}
                      disabled={loading}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      Mark as Popular
                    </span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="isTrending"
                      checked={formData.isTrending}
                      onChange={handleChange}
                      disabled={loading}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      Mark as Trending
                    </span>
                  </label>
                </div>

                <div>
                  <label
                    htmlFor="status"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Status
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    disabled={loading}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>
            </div>

            {/* FAQs */}
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">FAQs</h2>
                <button
                  type="button"
                  onClick={handleAddFaq}
                  disabled={loading}
                  className="px-3 py-1 text-sm font-medium text-indigo-600 border border-indigo-600 rounded-md hover:bg-indigo-50 disabled:opacity-50"
                >
                  + Add FAQ
                </button>
              </div>

              {formData.faqs.length === 0 ? (
                <p className="text-gray-500 text-sm">No FAQs added yet.</p>
              ) : (
                <div className="space-y-4">
                  {formData.faqs.map((faq, index) => (
                    <div key={index} className="border rounded-md p-4">
                      <div className="flex justify-between items-start mb-3">
                        <span className="text-sm font-medium text-gray-700">
                          FAQ #{index + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveFaq(index)}
                          disabled={loading}
                          className="text-red-600 hover:text-red-800 text-sm disabled:opacity-50"
                        >
                          Remove
                        </button>
                      </div>
                      <div className="space-y-3">
                        <input
                          type="text"
                          value={faq.question}
                          onChange={(e) =>
                            handleFaqChange(index, "question", e.target.value)
                          }
                          disabled={loading}
                          maxLength="200"
                          placeholder="Question (max 200 characters)"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
                        />
                        <textarea
                          value={faq.answer}
                          onChange={(e) =>
                            handleFaqChange(index, "answer", e.target.value)
                          }
                          disabled={loading}
                          maxLength="500"
                          rows="3"
                          placeholder="Answer (max 500 characters)"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit */}
            <div className="flex items-center justify-end space-x-4">
              <Link
                href="/admin/blogs"
                className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={loading || imageUploading}
                className="cursor-pointer px-6 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Creating...
                  </>
                ) : imageUploading ? (
                  "Uploading Image..."
                ) : (
                  "Create Blog"
                )}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
