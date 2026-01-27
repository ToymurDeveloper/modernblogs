const Blog = require("../models/Blog");
const Category = require("../models/Category");
const cloudinary = require("../config/cloudinary");

// Helper function to calculate reading time
const calculateReadingTime = (content) => {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
};

exports.createBlog = async (req, res) => {
  try {
    const {
      title,
      subTitle,
      content,
      tags,
      metaTitle,
      metaDescription,
      metaKeywords,
      category,
      contentType,
      authorDisplayName,
      canonicalUrl,
      isPopular,
      isTrending,
      faqs,
      status,
      image, // This is now a Cloudinary URL, not base64
    } = req.body;

    // Validate category exists
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // Image is already uploaded to Cloudinary from frontend
    // Just validate the URL
    if (!image || !image.startsWith("https://res.cloudinary.com")) {
      return res.status(400).json({
        success: false,
        message: "Invalid image URL",
      });
    }

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

    // Check if slug already exists
    const slugExists = await Blog.findOne({ slug });
    if (slugExists) {
      return res.status(400).json({
        success: false,
        message: "A blog with this title already exists",
      });
    }

    // Calculate reading time
    const readingTime = calculateReadingTime(content);

    // Create blog
    const blog = await Blog.create({
      title,
      slug,
      subTitle,
      image, // Direct Cloudinary URL
      content,
      tags: tags || [],
      metaTitle: metaTitle || title,
      metaDescription: metaDescription || subTitle,
      metaKeywords: metaKeywords || [],
      category,
      contentType: contentType || "BlogPosting",
      author: req.user._id,
      authorDisplayName: authorDisplayName || "Editor",
      canonicalUrl,
      isPopular: isPopular || false,
      isTrending: isTrending || false,
      readingTime,
      faqs: faqs || [],
      status: status || "published",
      publishedAt: status === "published" ? new Date() : null,
    });

    // Populate category and author
    await blog.populate("category", "name slug");
    await blog.populate("author", "name email");

    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      blog,
    });
  } catch (error) {
    console.error("Create blog error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to create blog",
    });
  }
};

// @desc    Get all blogs
// @route   GET /api/blogs
// @access  Public
exports.getAllBlogs = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      status,
      category,
      tag,
      search,
      isPopular,
      isTrending,
    } = req.query;

    const query = {};

    // Filter by status (default to published for public access)
    if (
      req.user &&
      (req.user.role === "admin" || req.user.role === "subadmin")
    ) {
      if (status) query.status = status;
    } else {
      query.status = "published";
    }

    // Filter by category
    if (category) query.category = category;

    // Filter by tag
    if (tag) query.tags = { $in: [tag.toLowerCase()] };

    // Filter by popular/trending
    if (isPopular === "true") query.isPopular = true;
    if (isTrending === "true") query.isTrending = true;

    // Search in title and content
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
        { tags: { $in: [new RegExp(search, "i")] } },
      ];
    }

    const blogs = await Blog.find(query)
      .populate("category", "name slug")
      .populate("author", "name email")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select("-__v");

    const count = await Blog.countDocuments(query);

    res.json({
      success: true,
      blogs,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      totalBlogs: count,
    });
  } catch (error) {
    console.error("Get blogs error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch blogs",
    });
  }
};

// @desc    Get blog by slug
// @route   GET /api/blogs/:slug
// @access  Public
exports.getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug })
      .populate("category", "name slug description")
      .populate("author", "name email");

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    // Only allow viewing drafts if user is admin/subadmin
    if (blog.status === "draft") {
      if (
        !req.user ||
        (req.user.role !== "admin" && req.user.role !== "subadmin")
      ) {
        return res.status(403).json({
          success: false,
          message: "Access denied",
        });
      }
    }

    // Increment views
    blog.views += 1;
    await blog.save();

    res.json({
      success: true,
      blog,
    });
  } catch (error) {
    console.error("Get blog error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch blog",
    });
  }
};

// @desc    Get blog by ID
// @route   GET /api/blogs/id/:id
// @access  Private
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate("category", "name slug")
      .populate("author", "name email");

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    res.json({
      success: true,
      blog,
    });
  } catch (error) {
    console.error("Get blog error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch blog",
    });
  }
};

// @desc    Update blog
// @route   PUT /api/blogs/:id
// @access  Private (admin, subadmin)
exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    const {
      title,
      subTitle,
      content,
      tags,
      metaTitle,
      metaDescription,
      metaKeywords,
      category,
      contentType,
      authorDisplayName,
      canonicalUrl,
      isPopular,
      isTrending,
      faqs,
      status,
    } = req.body;

    // Validate category if provided
    if (category && category !== blog.category.toString()) {
      const categoryExists = await Category.findById(category);
      if (!categoryExists) {
        return res.status(404).json({
          success: false,
          message: "Category not found",
        });
      }
    }


    let imageUrl = blog.image;
    if (req.body.image && req.body.image !== blog.image) {
      // Check if it's a Cloudinary URL (new upload from frontend)
      if (req.body.image.startsWith("https://res.cloudinary.com")) {
        // It's already a Cloudinary URL, just use it
        imageUrl = req.body.image;

        // Delete old image from cloudinary (optional)
        if (blog.image && blog.image.includes("cloudinary")) {
          try {
            const publicId = blog.image
              .split("/")
              .slice(-2)
              .join("/")
              .split(".")[0];
            await cloudinary.uploader.destroy(publicId);
          } catch (error) {
            console.error("Failed to delete old image:", error);
          }
        }
      }
    }

    // Generate new slug if title changed
    let slug = blog.slug;
    if (title && title !== blog.title) {
      slug = title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");

      // Check if new slug already exists
      const slugExists = await Blog.findOne({ slug, _id: { $ne: blog._id } });
      if (slugExists) {
        return res.status(400).json({
          success: false,
          message: "A blog with this title already exists",
        });
      }
    }

    // Calculate reading time if content changed
    let readingTime = blog.readingTime;
    if (content && content !== blog.content) {
      readingTime = calculateReadingTime(content);
    }

    // Update publishedAt if status changes to published
    let publishedAt = blog.publishedAt;
    if (status === "published" && blog.status !== "published") {
      publishedAt = new Date();
    }

    // Update blog
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      {
        title: title || blog.title,
        slug,
        subTitle: subTitle !== undefined ? subTitle : blog.subTitle,
        image: imageUrl,
        content: content || blog.content,
        tags: tags !== undefined ? tags : blog.tags,
        metaTitle: metaTitle !== undefined ? metaTitle : blog.metaTitle,
        metaDescription:
          metaDescription !== undefined
            ? metaDescription
            : blog.metaDescription,
        metaKeywords:
          metaKeywords !== undefined ? metaKeywords : blog.metaKeywords,
        category: category || blog.category,
        contentType: contentType || blog.contentType,
        authorDisplayName:
          authorDisplayName !== undefined
            ? authorDisplayName
            : blog.authorDisplayName,
        canonicalUrl:
          canonicalUrl !== undefined ? canonicalUrl : blog.canonicalUrl,
        isPopular: isPopular !== undefined ? isPopular : blog.isPopular,
        isTrending: isTrending !== undefined ? isTrending : blog.isTrending,
        readingTime,
        faqs: faqs !== undefined ? faqs : blog.faqs,
        status: status || blog.status,
        publishedAt,
      },
      { new: true, runValidators: true },
    )
      .populate("category", "name slug")
      .populate("author", "name email");

    res.json({
      success: true,
      message: "Blog updated successfully",
      blog: updatedBlog,
    });
  } catch (error) {
    console.error("Update blog error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to update blog",
    });
  }
};

// @desc    Delete blog
// @route   DELETE /api/blogs/:id
// @access  Private (admin)
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    // Delete image from cloudinary
    if (blog.image) {
      try {
        const publicId = blog.image.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(`blog-images/${publicId}`);
      } catch (error) {
        console.error("Failed to delete image from cloudinary:", error);
      }
    }

    await blog.deleteOne();

    res.json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    console.error("Delete blog error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete blog",
    });
  }
};
