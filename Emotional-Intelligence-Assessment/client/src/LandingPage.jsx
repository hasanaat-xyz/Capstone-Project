// src/pages/LandingPage.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Smile, Heart, Lightbulb, Menu, X, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const slideFromLeft = {
    hidden: { opacity: 0, x: -80 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen bg-[#1b0e2e] text-white overflow-hidden font-poppins">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 md:px-16 py-5 bg-[#4a2c6e]/60 backdrop-blur-md border-b border-[#2b1b3a]/50 fixed top-0 left-0 w-full z-50 shadow-lg">
        {/* Burger Menu (Mobile) */}
        <button
          onClick={() => setIsMenuOpen(true)}
          className="text-white md:hidden"
        >
          <Menu size={28} />
        </button>

        {/* Brand */}
        <h1
          className="text-2xl font-bold text-white cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          nuvio.<span className="text-white">care</span>
        </h1>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6 text-gray-200 font-medium">
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

      {/* 📱 Sliding Sidebar for Mobile */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Dark Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Sidebar */}
            <motion.div
              className="fixed top-0 left-0 w-3/4 sm:w-1/2 h-full bg-[#2b1b3a] z-50 shadow-lg p-6 flex flex-col space-y-6"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsMenuOpen(false)}
                className="self-end text-white"
              >
                <X size={26} />
              </button>

              {/* Sidebar Links */}
              <div className="flex flex-col space-y-6 mt-6 text-lg">
                <button
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    setIsMenuOpen(false);
                  }}
                  className="text-gray-200 hover:text-[#bfa5ff]"
                >
                  Home
                </button>
                <button
                  onClick={() => {
                    document
                      .getElementById("info")
                      .scrollIntoView({ behavior: "smooth", block: "start" });
                    setIsMenuOpen(false);
                  }}
                  className="text-gray-200 hover:text-[#bfa5ff]"
                >
                  About
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center min-h-[90vh] px-6 md:px-16 text-center gap-10 pt-32">
        <motion.div
          className="max-w-3xl flex flex-col items-center"
          variants={slideFromLeft}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-5xl md:text-6xl font-bold mb-4 whitespace-nowrap text-center md:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            Discover Your{" "}
            <span className="text-[#bfa5ff]">Emotional Intelligence</span> :)
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl"
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Discover how well you understand emotions in yourself and others
            through an interactive, gamified experience.
          </motion.p>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/level1")}
            className="px-8 py-3 text-lg font-semibold bg-[#bfa5ff] text-[#1b0e2e] rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            Wanna Get Started?
          </motion.button>
        </motion.div>
      </section>

      {/* 💜 Info Boxes */}

      <section
        id="info"
        className="py-16 bg-transparent overflow-hidden" // increased padding-top to move downward
      >
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12 px-6"
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
              icon: <Heart className="text-pink-400 flex-shrink-0" size={60} strokeWidth={1.2} />,
              title: "What is Emotional Intelligence?",
              text: "Emotional intelligence is the ability to understand and manage your emotions, while recognizing others’ emotions to communicate effectively.",
            },
            {
              icon: <Brain className="text-yellow-400 flex-shrink-0" size={60} strokeWidth={1.2} />,
              title: "EQ vs IQ",
              text: "IQ measures cognitive intelligence. EQ measures how well you understand and manage emotions. High EQ often leads to better real-life outcomes.",
            },
            {
              icon: <Lightbulb className="text-green-400 flex-shrink-0" size={60} strokeWidth={1.2} />,
              title: "Did You Know?",
              text: "Studies show that 90% of top performers have high EQ rather than high IQ. The good news: Emotional intelligence can be trained and improved over time.",
            },
          ].map((box, i) => (
            <motion.div
              key={i}
              variants={slideFromLeft}
              className="p-6 rounded-2xl shadow-md hover:shadow-lg transition-all bg-[#2b1b3a]"
            >
              <div className="flex items-start space-x-5">
                {box.icon}
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-[#bfa5ff]">
                    {box.title}
                  </h3>
                  <p className="text-sm text-gray-200 leading-relaxed">{box.text}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 🧠 WHY EI MATTERS */}
      <section className="py-20 bg-[#1b0e2e] text-white flex flex-col items-center justify-center px-6 md:px-16">
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-12 text-center text-[#bfa5ff]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Why Emotional Intelligence Matters 🧠
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl"
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
              icon: <Smile size={50} className="text-yellow-400 mb-4" />,
              title: "Better Communication",
              text: "Understand emotions to express yourself clearly and listen empathetically.",
            },
            {
              icon: <Heart size={50} className="text-pink-400 mb-4" />,
              title: "Stronger Relationships",
              text: "Build deeper bonds through empathy, trust, and emotional understanding.",
            },
            {
              icon: <Brain size={50} className="text-blue-400 mb-4" />,
              title: "Smarter Decisions",
              text: "Balance logic and emotion to make thoughtful, effective life choices.",
            },
            {
              icon: <Lightbulb size={50} className="text-green-400 mb-4" />,
              title: "Personal Growth",
              text: "Self-awareness helps you grow, adapt, and stay motivated even in challenges.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={slideFromLeft}
              whileHover={{ scale: 1.05 }}
              className="bg-[#2b1b3a] p-6 rounded-2xl shadow-md hover:shadow-lg text-center transition-all cursor-default"
            >
              {item.icon}
              <h3 className="text-xl font-semibold text-[#bfa5ff] mb-2">{item.title}</h3>
              <p className="text-gray-300 text-sm leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 📝 Mini EI Quiz Section */}
      <section className="py-20 bg-[#2b1b3a] text-white flex flex-col items-center justify-center px-6 md:px-16 gap-6">
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-6 text-[#bfa5ff] text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Test Your EI in 1 Minute!
        </motion.h2>
        <motion.p
          className="text-gray-300 text-lg max-w-2xl text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Take a quick interactive quiz to see where your emotional intelligence stands.
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/level1")}
          className="px-8 py-3 text-lg font-semibold bg-[#bfa5ff] text-[#1b0e2e] rounded-full shadow-lg hover:shadow-xl transition-all"
        >
          🎯 Start Your EI Adventure!
        </motion.button>
      </section>

      {/* 🗣 Testimonials Section */}
      <section className="py-20 bg-[#1b0e2e] text-white px-6 md:px-16">
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-12 text-center text-[#bfa5ff]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          What People Are Saying
        </motion.h2>

        <div className="max-w-4xl mx-auto space-y-12">
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
          ].map((testimonial, i) => (
            <motion.div
              key={i}
              className={`flex flex-col md:flex-row items-center ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } gap-6`}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-[#2b1b3a] p-6 rounded-2xl shadow-lg flex-1 text-center md:text-left">
                <Star size={36} className="text-[#bfa5ff] mx-auto md:mx-0 mb-4" />
                <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                  "{testimonial.text}"
                </p>
                <p className="text-purple-200 font-semibold">- {testimonial.name}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 📚 EI Tips Section */}
      <section className="py-20 bg-[#2b1b3a] text-white flex flex-col items-center justify-center px-6 md:px-16 gap-10">
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-6 text-[#bfa5ff] text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          3 Quick EI Tips to Practice Daily
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
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
              title: "Pause & Reflect",
              text: "Take a moment before reacting to emotionally charged situations.",
            },
            {
              title: "Active Listening",
              text: "Focus fully on the speaker, without planning your response.",
            },
            {
              title: "Express Gratitude",
              text: "Recognize others’ contributions and show appreciation daily.",
            },
          ].map((tip, i) => (
            <motion.div
              key={i}
              variants={slideFromLeft}
              whileHover={{ scale: 1.05 }}
              className="bg-[#1b0e2e] p-6 rounded-2xl shadow-md hover:shadow-lg text-center transition-all cursor-default"
            >
              <Lightbulb size={50} className="text-green-400 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-[#bfa5ff] mb-2">{tip.title}</h3>
              <p className="text-gray-300 text-sm leading-relaxed">{tip.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ❤️ Footer */}
      <footer className="text-center py-6 text-gray-400 text-sm border-t border-[#2b1b3a] bg-[#1b0e2e]">
        Made with <span className="text-red-500">❤️</span> by{" "}
        <span className="text-white font-semibold">Hasanaat</span> | 2025
      </footer>
    </div>
  );
}
