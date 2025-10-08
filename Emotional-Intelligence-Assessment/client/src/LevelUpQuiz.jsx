import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import levelUpData from "./levelUpData"; // ✅ import your data

export default function LevelUpQuiz({ currentUser }) {
  const navigate = useNavigate();
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [stage, setStage] = useState("quiz");

  const [questionTimes, setQuestionTimes] = useState([]); // ⏳ stores seconds per Q
  const [userAnswers, setUserAnswers] = useState([]);
  const [timeStart, setTimeStart] = useState(Date.now());

  // reset timer when question changes
  useEffect(() => {
    setTimeStart(Date.now());
  }, [currentQ]);

  const handleSelect = async (index) => {
    const timeSpent = Math.floor((Date.now() - timeStart) / 1000);

    // store time spent for this question
    setQuestionTimes((prev) => {
      const updated = [...prev];
      updated[currentQ] = timeSpent;
      return updated;
    });

    // store user answer
    setUserAnswers((prev) => {
      const updated = [...prev];
      updated[currentQ] = index;
      return updated;
    });

    // check answer
    if (index === levelUpData[currentQ].answer) {
      setScore((prev) => prev + 1);
    }

    // next question or finish
    if (currentQ + 1 < levelUpData.length) {
      setCurrentQ(currentQ + 1);
    } else {
      // ✅ auto-submit results to DB since we already have currentUser
      try {
        if (currentUser?._id) {
          await axios.post("http://localhost:5000/api/quiz/result", {
            userId: currentUser._id,
            score: score + (index === levelUpData[currentQ].answer ? 1 : 0), // include last Q score
            answers: [...userAnswers, index],
            total: levelUpData.length,
            timePerQuestion: [...questionTimes, timeSpent],
          });
        }
        setStage("result");
      } catch (err) {
        console.error(err);
        alert("❌ Could not save results.");
      }
    }
  };

  const handleNextLevel = () => {
    navigate("/levelup");
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-indigo-200 via-pink-200 to-purple-200 flex items-center justify-center">
      <div className="bg-white rounded-3xl shadow-2xl px-8 py-10 text-center w-full max-w-lg">
        {stage === "quiz" && (
          <>
            <h1 className="text-2xl font-extrabold text-gray-800 mb-3">
              Emotional Intelligence Gamified Assessment! 🎉
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
              🎉 Level Up!
            </h1>
            <p className="text-lg mb-4">
              Congrats!, you unlocked the second level 🚀
            </p>  
            <p className="text-gray-700 mb-4">
              You scored {score} out of {levelUpData.length}
            </p>
            <p className="text-gray-600 text-sm mb-6">
              {score === levelUpData.length
                ? "🌟 Amazing EQ! You nailed it!"
                : score > levelUpData.length / 2
                ? "👍 Great job, you’re emotionally aware!"
                : "🙂 Keep practicing empathy and self-awareness!"}
            </p>
            <div className="mt-6">
              <button
                onClick={handleNextLevel}
                className="bg-green-500 text-white px-6 py-2 rounded-xl hover:bg-green-600 transition"
              >
                Level-up your EI
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
