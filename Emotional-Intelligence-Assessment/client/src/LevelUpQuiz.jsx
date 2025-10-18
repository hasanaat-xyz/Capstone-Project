import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import levelUpData from "./levelUpData";

export default function LevelUpQuiz({ currentUser }) {
  const navigate = useNavigate();
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [stage, setStage] = useState("quiz");

  const [questionTimes, setQuestionTimes] = useState([]); 
  const [userAnswers, setUserAnswers] = useState([]);
  const [timeStart, setTimeStart] = useState(Date.now());

  // ⏱ reset timer each time question changes
  useEffect(() => {
    setTimeStart(Date.now());
  }, [currentQ]);

  const handleSelect = async (index) => {
    const timeSpent = Math.floor((Date.now() - timeStart) / 1000);

    // store time for this question
    setQuestionTimes((prev) => {
      const updated = [...prev];
      updated[currentQ] = timeSpent;
      return updated;
    });

    // store user’s selected answer
    setUserAnswers((prev) => {
      const updated = [...prev];
      updated[currentQ] = index;
      return updated;
    });

    // check correctness
    const isCorrect = index === levelUpData[currentQ].answer;
    const newScore = score + (isCorrect ? 1 : 0);
    setScore(newScore);

    // move next or finish
    if (currentQ + 1 < levelUpData.length) {
      setCurrentQ(currentQ + 1);
    } else {
      try {
        if (currentUser?._id) {
          // ✅ store Level 2 results + timePerQuestion
          await axios.post("http://localhost:5000/api/quiz/result", {
            userId: currentUser._id,
            score: newScore,
            total: levelUpData.length,
            answers: [...userAnswers, index],
            timePerQuestion: [...questionTimes, timeSpent],
            level: 2, // ✅ clearly marked
          });
        }
        setStage("result");
      } catch (err) {
        console.error(err);
        alert("❌ Could not save results to the database.");
      }
    }
  };

  const handleNextLevel = () => navigate("/levelup");

  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-indigo-200 via-pink-200 to-purple-200 flex items-center justify-center">
      <div className="bg-white rounded-3xl shadow-2xl px-8 py-10 text-center w-full max-w-lg">
        {stage === "quiz" && (
          <>
            <h1 className="text-2xl font-extrabold text-gray-800 mb-3">
              Emotional Intelligence Gamified Assessment — LEVEL 2 🎯
            </h1>

            <h2 className="text-lg font-semibold text-gray-700 mb-6">
              {levelUpData[currentQ].question}
            </h2>

            <div className="space-y-3">
              {levelUpData[currentQ].options.map((option, i) => (
                <button
                  key={i}
                  onClick={() => handleSelect(i)}
                  className="w-full py-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                >
                  {option}
                </button>
              ))}
            </div>

            <p className="text-xs text-gray-500 mt-6">
              Question {currentQ + 1} / {levelUpData.length}
            </p>
          </>
        )}

        {stage === "result" && (
          <motion.div
            className="text-center bg-white p-10 rounded-3xl shadow-2xl"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h1 className="text-4xl font-bold mb-4 text-green-600">
              🎉 Level 2 Complete!
            </h1>
            <p className="text-lg mb-4">Awesome! You’ve finished Level 2 🚀</p>
            <p className="text-gray-700 mb-4">
              You scored {score} out of {levelUpData.length}
            </p>
            <p className="text-gray-600 text-sm mb-6">
              {score === levelUpData.length
                ? "🌟 Incredible emotional awareness!"
                : score > levelUpData.length / 2
                ? "👍 Great emotional understanding!"
                : "🙂 Keep practicing empathy and reflection!"}
            </p>

            <button
              onClick={handleNextLevel}
              className="bg-green-500 text-white px-6 py-2 rounded-xl hover:bg-green-600 transition"
            >
              Continue your EI Journey 💪
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
