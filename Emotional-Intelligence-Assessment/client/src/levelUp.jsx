import { motion } from "framer-motion";

export default function LevelUp({ user }) {
  return (
    <motion.div
      className="text-center bg-white p-10 rounded-3xl shadow-2xl"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <h1 className="text-4xl font-bold mb-4 text-green-600">🎉 Level Up!</h1>
      <p className="text-lg">Congrats {user?.name}, you unlocked the next level 🚀</p>
      <div className="mt-6">
        <button className="bg-green-500 text-white px-6 py-2 rounded-xl hover:bg-green-600">
          Continue Journey
        </button>
      </div>
    </motion.div>
  );
}
