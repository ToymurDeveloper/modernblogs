const Blog = require("../models/Blog");

exports.getPublicBlogs = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      category,
      tag,
      search,
      isPopular,
      isTrending,
    } = req.query;

    const query = { status: "published" };

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

exports.getTrendingBlogs = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5;

    const blogs = await Blog.find({ status: "published", isTrending: true })
      .populate("category", "name slug")
      .populate("author", "name email")
      .sort({ createdAt: -1, publishedAt: 1 })
      .limit(limit)
      .select("title slug image authorDisplayName publishedAt createdAt");

    res.json({
      success: true,
      blogs,
    });
  } catch (error) {
    console.error("Get latest public blogs error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch latest blogs",
    });
  }
};

exports.getPopularBlogs = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5;

    const blogs = await Blog.find({ status: "published", isPopular: true })
      .populate("category", "name slug")
      .populate("author", "name email")
      .sort({ createdAt: 1, publishedAt: -1 })
      .limit(limit)
      .select("title slug image authorDisplayName publishedAt createdAt");

    res.json({
      success: true,
      blogs,
    });
  } catch (error) {
    console.error("Get latest public blogs error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch latest blogs",
    });
  }
};

exports.getPublicBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({
      slug: req.params.slug,
      status: "published",
    })
      .populate("category", "name slug description")
      .populate("author", "name email");

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    // Increment views
    blog.views += 1;
    await blog.save();

    res.json({
      success: true,
      blog,
    });
  } catch (error) {
    console.error("Get public blog error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch blog",
    });
  }
};

exports.getBlogsByTag = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const tag = req.params.tag.toLowerCase();

    const query = {
      status: "published",
      tags: { $in: [tag] },
    };

    const blogs = await Blog.find(query)
      .populate("category", "name slug")
      .populate("author", "name email")
      .sort({ publishedAt: -1, createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select("-__v");

    const count = await Blog.countDocuments(query);

    res.json({
      success: true,
      blogs,
      tag,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      totalBlogs: count,
    });
  } catch (error) {
    console.error("Get blogs by tag error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch blogs by tag",
    });
  }
};
