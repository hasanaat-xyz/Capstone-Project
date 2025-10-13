import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import QuizApp from "./QuizApp";
import LoginSignup from "./LoginSignup";
import LevelUpQuiz from "./LevelUpQuiz";

function App() {
  const [user, setUser] = useState(null);

  // ✅ Load user from localStorage when app loads
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  // ✅ Update both localStorage + state
  const handleLoginSignup = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);  // state updates immediately
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100">
        <Routes>
          <Route path="/" element={<QuizApp />} />
          <Route
            path="/login"
            element={<LoginSignup onSubmit={handleLoginSignup} />}
          />
          <Route
            path="/levelup"
            element={<LevelUpQuiz currentUser={user} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
