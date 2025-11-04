import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import levelUpData4 from "../data/levelUpData4"; // Level 4 questions

export default function LevelUpQuiz4() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, level1Results, level2Results, level3Results } = location.state || {};

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

    if (currentQuestion + 1 === levelUpData4.length) {
      setStage("complete");
    } else {
      setCurrentQuestion(currentQuestion + 1);
      setStartTime(Date.now());
    }
  };

  const handleNextLevel = () => {
    const level4Data = {
      level: 4,
      score: userAnswers.reduce(
        (sum, ans, i) => sum + (ans === levelUpData4[i].answer ? 1 : 0),
        0
      ),
      total: levelUpData4.length,
      questions: levelUpData4.map((q, i) => ({
        questionText: q.question,
        chosenAnswer: q.options[userAnswers[i]],
        score: userAnswers[i] === q.answer ? 1 : 0,
        timeSpent: questionTimes[i],
      })),
    };

    // Navigate to Level 5 with all previous results
    navigate("/level5", {
      state: [currentUser, level1Results, level2Results, level3Results, level4Data],
    });

    // Send results to server in background
    axios.post("http://localhost:5000/api/quiz/result", {
      userId: currentUser._id,
      level: 4,
      userAnswers,
      timePerQuestion: questionTimes,
      quizQuestions: levelUpData4.map((q) => ({
        question: q.question,
        options: q.options,
        correctIndex: q.answer,
      })),
    }).catch(err => console.error("Error saving Level 4 result:", err));
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
          <h2 className="text-3xl font-bold mb-6 text-purple-700">Fuel Up, Fear Down⚡</h2>
          <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-xl w-full max-w-lg">
            <h3 className="text-lg mb-4 font-semibold">{levelUpData4[currentQuestion].question}</h3>
            <div className="flex flex-col space-y-3">
              {levelUpData4[currentQuestion].options.map((opt, i) => (
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
            Question {currentQuestion + 1} of {levelUpData4.length}
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
          <h2 className="text-3xl font-bold mb-4 text-purple-700">Well-done!</h2>
          <p className="text-xl mb-4">
            You scored{" "}
            <span className="font-bold text-pink-600">
              {userAnswers.reduce(
                (sum, ans, i) => sum + (ans === levelUpData4[i].answer ? 1 : 0),
                0
              )}
            </span>{" "}
            / {levelUpData4.length}
          </p>
          <button
            onClick={handleNextLevel}
            className="bg-pink-300 hover:bg-pink-400 text-white font-semibold px-6 py-3 rounded-full shadow-md transition-all duration-300"
          >
           Blast Off to to explore your social skills 🚀 →
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}
