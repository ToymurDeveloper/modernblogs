const express = require("express");
const passport = require("passport");
const {
  register,
  login,
  getMe,
  refreshToken,
  logout,
  forgotPassword,
  resetPassword,
  googleCallback,
} = require("../controllers/authController");
const { protect } = require("../middleware/auth");

const router = express.Router();

// Standard authentication routes
router.post("/register", register);
router.post("/login", login);
router.post("/refresh-token", refreshToken);
router.post("/forgot-password", forgotPassword);
router.put("/reset-password/:token", resetPassword);

// Protected routes
router.get("/me", protect, getMe);
router.post("/logout", protect, logout);

// Google OAuth routes
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.FRONTEND_URL}/login?error=authentication_failed`,
    session: false,
  }),
  googleCallback
);

module.exports = router;
