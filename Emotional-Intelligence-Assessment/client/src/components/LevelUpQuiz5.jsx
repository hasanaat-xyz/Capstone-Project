// src/pages/LevelUpQuiz5.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import levelUpData5 from "../data/levelUpData5"; // Level 5 questions

export default function LevelUpQuiz5() {
  const navigate = useNavigate();
  const location = useLocation();
  const { 
    0: currentUser, 
    1: level1Results, 
    2: level2Results, 
    3: level3Results, 
    4: level4Results 
  } = location.state || {};

  if (!currentUser) {
    navigate("/login");
    return null;
  }

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [questionTimes, setQuestionTimes] = useState([]);
  const [startTime, setStartTime] = useState(Date.now());
  const [stage, setStage] = useState("quiz");

  const handleSelect = (index) => {
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    const updatedAnswers = [...userAnswers, index];
    const updatedTimes = [...questionTimes, timeSpent];

    setUserAnswers(updatedAnswers);
    setQuestionTimes(updatedTimes);

    if (currentQuestion + 1 === levelUpData5.length) {
      setStage("complete");
    } else {
      setCurrentQuestion(currentQuestion + 1);
      setStartTime(Date.now());
    }
  };

  const handleShowReport = () => {
    const level5Data = {
      level: 5,
      score: userAnswers.reduce(
        (sum, ans, i) => sum + (ans === levelUpData5[i].answer ? 1 : 0),
        0
      ),
      total: levelUpData5.length,
      questions: levelUpData5.map((q, i) => ({
        questionText: q.question,
        chosenAnswer: q.options[userAnswers[i]],
        score: userAnswers[i] === q.answer ? 1 : 0,
        timeSpent: questionTimes[i],
      })),
    };

    // Navigate to EQ report with all levels
    navigate("/eq-report", {
      state: [level1Results, level2Results, level3Results, level4Results, level5Data],
    });

    // Send Level 5 results to server
    axios.post("http://localhost:5000/api/quiz/result", {
      userId: currentUser._id,
      level: 5,
      userAnswers,
      timePerQuestion: questionTimes,
      quizQuestions: levelUpData5.map((q) => ({
        question: q.question,
        options: q.options,
        correctIndex: q.answer,
      })),
    }).catch(err => console.error("Error saving Level 5 result:", err));
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 text-gray-800 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {stage === "quiz" && (
        <>
          <h2 className="text-3xl font-bold mb-6 text-purple-700">Psychology of Connection🧠✨</h2>
          <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-xl w-full max-w-lg">
            <h3 className="text-lg mb-4 font-semibold">{levelUpData5[currentQuestion].question}</h3>
            <div className="flex flex-col space-y-3">
              {levelUpData5[currentQuestion].options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleSelect(i)}
                  className="bg-purple-100 hover:bg-purple-200 text-purple-800 py-2 rounded-xl shadow-sm transition-all duration-300 font-medium"
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
          <p className="mt-6 text-sm opacity-80">
            Question {currentQuestion + 1} of {levelUpData5.length}
          </p>
        </>
      )}

      {stage === "complete" && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-2xl max-w-sm"
        >
          <h2 className="text-3xl font-bold mb-4 text-purple-700">Epic Finish! 🎉</h2>
          <p className="text-xl mb-4">
            You scored{" "}
            <span className="font-bold text-pink-600">
              {userAnswers.reduce(
                (sum, ans, i) => sum + (ans === levelUpData5[i].answer ? 1 : 0),
                0
              )}
            </span>{" "}
            / {levelUpData5.length}
          </p>
          <button
            onClick={handleShowReport}
            className="bg-pink-300 hover:bg-pink-400 text-white font-semibold px-6 py-3 rounded-full shadow-md transition-all duration-300"
          >
           Reveal Your Inner EQ 📝 →
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}
