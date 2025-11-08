// src/pages/LandingPage.jsx
import { motion } from "framer-motion";
import { Brain, Smile, Heart, Lightbulb, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  const slideFromLeft = {
    hidden: { opacity: 0, x: -80 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen bg-[#1b0e2e] text-white font-poppins">
      {/* 🌙 Navbar */}
      <nav className="flex justify-between items-center px-4 sm:px-6 md:px-12 py-4 bg-[#4a2c6e]/60 backdrop-blur-md border-b border-[#2b1b3a]/50 fixed top-0 left-0 w-full z-50 shadow-lg">
        {/* Brand with tagline */}
        <div
          className="cursor-pointer flex flex-col items-start"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <h1 className="text-xl sm:text-2xl font-bold">
            nuvio.<span className="text-white">care</span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-300 underline decoration-[#bfa5ff]/60 decoration-1 mt-1">
            a new perspective on feelings
          </p>
        </div>

        {/* Navbar Links */}
        <div className="flex items-center gap-4 sm:gap-6 text-gray-200 text-sm sm:text-base font-medium">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="hover:text-[#bfa5ff] transition-colors"
          >
            Home
          </button>
          <button
            onClick={() =>
              document
                .getElementById("info")
                .scrollIntoView({ behavior: "smooth", block: "start" })
            }
            className="hover:text-[#bfa5ff] transition-colors"
          >
            About
          </button>
        </div>
      </nav>

      {/* 🌟 Hero Section */}
      <section className="flex flex-col items-center justify-center min-h-[90vh] px-4 sm:px-8 md:px-16 text-center gap-8 pt-28 sm:pt-32">
        <motion.div
          className="max-w-3xl flex flex-col items-center"
          variants={slideFromLeft}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            Discover Your{" "}
            <span className="text-[#bfa5ff]">Emotional Intelligence</span> :)
          </motion.h1>

          <motion.p
            className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 max-w-2xl px-2"
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Discover how well you understand emotions in yourself and others
            through interactive, fun experiences.
          </motion.p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/level1")}
            className="px-6 sm:px-8 py-3 text-base sm:text-lg font-semibold bg-[#bfa5ff] text-[#1b0e2e] rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            Wanna Get Started?
          </motion.button>
        </motion.div>
      </section>

      {/* 💜 Info Boxes */}
      <section id="info" className="py-16 px-4 sm:px-8 bg-transparent">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
          initial="hidden"
          whileInView="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.25 } },
          }}
          viewport={{ once: true }}
        >
          {[
            {
              icon: <Heart className="text-pink-400" size={50} />,
              title: "What is Emotional Intelligence?",
              text: "Emotional intelligence is the ability to understand and manage your emotions, while recognizing others’ emotions to communicate effectively.",
            },
            {
              icon: <Brain className="text-yellow-400" size={50} />,
              title: "EQ vs IQ",
              text: "IQ measures cognitive intelligence. EQ measures how well you understand and manage emotions. High EQ often leads to better real-life outcomes.",
            },
            {
              icon: <Lightbulb className="text-green-400" size={50} />,
              title: "Did You Know?",
              text: "Studies show that 90% of top performers have high EQ rather than high IQ. The good news: EQ can be trained and improved!",
            },
          ].map((box, i) => (
            <motion.div
              key={i}
              variants={slideFromLeft}
              className="p-6 rounded-2xl shadow-md hover:shadow-lg transition-all bg-[#2b1b3a] flex flex-col sm:flex-row items-center sm:items-start gap-4"
            >
              {box.icon}
              <div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 text-[#bfa5ff] text-center sm:text-left">
                  {box.title}
                </h3>
                <p className="text-sm text-gray-200 leading-relaxed text-center sm:text-left">
                  {box.text}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 🧠 Why EI Matters */}
      <section className="py-20 px-4 sm:px-8 bg-[#1b0e2e]">
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-12 text-center text-[#bfa5ff]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Why Emotional Intelligence Matters 🧠
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
          initial="hidden"
          whileInView="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.25 } },
          }}
          viewport={{ once: true }}
        >
          {[
            {
              icon: <Smile size={40} className="text-yellow-400 mb-3" />,
              title: "Better Communication",
              text: "Understand emotions to express yourself clearly and listen empathetically.",
            },
            {
              icon: <Heart size={40} className="text-pink-400 mb-3" />,
              title: "Stronger Relationships",
              text: "Build deeper bonds through empathy, trust, and understanding.",
            },
            {
              icon: <Brain size={40} className="text-blue-400 mb-3" />,
              title: "Smarter Decisions",
              text: "Balance logic and emotion to make thoughtful, effective choices.",
            },
            {
              icon: <Lightbulb size={40} className="text-green-400 mb-3" />,
              title: "Personal Growth",
              text: "Self-awareness helps you grow, adapt, and stay motivated.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={slideFromLeft}
              whileHover={{ scale: 1.05 }}
              className="bg-[#2b1b3a] p-6 rounded-2xl shadow-md hover:shadow-lg text-center transition-all"
            >
              {item.icon}
              <h3 className="text-lg sm:text-xl font-semibold text-[#bfa5ff] mb-2">
                {item.title}
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                {item.text}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 🎯 EI Quiz Section */}
      <section className="py-20 bg-[#2b1b3a] px-4 sm:px-8 text-center">
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-[#bfa5ff]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Test Your EI in 1 Minute!
        </motion.h2>
        <motion.p
          className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Take a quick interactive quiz to see where your emotional intelligence
          stands.
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/level1")}
          className="px-6 sm:px-8 py-3 text-base sm:text-lg font-semibold bg-[#bfa5ff] text-[#1b0e2e] rounded-full shadow-lg hover:shadow-xl transition-all"
        >
          🎯 Start Your EI Adventure!
        </motion.button>
      </section>

      {/* 🗣 Testimonials */}
      <section className="py-20 bg-[#1b0e2e] px-4 sm:px-8 text-white">
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-12 text-center text-[#bfa5ff]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          What People Are Saying
        </motion.h2>

        <div className="max-w-3xl mx-auto space-y-10">
          {[
            {
              text: "This platform helped me understand my emotions and respond to challenges more thoughtfully.",
              name: "Anika R.",
            },
            {
              text: "I improved my communication and empathy at work thanks to the interactive exercises.",
              name: "Rahul S.",
            },
            {
              text: "Fun, engaging, and practical. My EQ score increased within weeks!",
              name: "Maya K.",
            },
          ].map((t, i) => (
            <motion.div
              key={i}
              className="bg-[#2b1b3a] p-6 rounded-2xl shadow-lg text-center"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Star size={36} className="text-[#bfa5ff] mx-auto mb-4" />
              <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                "{t.text}"
              </p>
              <p className="text-purple-200 font-semibold">- {t.name}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 💡 EI Tips */}
      <section className="py-20 bg-[#2b1b3a] px-4 sm:px-8 text-center">
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-[#bfa5ff]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          3 Quick EI Tips to Practice Daily
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
          initial="hidden"
          whileInView="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.25 } },
          }}
          viewport={{ once: true }}
        >
          {[
            { title: "Pause & Reflect", text: "Take a moment before reacting to emotionally charged situations." },
            { title: "Active Listening", text: "Focus fully on the speaker, without planning your response." },
            { title: "Express Gratitude", text: "Recognize others’ contributions and show appreciation daily." },
          ].map((tip, i) => (
            <motion.div
              key={i}
              variants={slideFromLeft}
              whileHover={{ scale: 1.05 }}
              className="bg-[#1b0e2e] p-6 rounded-2xl shadow-md hover:shadow-lg text-center transition-all"
            >
              <Lightbulb size={45} className="text-green-400 mb-4 mx-auto" />
              <h3 className="text-lg sm:text-xl font-semibold text-[#bfa5ff] mb-2">
                {tip.title}
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">{tip.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>
      {/* ❤️ Footer */}
      <footer className="text-center py-6 text-gray-400 text-xs sm:text-sm border-t border-[#2b1b3a] bg-[#1b0e2e]">
        Made with <span className="text-red-500">❤️</span> by{" "}
        <span className="text-white font-semibold">Hasanaat</span> | 2025
      </footer>
    </div>
  );
}
