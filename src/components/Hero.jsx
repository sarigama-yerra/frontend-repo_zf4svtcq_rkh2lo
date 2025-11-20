import { motion } from "framer-motion";

export default function Hero({ onStart }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_-10%,rgba(59,130,246,0.25),transparent_35%),radial-gradient(circle_at_80%_120%,rgba(99,102,241,0.25),transparent_35%)]" />
      <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-16 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white"
        >
          Exclusive Content, Built on Skills
        </motion.h1>
        <p className="mt-6 text-lg sm:text-xl text-blue-100/80 max-w-3xl mx-auto">
          A safe, non‑adult platform where creators share premium tutorials, code, designs, and videos. Fans subscribe to tiers or tip with tokens.
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <button onClick={onStart} className="px-6 py-3 rounded-xl bg-blue-500 text-white font-semibold hover:bg-blue-600 transition">
            Explore Demo
          </button>
          <a href="#how" className="px-6 py-3 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/20 transition">
            How it works
          </a>
        </div>
      </div>
    </section>
  );
}
