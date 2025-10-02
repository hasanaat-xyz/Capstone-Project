import { useState } from "react";

export default function LoginSignup({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) return alert("Fill all fields");
    onSubmit(formData);
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8 w-96">
      <h2 className="text-2xl font-bold text-center mb-6">Login / Sign Up</h2>
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
          className="bg-indigo-600 text-white py-2 rounded-xl hover:bg-indigo-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
