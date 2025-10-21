import mongoose from "mongoose";

const QuizResultSchema = new mongoose.Schema({

  userId: { type: String, required: true },
  
  score: Number,
  total: Number,
  timePerQuestion: [Number],
  answers: [Number],
  level: { type: Number, required: true }, // ✅ ensure this exists
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("QuizResult", QuizResultSchema);
