import express from "express";
import QuizResult from "../models/QuizResult.js";

const router = express.Router();
// Save Quiz Result
router.post("/result", async (req, res) => {
  console.log("Incoming quiz data:", req.body);

  try {
    const { userId, score, total, timePerQuestion, level, answers } = req.body;

    const result = new QuizResult({
      userId,
      score,
      total,
      timePerQuestion,
      level,    // ✅ add this
      answers,  // ✅ optional if you want to store user answers too
    });

    await result.save();
    res.json({ msg: "Result saved successfully", result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// Get all results for a user

router.get("/results/:userId", async (req, res) => {
  try {
    const results = await QuizResult.find({ userId: req.params.userId });
    res.json(results);
  } catch (err) {
    console.error(err);

    res.status(500).json({ msg: "Server error" });
  }
});

export default router;
