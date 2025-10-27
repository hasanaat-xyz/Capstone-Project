import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import quizData from "../data/levelUpData"; // Level 1 questions

export default function Level1Quiz({ currentUser, onComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [questionTimes, setQuestionTimes] = useState([]);
  const [startTime, setStartTime] = useState(Date.now());

  const navigate = useNavigate();

  const handleSelect = async (index) => {
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    const newAnswers = [...userAnswers, index];
    const newTimes = [...questionTimes, timeSpent];
    const nextQuestion = currentQuestion + 1;

    if (nextQuestion === quizData.length) {
      const totalScore = newAnswers.reduce(
        (sum, ans, i) => sum + (ans === quizData[i].answer ? 1 : 0),
        0
      );

      try {
        // ✅ Updated backend-compatible payload
        await axios.post("http://localhost:5000/api/quiz/result", {
          userId: currentUser?._id || null,
          level: 1,
          userAnswers: newAnswers,
          timePerQuestion: newTimes,
          quizQuestions: quizData.map((q) => ({
            question: q.question,
            options: q.options,
            correctIndex: q.answer,
          })),
        });
        console.log("Level 1 result saved ✅");
      } catch (err) {
        console.error("Error saving Level 1 result:", err);
      }

      if (typeof onComplete === "function") {
        onComplete({
          score: totalScore,
          total: quizData.length,
          questions: quizData.map((q, i) => ({
            questionText: q.question,
            chosenAnswer: q.options[newAnswers[i]],
            score: newAnswers[i] === q.answer ? 1 : 0,
            timeSpent: newTimes[i],
          })),
          level: 1,
        });
      }

      navigate("/level2", {
        state: {
          currentUser,
          level1Results: {
            score: totalScore,
            total: quizData.length,
            questions: quizData.map((q, i) => ({
              questionText: q.question,
              chosenAnswer: q.options[newAnswers[i]],
              score: newAnswers[i] === q.answer ? 1 : 0,
              timeSpent: newTimes[i],
            })),
            level: 1,
          },
        },
      });
    } else {
      setUserAnswers(newAnswers);
      setQuestionTimes(newTimes);
      setCurrentQuestion(nextQuestion);
      setStartTime(Date.now());
    }
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-700 to-indigo-600 text-white p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold mb-6">Level 1: Self-Awareness 🧠</h2>

      <div className="bg-white/20 p-6 rounded-xl shadow-lg w-full max-w-lg">
        <h3 className="text-lg mb-4">{quizData[currentQuestion].question}</h3>
        <div className="flex flex-col space-y-3">
          {quizData[currentQuestion].options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              className="bg-white/20 hover:bg-white/30 py-2 rounded-lg transition-all"
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-6 text-sm opacity-80">
        Question {currentQuestion + 1} of {quizData.length}
      </p>
    </motion.div>
  );
}
