import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import levelUpData from "./levelUpData";

export default function LevelUpQuiz({ currentUser, level }) {
  const navigate = useNavigate();
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [stage, setStage] = useState("quiz");
  const [questionTimes, setQuestionTimes] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [timeStart, setTimeStart] = useState(Date.now());

  useEffect(() => setTimeStart(Date.now()), [currentQ]);

  const handleSelect = async (index) => {
    const timeSpent = Math.floor((Date.now() - timeStart) / 1000);
    setQuestionTimes((prev) => [...prev, timeSpent]);
    setUserAnswers((prev) => [...prev, index]);

    const isCorrect = index === levelUpData[currentQ].answer;
    const newScore = score + (isCorrect ? 1 : 0);
    setScore(newScore);

    if (currentQ + 1 < levelUpData.length) {
      setCurrentQ(currentQ + 1);
    } else {
      // Quiz finished, save result
      try {
        if (currentUser?._id) {
          await axios.post("http://localhost:5000/api/quiz/result", {
            userId: currentUser._id,
            score: newScore,
            total: levelUpData.length,
            answers: [...userAnswers, index],
            timePerQuestion: [...questionTimes, timeSpent],
            level: level,
          });
        }
        setStage("result");
      } catch (err) {
        console.error(err);
        alert("❌ Could not save results to the database.");
      }
    }
  };

  const handleNextLevel = () => {
    if (level === 2) navigate("/level3");
    else navigate("/"); // fallback or dynamic
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#7e22ce] via-[#9d4edd] to-[#c084fc] overflow-hidden p-6">
      {/* ✨ Floating glow shapes */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-[-5%] right-[-10%] w-80 h-80 bg-pink-400/30 rounded-full blur-3xl animate-ping"></div>
      <div className="absolute top-[40%] right-[30%] w-48 h-48 bg-indigo-400/20 rounded-full blur-2xl animate-bounce"></div>

      <motion.div
        className="relative bg-white/15 backdrop-blur-2xl rounded-3xl shadow-[0_0_50px_rgba(168,85,247,0.4)] px-10 py-12 w-full max-w-xl border border-white/10 text-purple-50"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {stage === "quiz" && (
          <>
            <h1 className="text-3xl font-extrabold mb-6 text-white text-center drop-shadow-lg">
              ⚡ Level 2 {level}: Emotional Intelligence Challenge
            </h1>

            <motion.h2
              key={currentQ}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-lg font-medium mb-8 text-purple-100 text-center leading-relaxed"
            >
              {levelUpData[currentQ].question}
            </motion.h2>

            <div className="space-y-4">
              {levelUpData[currentQ].options.map((option, i) => (
                <motion.button
                  key={i}
                  onClick={() => handleSelect(i)}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 20px rgba(255,255,255,0.5)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-3 bg-white/90 text-purple-900 font-semibold rounded-xl shadow-lg hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-400 hover:text-white transition-all duration-300"
                >
                  {option}
                </motion.button>
              ))}
            </div>

            <div className="mt-8">
              <p className="text-sm text-purple-100 text-center mb-2">
                Question {currentQ + 1} of {levelUpData.length}
              </p>
              <div className="w-full bg-purple-200 rounded-full h-2 overflow-hidden">
                <motion.div
                  className="bg-gradient-to-r from-purple-600 to-pink-400 h-full"
                  initial={{ width: 0 }}
                  animate={{
                    width: `${((currentQ + 1) / levelUpData.length) * 100}%`,
                  }}
                  transition={{ duration: 0.5 }}
                ></motion.div>
              </div>
            </div>

            <p className="text-xs text-purple-100 mt-3 text-center italic">
              “Your emotional awareness is leveling up ✨”
            </p>
          </>
        )}

        {stage === "result" && (
          <motion.div
            className="text-center p-8 rounded-2xl bg-white/10 backdrop-blur-xl shadow-2xl border border-white/20"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold mb-4 text-white">
              🎉 Level {level} Complete!
            </h1>
            <p className="text-lg mb-3">
              You scored <span className="font-bold">{score}</span> / {levelUpData.length}
            </p>
            <p className="text-purple-100 mb-6">
              {score === levelUpData.length
                ? "🌟 Perfect emotional balance!"
                : score > levelUpData.length / 2
                ? "✨ Great emotional insight, keep going!"
                : "💭 Keep exploring your empathy and awareness!"}
            </p>

            <motion.button
              onClick={handleNextLevel}
              whileHover={{
                scale: 1.1,
                boxShadow: "0 0 25px rgba(255,255,255,0.5)",
              }}
              className="bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300"
            >
              Continue 💪
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}