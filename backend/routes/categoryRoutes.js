const express = require("express");
const {
  createCategory,
  getAllCategories,
  getCategoryById,
  getCategoryBySlug,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

// Public routes
router.get("/", getAllCategories);
router.get("/id/:id", getCategoryById);
router.get("/:slug", getCategoryBySlug);

// Protected routes
router.post("/", protect, authorize("admin", "subadmin"), createCategory);
router.put("/:id", protect, authorize("admin", "subadmin"), updateCategory);
router.delete("/:id", protect, authorize("admin"), deleteCategory);

module.exports = router;
