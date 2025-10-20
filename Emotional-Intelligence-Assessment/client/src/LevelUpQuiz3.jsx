import { useState, useEffect } from "react";
import axios from "axios";
import levelUpData3 from "./levelUpData3";

export default function LevelUpQuiz({ currentUser, level }) {

  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [questionTimes, setQuestionTimes] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [timeStart, setTimeStart] = useState(Date.now());

  // Reset timer on each question
  useEffect(() => setTimeStart(Date.now()), [currentQ]);

  const handleSelect = async (i) => {

    const timeSpent = Math.floor((Date.now() - timeStart) / 1000);
    setQuestionTimes((prev) => [...prev, timeSpent]);
    setUserAnswers((prev) => [...prev, i]);
    const isCorrect = i === levelUpData3[currentQ].answer;
    const newScore = score + (isCorrect ? 1 : 0);
    setScore(newScore);

    if (currentQ + 1 < levelUpData3.length) {

      setCurrentQ(currentQ + 1);
    } else {
      setFinished(true);
      // Save result
      try {
        if (currentUser?._id) {
          await axios.post("http://localhost:5000/api/quiz/result", {
            userId: currentUser._id,
            score: newScore,
            total: levelUpData3.length,
            answers: [...userAnswers, i],
            timePerQuestion: [...questionTimes, timeSpent],
            level: level || 3, // dynamic level, defaults to 3
          });
        }

      } catch (err) {
        console.error(err);
        alert("❌ Could not save final results to the database.");
      }
    }
  };
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#4c1d95] via-[#7e22ce] to-[#c084fc] flex items-center justify-center p-6">
      <div className="bg-white/15 backdrop-blur-2xl rounded-3xl shadow-[0_0_50px_rgba(168,85,247,0.4)] px-10 py-12 w-full max-w-xl border border-white/10 text-purple-50">
        {!finished ? (
          <>
            <h1 className="text-3xl font-extrabold text-white mb-4 text-center">
              🧩 Level {level || 3}: Master the 5 Pillars of EI
            </h1>
            <p className="text-sm text-purple-100 text-center mb-8">
              These are advanced, mind-twisting scenarios. Think carefully before answering!
            </p>


            <h2 className="text-lg font-medium text-center mb-8">
              {levelUpData3[currentQ].question}
            </h2>

            <div className="space-y-4">
              {levelUpData3[currentQ].options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  className="w-full py-3 bg-white/90 text-purple-900 font-semibold rounded-xl shadow-lg hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-500 hover:text-white transition-all duration-300"
                >
                  {opt}
                </button>
              ))}
            </div>

            <p className="text-xs text-purple-200 mt-6 text-center">
              Question {currentQ + 1} / {levelUpData3.length}
            </p>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4 text-white">
              🎯 Level {level || 3} Completed!
            </h2>
            <p className="text-lg mb-3">
              You scored <span className="font-bold">{score}</span> / {levelUpData3.length}
            </p>
            <p className="text-purple-100 mb-6">
              {score === levelUpData3.length
                ? "🌟 Genius! You’ve conquered the toughest EI challenges."
                : score > levelUpData3.length / 2
                ? "🔥 Impressive! You’re advancing toward mastery."
                : "⚡ Keep sharpening your awareness, mastery comes with practice."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
