import { useState } from "react";
import axios from "axios";

export default function LoginSignup({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );

      console.log("✅ User registered:", data);


      onSubmit(data.user); // pass saved user (with _id from DB)

    } catch (err) {
      console.error("❌ Registration error:", err);
      setError(
        err.response?.data?.message || "Something went wrong. Try again!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8 w-96">
      <h2 className="text-2xl font-bold text-center mb-6">Sign In to Continue</h2>

      {error && (
        <p className="text-red-500 text-sm text-center mb-3">{error}</p>
      )}

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
