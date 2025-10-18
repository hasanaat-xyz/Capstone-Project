import express from "express";
import User from "../models/User.js";  // create this model if not exists
import QuizResult from "../models/QuizResult.js";

const router = express.Router();

// 🧠 Register user
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    // check if user exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });

    // create new user
    user = new User({ name, email, password });
    await user.save();

    res.status(201).json({ msg: "User registered successfully", user });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// ✅ Save quiz result (you already had this)
router.post("/result", async (req, res) => {
  try {
    const { userId, score, total, answers, timePerQuestion, level } = req.body;
    const result = new QuizResult({ userId, score, total, answers, timePerQuestion, level });
    await result.save();
    res.json({ msg: "Result saved successfully", result });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// ✅ Get results
router.get("/results/:userId", async (req, res) => {
  try {
    const results = await QuizResult.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(results);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

export default router;
