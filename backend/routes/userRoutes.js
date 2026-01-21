const express = require("express");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

// Example protected routes
router.get("/dashboard", protect, (req, res) => {
  res.json({
    success: true,
    message: "Welcome to user dashboard",
    user: req.user,
  });
});

// Admin only route
router.get(
  "/admin/dashboard",
  protect,
  authorize("admin", "subadmin"),
  (req, res) => {
    res.json({
      success: true,
      message: "Welcome to admin dashboard",
      user: req.user,
    });
  }
);

// Admin only route
router.get("/admin/users", protect, authorize("admin"), (req, res) => {
  res.json({
    success: true,
    message: "Admin users management",
  });
});

module.exports = router;
