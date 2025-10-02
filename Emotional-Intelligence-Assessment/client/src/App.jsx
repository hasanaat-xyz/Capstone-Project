import { useState } from "react";
import QuizApp from "./QuizApp";
import LoginSignup from "./LoginSignup";
// import LevelUp from "./LevelUp";

function App() {
  const [step, setStep] = useState("quiz"); // quiz → login → levelup
  const [user, setUser] = useState(null);

  const handleQuizFinish = () => {
    setStep("login");
  };

  const handleLoginSignup = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    setStep("levelup");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100">
      {step === "quiz" && <QuizApp onFinish={handleQuizFinish} />}
      {step === "login" && <LoginSignup onSubmit={handleLoginSignup} />}
      {step === "levelup" && <LevelUp user={user} />}
    </div>
  );
}

export default App;
