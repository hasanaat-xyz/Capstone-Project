import mongoose from "mongoose";

const quizResultSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  score: { type: Number, required: true },
  total: { type: Number, required: true },
  answers: [{ questionId: String, selectedOption: Number }],
  timePerQuestion: [{ type: Number }], // <-- make sure this exists
  date: { type: Date, default: Date.now },
});

export default mongoose.model("QuizResult", quizResultSchema);
