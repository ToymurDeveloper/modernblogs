const express = require("express");
const {
  createBlog,
  getAllBlogs,
  getBlogBySlug,
  getBlogById,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");

const {
  getPublicBlogs,
  getTrendingBlogs,
  getPopularBlogs,
  getPublicBlogBySlug,
  getBlogsByTag,
  getLatestBlogs,
} = require("../controllers/publicBlogController");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

// Public routes
router.get("/public", getPublicBlogs);
router.get("/trending", getTrendingBlogs);
router.get("/popular", getPopularBlogs);
router.get("/public/:slug", getPublicBlogBySlug);
router.get("/tag/:tag", getBlogsByTag);
router.get("/latest", getLatestBlogs);
// router.get("/related/:slug", getRelatedBlogs);

router.get("/", protect, getAllBlogs);
router.get("/id/:id", protect, authorize("admin", "subadmin"), getBlogById);

router.get("/:slug", getBlogBySlug);

// Protected routes
router.post("/", protect, authorize("admin", "subadmin"), createBlog);
router.put("/:id", protect, authorize("admin", "subadmin"), updateBlog);
router.delete("/:id", protect, authorize("admin"), deleteBlog);

module.exports = router;
