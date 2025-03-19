const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const router = express.Router();

router.post("/login", async (req, res) => {
  console.log("Request Body:", req.body); // Log the request body

  const { email, google_id, name } = req.body;

  try {
    console.log("Finding user by email:", email); // Log the email
    let user = await User.findByEmail(email);
    console.log("User from DB:", user); // Log the user data

    if (!user) {
      console.log("User not found, creating new user..."); // Log new user creation
      const userId = await User.create({ google_id, email, name });
      user = { id: userId, google_id, email, name };
    }

    console.log("Generating JWT for user:", user); // Log user data before JWT generation
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    console.log("Token generated:", token); // Log the generated token

    res.json({ token });
  } catch (error) {
    console.error("Error in /login:", error); // Log the error
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
