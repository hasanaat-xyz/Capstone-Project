import { useState, useEffect } from "react";
import levelUpData from "./levelUpData";

export default function LevelUpQuiz() {
  const [currentQ, setCurrentQ] = useState(0);  
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const [questionTimes, setQuestionTimes] = useState([]); 
  const [timeStart, setTimeStart] = useState(Date.now());

  // Reset start time whenever the question changes
  useEffect(() => {
    setTimeStart(Date.now());
  }, [currentQ]);

  const handleSelect = (i) => {
    // calculate time spent on current question
    const timeSpent = Math.floor((Date.now() - timeStart) / 1000); 
    setQuestionTimes((prev) => {
      const newTimes = [...prev];
      newTimes[currentQ] = timeSpent;
      return newTimes;
    });

    // check answer
    if (i === levelUpData[currentQ].answer) {
      setScore(score + 1);
    }
    
    if (currentQ + 1 < levelUpData.length) {
      setCurrentQ(currentQ + 1);
    } else {
      setFinished(true);

      // Save results to DB
      saveResultsToDB();
    }
  };

  const saveResultsToDB
   = async () => {
    try {
      await post("http://localhost:5000/api/quizResults", {
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          score,
          questionTimes,
          date: new Date(),
          // include userId if available (e.g. from auth context)
          userId: "64fbd1e9c9a12345abc6789", 
        }),
      });
      
    } catch (err) {
      console.error("Error saving results:", err);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-yellow-200 via-pink-200 to-red-200 flex items-center justify-center">
      <div className="bg-white rounded-3xl shadow-2xl px-8 py-10 text-center w-full max-w-lg">
        {!finished ? (
          <>
            <h1 className="text-3xl font-extrabold text-gray-800 mb-3">
              🚀 Level Up: Advanced EI Quiz
            </h1>
            <p className="text-sm text-gray-600 mb-6">
              This round dives deeper into the 5 pillars of Emotional
              Intelligence. Answer wisely!
            </p>

            <h2 className="text-lg font-semibold text-gray-700 mb-6">
              {levelUpData[currentQ].question}
            </h2>

            <div className="space-y-3">
              {levelUpData[currentQ].options.map((opt, i) => (
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
              Question {currentQ + 1} / {levelUpData.length}
            </p>
          </>
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              🎉 Level 2 Finished!
            </h2>
            <p className="text-gray-700 mb-4">
              You scored {score} out of {levelUpData.length}
            </p>

            <p className="text-gray-600 text-sm">
              {score === levelUpData.length
                ? "🌟 Incredible! You’ve mastered advanced EI."
                : score > levelUpData.length / 2
                ? "👏 Solid! You’re leveling up your EQ!"
                : "💡 Keep practicing. Emotional mastery takes time."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
