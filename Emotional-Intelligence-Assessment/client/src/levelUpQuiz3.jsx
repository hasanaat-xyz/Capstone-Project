import { useState } from "react";
import levelUpData3 from "./levelUpData3";

export default function LevelUpQuiz3() {

  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleSelect = (i) => {
    if (i === levelUpData3[currentQ].answer) setScore(score + 1);
    if (currentQ + 1 < levelUpData3.length) {
      setCurrentQ(currentQ + 1);
    } else {
      setFinished(true);
    }
  };
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200 flex items-center justify-center">
      <div className="bg-white rounded-3xl shadow-2xl px-8 py-10 text-center w-full max-w-lg">
        {!finished ? (
          <>
            <h1 className="text-3xl font-extrabold text-gray-800 mb-3">
              🧩 Level 3: Master the 5 Pillars of EI
            </h1>
            <p className="text-sm text-gray-600 mb-6">
        These are advanced, mind-twisting scenarios. Think carefully before you answer!
            </p>
            <h2 className="text-lg font-semibold text-gray-700 mb-6">
              {levelUpData3[currentQ].question}
            </h2>
            
            <div className="space-y-3">
              {levelUpData3[currentQ].options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleSelect(i)}
                  className="w-full py-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                >
               {opt}
                </button>
              ))}
            </div>

            <p className="text-xs text-gray-500 mt-6">
              Question {currentQ + 1} / {levelUpData3.length}
            </p>
          </>
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              🎯 Level 3 Completed!
            </h2>
            <p className="text-gray-700 mb-4">
              You scored {score} out of {levelUpData3.length}
            </p>
            <p className="text-gray-600 text-sm">
              {score === levelUpData3.length
                ? "🌟 Genius! You’ve conquered the toughest EI challenges."
                : score > levelUpData3.length / 2
                ? "🔥 Impressive! You’re advancing toward mastery."
                : "⚡ Keep sharpening your awareness. Mastery comes with practice."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}