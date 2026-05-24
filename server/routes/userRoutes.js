const express = require("express");

const {
  updateProfile,
  changePassword,
} = require("../controllers/userController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Update Profile

router.put(
  "/profile",
  protect,
  updateProfile
);

// Change Password

router.put(
  "/change-password",
  protect,
  changePassword
);

module.exports = router;