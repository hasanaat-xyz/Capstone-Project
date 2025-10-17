import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function LoginSignup({ onSubmit, score, timePerQuestion }) {

  const navigate = useNavigate();
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
      // Register the user
      const { data } = await axios.post("http://localhost:5000/api/auth/register", formData);
      const loggedInUser = data.user || data;
      setUser(loggedInUser);
      onSubmit(loggedInUser);

      // Submit quiz result for this user
      await axios.post("http://localhost:5000/api/quiz/result", {
        userId: loggedInUser._id || loggedInUser.id,
        score,
        total: 5,
        timePerQuestion,
      });

    } catch (err) {
      console.error("Registration/quiz submit error:", err);
      setError(err.response?.data?.msg || "Something went wrong. Try again!");
    } finally {
      setLoading(false);
    }
  };

  if (user) {
    return (
      <motion.div
        className="text-center bg-white p-10 rounded-3xl shadow-2xl"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1 className="text-4xl font-bold mb-4 text-green-600">🎉 Level Up!</h1>
        <p className="text-lg mb-4">
          Congrats {user.name || "User"}, you unlocked Level 1 🚀
        </p>
        <p className="text-gray-700 mb-4">You scored {score} out of 5</p>
        <p className="text-gray-600 text-sm mb-6">
          {score === 5
            ? "🌟 Amazing EQ! You nailed it!"
            : score >= 3
            ? "👍 Great job, you’re emotionally aware!"
            : "🙂 Keep practicing empathy and self-awareness!"}
        </p>
        <div className="mt-6">
          <button

            onClick={() => navigate("/levelup", { state: { currentUser: user } })}
            className="bg-green-500 text-white px-6 py-2 rounded-xl hover:bg-green-600 transition"
          >
            Level-up your EI
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8 w-96">
      <h2 className="text-2xl font-bold text-center mb-6">Sign In to View Your Score</h2>
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
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
