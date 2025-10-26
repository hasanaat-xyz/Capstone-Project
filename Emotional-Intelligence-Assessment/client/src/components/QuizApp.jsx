import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import quizData from "../data/levelUpData"; // Level 1 questions

export default function Level1Quiz({ currentUser, onComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [questionTimes, setQuestionTimes] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [startTime, setStartTime] = useState(Date.now());

  const navigate = useNavigate();
  
  const handleSelect = async (index) => {
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    const newTimes = [...questionTimes, timeSpent];
    const newAnswers = [...userAnswers, index];
    const isCorrect = index === quizData[currentQuestion].answer;
    const newScore = isCorrect ? score + 1 : score;

    if (currentQuestion + 1 === quizData.length) {
      // Save result to backend
      try {
        const res = await axios.post("http://localhost:5000/api/quiz/result", {
          userId: currentUser._id,
          score: newScore,
          total: quizData.length,
          timePerQuestion: newTimes,
          answers: newAnswers,
          level: 1,
        });
        console.log("Level 1 result saved:", res.data);
      } catch (err) {
        console.error("Error saving Level 1 result:", err);
      }
      // Call onComplete callback
      
      if (typeof onComplete === "function") {
        onComplete({
          score: newScore,
          total: quizData.length,
          times: newTimes,
          answers: newAnswers,
          level: 1,
        });
      }

      // Navigate to next level or login
      navigate("/level2", {
        state: { score: newScore, times: newTimes, answers: newAnswers },
      });
    } else {
      setScore(newScore);
      setQuestionTimes(newTimes);
      setUserAnswers(newAnswers);
      setCurrentQuestion(currentQuestion + 1);
      setStartTime(Date.now());
    }
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-700 to-indigo-600 text-white p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold mb-6">Level 1: Self-Awareness 🧠</h2>

      <div className="bg-white/20 p-6 rounded-xl shadow-lg w-full max-w-lg">
        <h3 className="text-lg mb-4">{quizData[currentQuestion].question}</h3>
        <div className="flex flex-col space-y-3">
          {quizData[currentQuestion].options.map((opt, i) => (
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
        Question {currentQuestion + 1} of {quizData.length}
      </p>
    </motion.div>
  );
}
