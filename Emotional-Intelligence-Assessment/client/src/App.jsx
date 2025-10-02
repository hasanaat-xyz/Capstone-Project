import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import QuizApp from "./QuizApp";
import LoginSignup from "./LoginSignup";
import LevelUpQuiz from "./LevelUpQuiz";

function App() {
  const [user, setUser] = useState(null);

  const handleLoginSignup = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100">
        <Routes>
          <Route path="/" element={<QuizApp />} />
          <Route path="/login" element={<LoginSignup onSubmit={handleLoginSignup} />} />
          <Route path="/levelup" element={<LevelUpQuiz user={user} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
