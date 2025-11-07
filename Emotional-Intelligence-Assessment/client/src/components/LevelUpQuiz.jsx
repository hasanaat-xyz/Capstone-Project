import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import levelUpData2 from "../data/levelUpData"; // ✅ Correct data file

export default function LevelUpQuiz2() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, level1Results } = location.state || {};

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

    if (currentQuestion + 1 === levelUpData2.length) {
      setStage("complete");
    } else {
      setCurrentQuestion(currentQuestion + 1);
      setStartTime(Date.now());
    }
  };

  const handleNextLevel = () => {
    const level2Results = {
      level: 2,
      score: userAnswers.reduce(
        (sum, ans, i) => sum + (ans === levelUpData2[i].answer ? 1 : 0),
        0
      ),
      total: levelUpData2.length,
      questions: levelUpData2.map((q, i) => ({
        questionText: q.question,
        chosenAnswer: q.options[userAnswers[i]],
        score: userAnswers[i] === q.answer ? 1 : 0,
        timeSpent: questionTimes[i],
      })),
    };

    // ✅ Navigate to Level 3
    navigate("/level3", {
      state: { currentUser, level1Results, level2Results },
    });

    // Send results to server
    axios.post("https://nuvio.care/api/quiz/result", {
      userId: currentUser._id,
      level: 2,
      userAnswers,
      timePerQuestion: questionTimes,
      quizQuestions: levelUpData2.map((q) => ({
        question: q.question,
        options: q.options,
        correctIndex: q.answer,
      })),
    }).catch(err => console.error("Error saving Level 2 result:", err));
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-teal-100 to-green-100 text-gray-800 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {stage === "quiz" && (
        <>
          <h2 className="text-3xl font-bold mb-6 text-green-700">
          Own The Flow 🌿
          </h2>
          <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-xl w-full max-w-lg">
            <h3 className="text-lg mb-4 font-semibold">
              {levelUpData2[currentQuestion].question}
            </h3>
            <div className="flex flex-col space-y-3">
              {levelUpData2[currentQuestion].options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleSelect(i)}
                  className="bg-green-100 hover:bg-green-200 text-green-800 py-2 rounded-xl shadow-sm transition-all duration-300 font-medium"
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
          <p className="mt-6 text-sm opacity-80">
            Question {currentQuestion + 1} of {levelUpData2.length}
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
          <h2 className="text-3xl font-bold mb-4 text-green-700">
            Explorer of Emotions 💚
          </h2>
          <p className="text-xl mb-4">
            You scored{" "}
            <span className="font-bold text-green-600">
              {userAnswers.reduce(
                (sum, ans, i) => sum + (ans === levelUpData2[i].answer ? 1 : 0),
                0
              )}
            </span>{" "}
            / {levelUpData2.length}
          </p>
          <button
  onClick={handleNextLevel}
  className="bg-green-200 hover:bg-green-300 text-green-900 font-semibold px-6 py-3 rounded-full shadow-md transition-all duration-300"
>
  Dive into empathy and relationships →
</button>

        </motion.div>
      )}
    </motion.div>
  );
}
