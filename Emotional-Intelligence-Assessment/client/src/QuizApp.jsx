import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import LoginSignup from "./LoginSignup";

const quizData = [
  {
    question:
      "1. Your friend is upset because their project failed. What’s your BEST first response?",
    options: [
      "Chill, it’s not a big deal.",
      "I told you this would happen.",
      "That sucks… want to talk about it?",
      "Let’s watch memes and forget this.",
    ],
    answer: 2,
  },
  {
    question:
      "2. You’re super stressed but someone cuts in line at the café. What do you do?",
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
  const [stage, setStage] = useState("quiz"); 
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [questionTimes, setQuestionTimes] = useState([]);
  const [timeStart, setTimeStart] = useState(Date.now());
  const [user, setUser] = useState(null);

  useEffect(() => setTimeStart(Date.now()), [currentQuestion]);

  const handleSelect = (index) => {
    const timeSpent = Math.floor((Date.now() - timeStart) / 1000);
    setQuestionTimes((prev) => [...prev, timeSpent]);

    const isCorrect = index === quizData[currentQuestion].answer;
    setScore((prev) => prev + (isCorrect ? 1 : 0));

    if (currentQuestion + 1 < quizData.length) setCurrentQuestion(currentQuestion + 1);
    else setStage("login");
  };

  const handleUserLogin = (loggedInUser) => setUser(loggedInUser);

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-[#c084fc] via-[#e0aaff] to-[#f3e8ff] flex items-center justify-center p-6 overflow-hidden">
      {/* Floating shapes */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-purple-300/40 rounded-full filter blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-48 h-48 bg-pink-300/30 rounded-full filter blur-2xl animate-pulse"></div>

      <motion.div 
        className="relative bg-gradient-to-br from-[#9d4edd]/70 via-[#c084fc]/60 to-[#e9d5ff]/60 backdrop-blur-lg rounded-3xl shadow-2xl px-10 py-12 w-full max-w-lg text-purple-900"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {stage === "quiz" && (
          <>
            <h1 className="text-3xl font-extrabold mb-4 text-white drop-shadow-lg">
              🎮 Emotional Intelligence Quiz
            </h1>
            <motion.h2 
              key={currentQuestion}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-lg font-medium mb-8 text-purple-50 drop-shadow-sm"
            >
              {quizData[currentQuestion].question}
            </motion.h2>
            <div className="space-y-4">
              {quizData[currentQuestion].options.map((option, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleSelect(index)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-3 bg-white bg-opacity-90 text-purple-800 font-semibold rounded-xl shadow-lg hover:bg-opacity-100 transition transform duration-200"
                >
                  {option}
                </motion.button>
              ))}
            </div>
            <p className="text-sm text-purple-100 mt-6">
              Question {currentQuestion + 1} / {quizData.length}
            </p>
          </>
        )}

        {stage === "login" && (
          <LoginSignup
            onSubmit={handleUserLogin}
            score={score}
            timePerQuestion={questionTimes}
          />
        )}
      </motion.div>
    </div>
  );
}
