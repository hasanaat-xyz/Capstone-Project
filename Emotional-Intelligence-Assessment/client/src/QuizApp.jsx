import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import LoginSignup from "./LoginSignup";

export default function LevelUpQuiz({ quizData, currentUser, level }) {
  const [stage, setStage] = useState("quiz");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [questionTimes, setQuestionTimes] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [timeStart, setTimeStart] = useState(Date.now());

  // Reset timer on each question
  useEffect(() => setTimeStart(Date.now()), [currentQuestion]);

  const handleSelect = (index) => {
    const timeSpent = Math.floor((Date.now() - timeStart) / 1000);
    setQuestionTimes((prev) => [...prev, timeSpent]);
    setUserAnswers((prev) => [...prev, index]);

    const isCorrect = index === quizData[currentQuestion].answer;
    setScore((prev) => prev + (isCorrect ? 1 : 0));

    if (currentQuestion + 1 < quizData.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setStage("login");
    }
  };

  const handleUserLogin = (loggedInUser) => {
    if (loggedInUser?._id) {
      // Optionally save Level 1 results here
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-[#7c3aed] via-[#9333ea] to-[#c084fc] flex items-center justify-center overflow-hidden p-6">
      {/* Floating glow elements */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-400/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 bg-pink-500/30 rounded-full blur-3xl animate-ping"></div>
      <div className="absolute top-[30%] right-[30%] w-48 h-48 bg-indigo-400/20 rounded-full blur-2xl animate-bounce"></div>

      <motion.div
        className="relative bg-white/20 backdrop-blur-xl rounded-3xl shadow-[0_0_50px_rgba(157,78,221,0.35)] px-10 py-12 w-full max-w-lg text-purple-900 border border-white/20"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {stage === "quiz" && (
          <>
            <motion.h1
              className="text-3xl font-extrabold mb-6 text-white text-center drop-shadow-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              🌈 Level {level || 1}: Emotional Intelligence Quiz
            </motion.h1>

            <motion.h2
              key={currentQuestion}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-lg font-medium mb-8 text-purple-50 text-center leading-relaxed"
            >
              {quizData[currentQuestion].question}
            </motion.h2>

            <div className="space-y-4">
              {quizData[currentQuestion].options.map((option, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(255,255,255,0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-3 bg-white/90 text-purple-900 font-semibold rounded-xl shadow-md hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-400 hover:text-white transition-all duration-300"
                >
                  {option}
                </motion.button>
              ))}
            </div>

            {/* Progress Bar */}
            <div className="mt-8">
              <p className="text-sm text-purple-100 text-center mb-2">
                Question {currentQuestion + 1} of {quizData.length}
              </p>
              <div className="w-full bg-purple-200 rounded-full h-2 overflow-hidden">
                <motion.div
                  className="bg-gradient-to-r from-purple-600 to-pink-400 h-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentQuestion + 1) / quizData.length) * 100}%` }}
                  transition={{ duration: 0.6 }}
                ></motion.div>
              </div>
            </div>

            <p className="text-xs text-purple-100 mt-3 text-center italic">
              “Every answer helps you understand yourself better 💫”
            </p>
          </>
        )}

        {stage === "login" && (
          <LoginSignup
            onSubmit={handleUserLogin}
            score={score}
            timePerQuestion={questionTimes}
            level={level || 1}
          />
        )}
      </motion.div>
    </div>
  );
}
