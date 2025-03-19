const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, google_id, name } = req.body;

  try {
    let user = await User.findByEmail(email);

    if (!user) {
      // Create a new user if they don't exist
      const userId = await User.create({ google_id, email, name });
      user = { id: userId, google_id, email, name };
    }

    // Generate JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
