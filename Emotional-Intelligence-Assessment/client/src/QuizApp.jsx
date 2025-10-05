import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import LoginSignup from "./LoginSignup";
import axios from "axios";

const quizData = [
  {
    question: "1. Your friend is upset because their project failed. What’s your BEST first response?",
    options: [
      "Chill, it’s not a big deal.",
      "I told you this would happen.",
      "That sucks… want to talk about it?",
      "Let’s watch memes and forget this.",
    ],
    answer: 2,
  },
  {
    question: "2. You’re super stressed but someone cuts in line at the café. What do you do?",
    options: [
      "Politely say, 'Excuse me, I was here first.'",
      "Explode like the Hulk.",
      "Say nothing but give death stares.",
      "Leave the café and cry in the washroom.",
    ],
    answer: 0,
  },
  {
    question: "3. Your teammate made a mistake. What’s your reaction?",
    options: [
      "Publicly shame them.",
      "Take all the blame yourself.",
      "Talk privately and find solutions.",
      "Pretend it didn’t happen.",
    ],
    answer: 2,
  },
  {
    question: "4. What do you usually notice first in a conversation?",
    options: [
      "The person’s tone of voice.",
      "Their exact words only.",
      "What’s on their phone screen.",
      "How fast you can escape.",
    ],
    answer: 0,
  },
  {
    question: "5. When you’re sad, what’s your go-to coping style?",
    options: [
      "Eat ice cream.",
      "Journal/write thoughts down.",
      "Spam reels until 3am.",
      "Pretend everything’s fine (but it’s not).",
    ],
    answer: 1,
  },
];

export default function QuizApp() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [stage, setStage] = useState("quiz");
  const [user, setUser] = useState(null);

  const [questionTimes, setQuestionTimes] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [timeStart, setTimeStart] = useState(Date.now());

  useEffect(() => {
    setTimeStart(Date.now());
  }, [currentQuestion]);

  const handleSelect = (index) => {
    const timeSpent = Math.floor((Date.now() - timeStart) / 1000);

    setQuestionTimes((prev) => {
      const newTimes = [...prev];
      newTimes[currentQuestion] = timeSpent;
      return newTimes;
    });

    setUserAnswers((prev) => {
      const newAnswers = [...prev];
      newAnswers[currentQuestion] = index;
      return newAnswers;
    });

    if (index === quizData[currentQuestion].answer) {
      setScore((prev) => prev + 1);
    }

    if (currentQuestion + 1 < quizData.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setStage("login");
    }
  };
 const handleLoginSubmit = async (formData) => {
  try {
    const response = await axios.post("http://localhost:5000/api/auth/login", formData);
    const currentUser = response.data.user;
    setUser(currentUser);
await axios.post("http://localhost:5000/api/quiz/result", {
      userId: currentUser._id,
      score: score,
      answers: userAnswers,
      total: quizData.length,
      timePerQuestion: questionTimes,
    });
    
    setStage("result");
  } catch (error) {
    console.error(error);
    alert("Login or result submission failed.");
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
            <h1 className="text-4xl font-bold mb-4 text-green-600">🎉 Level Up!</h1>
            <p className="text-lg mb-4">Congrats {user?.name}, you unlocked the first level 🚀</p>
            <p className="text-gray-700 mb-4">
              You scored {score} out of {quizData.length}
            </p>
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
