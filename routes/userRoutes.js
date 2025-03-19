const express = require("express");
const User = require("../models/userModel");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Save user data
router.post("/save", authMiddleware, async (req, res) => {
  const { education, experience, skills } = req.body;
  const userId = req.userId;

  try {
    await User.update(userId, { education, experience, skills });
    res.json({ message: "User data saved successfully" });
  } catch (error) {
    console.error("Error saving user data:", error);
    res.status(500).json({ message: "ddServer error" });
  }
});

module.exports = router;
