import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginSignup from "./LoginSignup";


// Sample quiz data
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
  const [stage, setStage] = useState("quiz"); // quiz → login → result
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [questionTimes, setQuestionTimes] = useState([]);
  const [timeStart, setTimeStart] = useState(Date.now());
  const [user, setUser] = useState(null);

  // Start timer on each question
  useEffect(() => {
    setTimeStart(Date.now());
  }, [currentQuestion]);

  // Handle answer selection
  const handleSelect = (index) => {
    const timeSpent = Math.floor((Date.now() - timeStart) / 1000);

    setQuestionTimes((prev) => [...prev, timeSpent]);

    const isCorrect = index === quizData[currentQuestion].answer;
    setScore((prev) => prev + (isCorrect ? 1 : 0));

    if (currentQuestion + 1 < quizData.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Quiz finished → move to login/signup stage
      setStage("login");
    }
  };

  // Called when user completes login/signup
  const handleUserLogin = (loggedInUser) => {
    setUser(loggedInUser);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-indigo-200 via-pink-200 to-purple-200 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl px-8 py-10 text-center w-full max-w-lg">
        {/* Quiz Stage */}
        {stage === "quiz" && (
          <>
            <h1 className="text-2xl font-extrabold text-gray-800 mb-3">
              Emotional Intelligence Gamified Assessment! 🎉
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

        {/* Login/Signup Stage */}
        {stage === "login" && (
          <LoginSignup
            onSubmit={handleUserLogin}
            score={score}
            timePerQuestion={questionTimes}
          />
        )}

        {/* Level-up stage will be handled inside LoginSignup */}
      </div>
    </div>
  );
}
