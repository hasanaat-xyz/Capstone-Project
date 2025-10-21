import { useLocation } from "react-router-dom";

export default function EQReport() {
  const { state: results } = useLocation();

  if (!results) {
    return <p className="p-6 text-red-500"> No results found. Please complete the quiz first.</p>;
  }

  const levelScores = [
    results.level1?.score || 0,
    results.level2?.score || 0,
    results.level3?.score || 0,
  ];

  const levelTotals = [
    results.level1?.total || 5,
    results.level2?.total || 5,
    results.level3?.total || 5,
  ];

  const totalScore = levelScores.reduce((a, b) => a + b, 0);
  const maxScore = levelTotals.reduce((a, b) => a + b, 0);
  const percentage = Math.round((totalScore / maxScore) * 100);

  let rating = "";
  if (percentage >= 80) rating = "High EQ 🌟";
  else if (percentage >= 50) rating = "Moderate EQ 🙂";
  else rating = "Low EQ 😔";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-700 to-pink-500 p-6 text-white">
      <h1 className="text-4xl font-bold mb-6">🎯 Your EQ Report</h1>
      <p className="text-xl mb-2">
        Total Score: <span className="font-bold">{totalScore}</span> / {maxScore}
      </p>
      <p className="text-xl mb-4">Percentage: {percentage}%</p>
      <p className="text-2xl font-semibold mb-6">Rating: {rating}</p>

      <div className="bg-white/20 p-6 rounded-xl shadow-lg w-full max-w-md">
        {["level1", "level2", "level3"].map((lvl, idx) => (
          <div key={idx} className="mb-4">
            <h2 className="font-bold text-lg mb-1">Level {idx + 1}</h2>
            <p>Score: {results[lvl]?.score} / {results[lvl]?.total}</p>
            <p>Time per question: {results[lvl]?.times?.join("s, ")}s</p>
            <p>Answers: {results[lvl]?.answers?.join(", ")}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
