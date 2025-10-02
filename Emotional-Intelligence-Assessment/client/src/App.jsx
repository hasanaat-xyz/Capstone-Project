import { useState } from "react";
import quizData from "./quizData";
import "./index.css";

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const handleSelect = (index) => {
    if (index === quizData[currentQuestion].answer) {
      setScore(score + 1);
    }
    setTimeout(() => {
      if (currentQuestion < quizData.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setFinished(true);
      }
    }, 200);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setFinished(false);
  };

  const feedback =
    score === quizData.length
      ? "🌟 High EI! You’re emotionally smart!"
      : score >= 3
      ? "😎 Moderate EI! You’re doing great!"
      : "😂 Low EI! But at least you’re fun!";

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-300 via-pink-200 to-indigo-200">
      <div className="bg-white rounded-2xl shadow-xl p-6 text-center w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          EI Fun Quiz 🎉
        </h1>
        <p className="text-sm text-gray-500 mb-4">
          This game checks how well you recognize your emotions in real-life
          scenarios.
          <br />
          Be honest with your choices!
        </p>
        {!finished ? (
          <>
            <p className="text-lg font-medium text-gray-700 my-4">
              {quizData[currentQuestion].question}
            </p>
            <ul>
              {quizData[currentQuestion].options.map((option, index) => (
                <li
                  key={index}
                  className="bg-gray-100 hover:bg-indigo-100 text-gray-700 rounded-xl p-3 mb-3 cursor-pointer transition"
                  onClick={() => handleSelect(index)}
                >
                  {option}
                </li>
              ))}
            </ul>
            <p className="text-gray-500 mt-2">
              Question {currentQuestion + 1} / {quizData.length}
            </p>
          </>
        ) : (
          <>
            <p className="text-xl font-semibold mt-4 text-gray-800">
              You scored {score}/{quizData.length}. {feedback}
            </p>
            <button
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded-xl mt-4"
              onClick={restartQuiz}
            >
              Restart Quiz
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
