import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import LoginSignup from "./LoginSignup";

const quizData = [ /* your quiz data here */ ];

export default function QuizApp() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [stage, setStage] = useState("quiz"); 
  const [user, setUser] = useState(null);

  const [questionTimes, setQuestionTimes] = useState([]); // store time spent per Q
  const [timeStart, setTimeStart] = useState(Date.now()); // track when Q started

  useEffect(() => {
    // reset start time whenever question changes
    setTimeStart(Date.now());
  }, [currentQuestion]);

  const handleSelect = (index) => {
    const timeSpent = Math.floor((Date.now() - timeStart) / 1000); // in seconds
    setQuestionTimes((prev) => {
      const newTimes = [...prev];
      newTimes[currentQuestion] = timeSpent;
      return newTimes;
    });

    if (index === quizData[currentQuestion].answer) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < quizData.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setStage("login");
    }
  };

  const handleLoginSubmit = (formData) => {
    setUser(formData);
    setStage("result");
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
              Emotional Intelligence Gamified Assessment!🎉
            </h1>
            <h2 className="text-lg font-semibold text-gray-700 mb-6">
              {quizData[currentQuestion].question}
            </h2>

            <div className="space-y-3">
              {quizData[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleSelect(index)}
                  className="w-full py-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                >
                  {option}
                </button>
              ))}
            </div>

            <p className="text-xs text-gray-500 mt-6">
              Question {currentQuestion + 1} / {quizData.length}
            </p>
          </>
        )}

        {stage === "login" && <LoginSignup onSubmit={handleLoginSubmit} />}

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
              Congrats {user?.name}, you unlocked the first level 🚀
            </p>
            <p className="text-gray-700 mb-4">
              You scored {score} out of {quizData.length}
            </p>

            {/* Show time spent per question */}
            <div className="text-left mb-6">
              <h2 className="font-semibold mb-2">⏱️ Time spent per question:</h2>
              <ul className="list-disc pl-6 text-gray-600">
                {questionTimes.map((t, i) => (
                  <li key={i}>
                    Q{i + 1}: {t} sec
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-gray-600 text-sm mb-6">
              {score === quizData.length
                ? "🌟 Amazing EQ! You nailed it!"
                : score > quizData.length / 2
                ? "👍 Great job, you’re emotionally aware!"
                : "🙂 Keep practicing empathy and self-awareness!"}
            </p>
            <div className="mt-6">
              <button 
                onClick={handleNextLevel}
                className="bg-green-500 text-white px-6 py-2 rounded-xl hover:bg-green-600 transition">
                Level-up your EI
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
