import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import levelUpData from "../data/levelUpData"; // Level 2 questions

export default function Level2Quiz({ currentUser, onComplete }) {
  const navigate = useNavigate();
  const location = useLocation();
  const level1Data = location.state; // from Level 1

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [questionTimes, setQuestionTimes] = useState([]);
  const [startTime, setStartTime] = useState(Date.now());
  const [stage, setStage] = useState("quiz");

  const handleSelect = async (index) => {
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    const newTimes = [...questionTimes, timeSpent];
    const newAnswers = [...userAnswers, index];
    const isCorrect = index === levelUpData[currentQuestion].answer;
    const newScore = isCorrect ? score + 1 : score;

    if (currentQuestion + 1 === levelUpData.length) {
      // Save Level 2 result
      try {
        const res = await axios.post("http://localhost:5000/api/quiz/result", {
          userId: currentUser._id,
          score: newScore,
          total: levelUpData.length,
          timePerQuestion: newTimes,
          answers: newAnswers,
          level: 2,
        });
        console.log("Level 2 result saved:", res.data);
      } catch (err) {
        console.error("Error saving Level 2 result:", err);
      }

      setScore(newScore);
      setQuestionTimes(newTimes);
      setUserAnswers(newAnswers);
      setStage("complete");
    } else {
      setScore(newScore);
      setQuestionTimes(newTimes);
      setUserAnswers(newAnswers);
      setCurrentQuestion(currentQuestion + 1);
      setStartTime(Date.now());
    }
  };

  const handleNextLevel = () => {
    navigate("/level3", {
      state: {
        level1: level1Data,
        level2: { score, times: questionTimes, answers: userAnswers },
      },
    });
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-600 to-purple-700 text-white p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {stage === "quiz" && (
        <>
          <h2 className="text-3xl font-bold mb-6">Level 2: Self-Regulation 🌿</h2>
          <div className="bg-white/20 p-6 rounded-xl shadow-lg w-full max-w-lg">
            <h3 className="text-lg mb-4">{levelUpData[currentQuestion].question}</h3>
            <div className="flex flex-col space-y-3">
              {levelUpData[currentQuestion].options.map((opt, i) => (
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
            Question {currentQuestion + 1} of {levelUpData.length}
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
          <h2 className="text-3xl font-bold mb-4">🎉 Level 2 Complete!</h2>
          <p className="text-xl mb-6">You scored <span className="font-bold">{score}</span> / {levelUpData.length}</p>
          <button
            onClick={handleNextLevel}
            className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-lg text-white font-semibold"
          >
            Next Level →
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}
