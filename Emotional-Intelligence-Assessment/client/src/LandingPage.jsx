// src/pages/LandingPage.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { Brain, Gamepad2, Smile, Sparkles, Heart, Lightbulb } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  // WhyCard Component
  function WhyCard({ item }) {
    const [open, setOpen] = useState(false);
    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="bg-[#3b0a45]/80 p-6 rounded-2xl w-60 shadow-md hover:shadow-lg cursor-pointer relative"
        onClick={() => setOpen(!open)}
      >
        <div className="text-4xl mb-3">{item.icon}</div>
        <p className="text-gray-200 font-semibold">{item.title}</p>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-[#4b0f63]/95 backdrop-blur-md rounded-2xl flex flex-col justify-center items-center p-5 text-sm text-gray-100"
          >
            <p className="mb-4 leading-relaxed">{item.text}</p>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="mt-2 text-xs px-4 py-1 bg-purple-500 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false);
              }}
            >
              Got it!
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#3b0a45] via-[#5a189a] to-[#240046] text-white overflow-hidden font-poppins">

      {/* 🏁 Hero Section */}
      <section className="flex flex-col items-center justify-center text-center h-screen relative px-4">

        {/* 🧠 EQ vs EI Mini Info Box (Centered) */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          whileHover={{ scale: 1.05 }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                     bg-[#2a0a45]/80 border border-purple-400/40 backdrop-blur-md 
                     rounded-2xl px-6 py-4 max-w-sm shadow-md text-left"
        >
          <h4 className="text-sm font-semibold text-purple-300 mb-1">EQ vs EI 💡</h4>
          <p className="text-xs text-gray-200 leading-relaxed">
            <strong>EI (Emotional Intelligence)</strong> is the broader ability to understand, use, 
            and manage emotions effectively, while <strong>EQ (Emotional Quotient)</strong> is how we measure it, 
            just like IQ measures intelligence.
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-bold mb-4"
        >
          Test Your <span className="text-purple-300">Emotional Intelligence</span> 🎮
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl"
        >
          Discover how well you understand emotions in yourself and others through
          an interactive, gamified experience.
        </motion.p>

        {/* 💜 Info Boxes (3-column) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12"
        >
          {/* Box 1: What is EI */}
          <div className="bg-[#2a0a45]/80 backdrop-blur-md border border-purple-400/30 p-6 rounded-2xl shadow-lg hover:shadow-purple-500/20 transition-all">
            <div className="flex items-start space-x-5">
              <Heart className="text-pink-400 flex-shrink-0" size={60} strokeWidth={1.2} />
              <div>
                <h3 className="text-xl font-semibold mb-2 text-purple-200">What is EI?</h3>
                <p className="text-sm text-gray-200 leading-relaxed">
                  <strong>Emotional Intelligence (EI)</strong> is the ability to understand and manage your own emotions,
                  while recognizing others’ emotions to build better relationships and communicate effectively.
                </p>
              </div>
            </div>
          </div>

          {/* Box 2: EQ vs IQ */}
          <div className="bg-[#2a0a45]/80 backdrop-blur-md border border-pink-400/30 p-6 rounded-2xl shadow-lg hover:shadow-pink-500/20 transition-all">
            <div className="flex items-start space-x-5">
              <Brain className="text-purple-300 flex-shrink-0" size={60} strokeWidth={1.2} />
              <div>
                <h3 className="text-xl font-semibold mb-2 text-pink-200">EQ vs IQ</h3>
                <p className="text-sm text-gray-200 leading-relaxed">
                  IQ measures how smart you are. EQ measures how *wise* you are with emotions.  
                  Little do people know <strong>EQ often matters more than IQ</strong> in real-life success and happiness.
                </p>
              </div>
            </div>
          </div>

          {/* Box 3: Did You Know? */}
          <div className="bg-[#2a0a45]/80 backdrop-blur-md border border-yellow-400/30 p-6 rounded-2xl shadow-lg hover:shadow-yellow-400/20 transition-all">
            <div className="flex items-start space-x-5">
              <Lightbulb className="text-yellow-300 flex-shrink-0" size={60} strokeWidth={1.2} />
              <div>
                <h3 className="text-xl font-semibold mb-2 text-yellow-200">Did You Know?</h3>
                <p className="text-sm text-gray-200 leading-relaxed">
                  Studies show that <strong>90% of top performers have high EQ</strong> not high IQ.  
                  The best part? You can actually <em>train and grow</em> your emotional intelligence over time.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/level1")}
          className="px-8 py-3 text-lg font-semibold bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg hover:shadow-xl transition-all"
        >
          Wanna Get Started ?
        </motion.button>
      </section>

      {/* 💡 Why EI Matters */}
      <section className="py-24 bg-transparent text-center">
        <h2 className="text-4xl font-bold mb-10">
          Why Emotional Intelligence <span className="text-purple-300">Matters</span>
        </h2>

        <div className="flex flex-wrap justify-center gap-10 px-10">
          {[
            {
              icon: "💞",
              title: "Build better relationships",
              text: "When you understand and manage emotions well, you communicate better and connect deeply with others, building trust and respect naturally.",
            },
            {
              icon: "🚀",
              title: "Boost your career success",
              text: "People with strong emotional intelligence handle stress, teamwork, and feedback well — qualities every leader and manager values.",
            },
            {
              icon: "🌿",
              title: "Improve mental wellness",
              text: "Understanding your emotions helps you calm your mind, avoid burnout, and stay balanced, making life feel lighter and more manageable.",
            },
            {
              icon: "🧠",
              title: "Make smarter decisions",
              text: "When emotions don’t cloud your judgment, you can think clearly, evaluate better, and choose what’s truly right for you.",
            },
          ].map((item, i) => (
            <WhyCard key={i} item={item} />
          ))}
        </div>
      </section>

      {/* ⚙️ How It Works */}
      <section className="py-24 bg-transparent text-center relative overflow-hidden">
        <h2 className="text-4xl font-bold mb-16 text-white">
          How It <span className="text-purple-300">Works</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-6 md:px-20">
          {[
            {
              icon: <Gamepad2 size={50} />,
              title: "Play Interactive Scenarios",
              desc: "Face real-life emotional situations and make decisions that reflect how you feel.",
              gradient: "from-pink-500 via-purple-500 to-indigo-500",
            },
            {
              icon: <Brain size={50} />,
              title: "Understand Emotions",
              desc: "Each choice helps you uncover your awareness, empathy, and emotional balance.",
              gradient: "from-blue-500 via-purple-500 to-pink-500",
            },
            {
              icon: <Smile size={100} />,
              title: "Get Your EQ Score",
              desc: "Receive a personalized EQ report that helps you improve emotional skills.",
              gradient: "from-purple-500 via-pink-500 to-yellow-400",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, y: -8 }}
              transition={{ type: "spring", stiffness: 120 }}
              className={`relative group bg-gradient-to-br ${item.gradient} p-[2px] rounded-3xl shadow-lg hover:shadow-2xl transition-all`}
            >
              <div className="bg-[#2a0a45]/90 rounded-3xl h-full p-8 flex flex-col justify-between text-white group-hover:bg-opacity-80 transition-all duration-500 relative z-10">
                <motion.div
                  className="flex justify-center mb-6 text-purple-300 group-hover:opacity-0 transition-all duration-300"
                >
                  {item.icon}
                </motion.div>

                <h3 className="text-xl font-semibold mb-3 group-hover:text-pink-200 transition-all duration-300">
                  {item.title}
                </h3>

                <p className="text-gray-300 group-hover:opacity-90 transition-all duration-500">
                  {item.desc}
                </p>

                <motion.div
                  className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 text-yellow-300"
                  animate={{ rotate: [0, 180, 360] }}
                  transition={{ repeat: Infinity, duration: 4 }}
                >
                  <Sparkles size={20} />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 bg-transparent text-center text-gray-400 text-sm">
        Made with ❤️ by <span className="text-white font-semibold">Amtul Noor Hasanaat</span> | 2025
      </footer>
    </div>
  );
}
