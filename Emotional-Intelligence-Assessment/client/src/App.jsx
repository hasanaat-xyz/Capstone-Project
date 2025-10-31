import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import QuizApp from "./components/QuizApp"; // Level 1
import LoginSignup from "./LoginSignup";
import LevelUpQuiz from "./components/LevelUpQuiz"; // Level 2
import LevelUpQuiz3 from "./components/LevelUpQuiz3"; // Level 3
import LevelUpQuiz4 from "./components/LevelUpQuiz4"; // Level 4
import LandingPage from "./LandingPage";
import EQReport from "./components/EQReport"; // Final report

// Level data imports (optional, but not needed here)
import levelUpData from "./data/levelUpData";
import levelUpData3 from "./data/levelUpData3";
import levelUpData4 from "./data/levelUpData4";

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

          <Route
            path="/login"
            element={<LoginSignup onSubmit={handleLoginSignup} />}
          />

          {/* ✅ Level 1 */}
          <Route path="/level1" element={<QuizApp />} />

          {/* ✅ Level 2 */}
          <Route path="/level2" element={<LevelUpQuiz />} />

          {/* ✅ Level 3 */}
          <Route path="/level3" element={<LevelUpQuiz3 />} />

          {/* ✅ Level 4 */}
          <Route path="/level4" element={<LevelUpQuiz4 />} />

          {/* ✅ Final EQ Report */}
          <Route path="/eq-report" element={<EQReport />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
