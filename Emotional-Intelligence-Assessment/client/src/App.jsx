import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import QuizApp from "./QuizApp";
import LoginSignup from "./LoginSignup";
import LevelUpQuiz from "./LevelUpQuiz";
import LandingPage from "./LandingPage";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
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
          <Route path="/levelup" element={<LevelUpQuiz currentUser={user} />} />
          <Route path="/assessment" element={<QuizApp />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
