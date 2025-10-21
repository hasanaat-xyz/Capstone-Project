import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import levelUpData3 from "../data/levelUpData3"; // Level 3 questions

export default function Level3Quiz({ currentUser, onComplete }) {
  const navigate = useNavigate();
  const location = useLocation();
  const previousResults = location.state; // level1 + level2

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [questionTimes, setQuestionTimes] = useState([]);
  const [startTime, setStartTime] = useState(Date.now());
  const [stage, setStage] = useState("quiz");

  const handleSelect = (index) => {
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    const newTimes = [...questionTimes, timeSpent];
    const newAnswers = [...userAnswers, index];
    const isCorrect = index === levelUpData3[currentQuestion].answer;
    const newScore = isCorrect ? score + 1 : score;

    setScore(newScore);
    setQuestionTimes(newTimes);
    setUserAnswers(newAnswers);

    if (currentQuestion + 1 === levelUpData3.length) {
      setStage("complete"); // Show completion stage
    } else {
      setCurrentQuestion(currentQuestion + 1);
      setStartTime(Date.now());
    }
  };

  const handleShowReport = async () => {
    try {
      // ✅ Save Level 3 result to backend
      const res = await axios.post("http://localhost:5000/api/quiz/result", {
        userId: currentUser._id,
        score,
        total: levelUpData3.length,
        timePerQuestion: questionTimes,
        answers: userAnswers,
        level: 3,
      });
      console.log("Level 3 result saved:", res.data);

      // ✅ Navigate to EQ Report with all levels
      const results = {
        level1: previousResults.level1,
        level2: previousResults.level2,
        level3: { score, total: levelUpData3.length, times: questionTimes, answers: userAnswers },
      };
      navigate("/eq-report", { state: results });

      if (typeof onComplete === "function") onComplete(results);
    } catch (err) {
      console.error("Error saving Level 3 result:", err);
    }
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-700 to-violet-600 text-white p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {stage === "quiz" && (
        <>
          <h2 className="text-3xl font-bold mb-6">Level 3: Empathy & Relationship Skills 💞</h2>
          <div className="bg-white/20 p-6 rounded-xl shadow-lg w-full max-w-lg">
            <h3 className="text-lg mb-4">{levelUpData3[currentQuestion].question}</h3>
            <div className="flex flex-col space-y-3">
              {levelUpData3[currentQuestion].options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleSelect(i)}
                  className="bg-white/20 hover:bg-white/30 py-2 rounded-lg transition-all"
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
          <p className="mt-6 text-sm opacity-80">
            Question {currentQuestion + 1} of {levelUpData3.length}
          </p>
        </>
      )}

      {stage === "complete" && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center bg-white/20 p-8 rounded-2xl shadow-lg"
        >
          <h2 className="text-3xl font-bold mb-4">🎊 Level 3 Complete!</h2>
          <p className="text-xl mb-2">
            You scored <span className="font-bold">{score}</span> / {levelUpData3.length}
          </p>
          <p className="mb-6">
            Average Time: {(questionTimes.reduce((a, b) => a + b, 0) / questionTimes.length).toFixed(1)}s per question
          </p>
          <button
            onClick={handleShowReport}
            className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg text-white font-semibold"
          >
            View Final EQ Report →
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}
