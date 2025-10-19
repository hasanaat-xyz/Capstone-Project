import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import QuizApp from "./QuizApp";              // Level 1
import LoginSignup from "./LoginSignup";
import LevelUpQuiz from "./LevelUpQuiz";      // Level 2
import LandingPage from "./LandingPage";
import LevelUpQuiz3 from "./levelUpQuiz3";    // ✅ Capitalized properly

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLoginSignup = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginSignup onSubmit={handleLoginSignup} />} />

          {/* ✅ Correct level order */}
          <Route path="/level1" element={<QuizApp />} />
          <Route path="/level2" element={<LevelUpQuiz currentUser={user} />} />
          <Route path="/level3" element={<LevelUpQuiz3 />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
