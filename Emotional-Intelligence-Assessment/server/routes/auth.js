import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import QuizResult from "../models/QuizResult.js";

const router = express.Router();

// 🧠 Register user
router.post("/register", async (req, res) => {
  console.log("📩 Registering User:", req.body.email);

  try {
    const { name, email, password } = req.body;

    // Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({ msg: "Please enter all fields" });
    }

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Create new user instance
    // Note: If your User model has other required fields, add them here!
    user = new User({ 
      name, 
      email, 
      password // Storing as plain text per your request for local dev
    });

    await user.save();

    res.status(201).json({ 
      msg: "User registered successfully", 
      user: { id: user._id, name: user.name, email: user.email } 
    });
  } catch (err) {
    console.error("❌ Registration error details:", err);
    res.status(500).json({ 
      msg: "Database save failed", 
      error: err.message 
    });
  }
});

// 🔑 Login user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "Please enter all fields" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    // Compare plain text passwords
    if (user.password !== password) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Generate JWT
    const secret = process.env.JWT_SECRET || "default_local_secret";
    const token = jwt.sign({ id: user._id }, secret, { expiresIn: "7d" });

    res.json({ 
      token, 
      user: { _id: user._id, name: user.name, email: user.email } 
    });
  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).json({ msg: "Login process failed", error: err.message });
  }
});

// ✅ Save quiz result
router.post("/result", async (req, res) => {
  try {
    // Note: ensure front-end sends 'answers' or your model accepts 'userAnswers'
    const { userId, score, total, userAnswers, timePerQuestion, level } = req.body;

    if (!userId) return res.status(400).json({ msg: "Missing userId" });

    const result = new QuizResult({
      userId,
      score: score || 0,
      total: total || 5,
      answers: userAnswers || [], // Matching your frontend key
      timePerQuestion: timePerQuestion || [],
      level: level || 1,
    });

    await result.save();
    res.json({ msg: "✅ Result saved successfully", result });
  } catch (err) {
    console.error("❌ Error saving result:", err);
    res.status(500).json({ msg: "Failed to save quiz results", error: err.message });
  }
});

// ✅ Get all results for a user
router.get("/results/:userId", async (req, res) => {
  try {
    const results = await QuizResult.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(results);
  } catch (err) {
    console.error("❌ Error fetching results:", err);
    res.status(500).json({ msg: "Could not fetch results", error: err.message });
  }
});

export default router;