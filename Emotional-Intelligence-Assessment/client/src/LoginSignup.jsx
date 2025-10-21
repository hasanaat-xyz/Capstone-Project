import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";

export default function LoginSignup() {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Get quiz result data from Level 1 redirect
  const quizData = location.state || {}; // { score, total, times, level }
  const { score = 0, total = 5 } = quizData;

  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!formData.name || !formData.email || !formData.password) {
      setError("⚠️ Please fill all fields");
      setLoading(false);
      return;
    }

    try {
      // ✅ Register or login user
      const { data } = await axios.post("http://localhost:5000/api/auth/register", formData);
      const loggedInUser = data.user || data;
      setUser(loggedInUser);

      // ✅ Store quiz result for this user
      if (quizData && score) {
        await axios.post("http://localhost:5000/api/auth/result", {
          userId: loggedInUser._id || loggedInUser.id,
          score,
          total,
          level: 1,
        });
      }
    } catch (err) {
      console.error("Registration/quiz submit error:", err);
      setError(err.response?.data?.msg || "Something went wrong. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {user ? (
        <motion.div
          className="text-center bg-white p-10 rounded-3xl shadow-2xl"
          initial={{ opacity: 0, y: -50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1 className="text-4xl font-bold mb-4 text-green-600">🎉 Level 1 Complete!</h1>
          <p className="text-gray-700 mb-6">You scored {score} out of {total}</p>
          <button
            onClick={() => navigate("/level2", { state: { currentUser: user } })}
            className="bg-green-500 text-white px-6 py-2 rounded-xl hover:bg-green-600 transition"
          >
            Next Level →
          </button>
        </motion.div>
      ) : (
        <motion.div
          className="bg-white rounded-3xl shadow-lg p-8 w-96"
          initial={{ opacity: 0, y: -50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-2xl font-bold text-center mb-6">Login / Signup</h2>
          {error && <p className="text-red-500 text-sm text-center mb-3">{error}</p>}

          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="border rounded-lg p-2 focus:outline-indigo-500"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="border rounded-lg p-2 focus:outline-indigo-500"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="border rounded-lg p-2 focus:outline-indigo-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 text-white py-2 rounded-xl hover:bg-indigo-700 disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Continue →"}
            </button>
          </form>
        </motion.div>
      )}
    </div>
  );
}
