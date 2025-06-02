// src/components/LoadingScreen.tsx
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GlowLogo from "@/components/GlowLogo";

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const PHASES = [
  { percent: 0, text: "Warming up..." },
  { percent: 25, text: "Initializing..." },
  { percent: 50, text: "Rendering pixels..." },
  { percent: 75, text: "Final polish..." },
  { percent: 100, text: "Ready!" },
];

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);
  const reducedMotion = prefersReducedMotion();

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsVisible(false), 800);
          return 100;
        }
        return Math.min(prev + Math.random() * 10 + 5, 100);
      });
    }, 150);
    return () => clearInterval(interval);
  }, []);

  const currentPhase =
    PHASES.slice().reverse().find((p) => progress >= p.percent)?.text || "";

  return (
    <AnimatePresence onExitComplete={() => setShouldRender(false)}>
      {isVisible && shouldRender && (
        <motion.div
          role="status"
          aria-live="polite"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center text-center bg-gradient-to-br from-slate-100 via-teal-100 to-white dark:from-slate-900 dark:via-teal-900 dark:to-slate-800 px-4"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Ambient Blobs */}
          {!reducedMotion && (
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                className="absolute top-1/3 left-1/4 w-96 h-96 bg-teal-400/20 rounded-full blur-3xl"
                animate={{ scale: [0.9, 1.1, 0.9] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-400/20 rounded-full blur-3xl"
                animate={{ scale: [1.1, 0.9, 1.1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              />
            </div>
          )}

          {/* Centered Glow Logo */}
          <div className="relative z-10 flex flex-col items-center space-y-6">
            <GlowLogo />

            <motion.h1
              className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white font-[Poppins]"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Portfolio Loading
            </motion.h1>

            <motion.p
              className="text-teal-700 dark:text-teal-200 font-[Inter]"
              key={currentPhase}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {currentPhase}
            </motion.p>

            {/* Progress Ring */}
            <motion.div
              className="relative w-28 h-28"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <svg className="w-full h-full">
                <circle
                  cx="50%"
                  cy="50%"
                  r="40%"
                  stroke="rgba(255,255,255,0.15)"
                  strokeWidth="8"
                  fill="transparent"
                />
                <motion.circle
                  cx="50%"
                  cy="50%"
                  r="40%"
                  stroke="url(#gradient)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  fill="transparent"
                  strokeDasharray="250"
                  strokeDashoffset={250 - (250 * progress) / 100}
                  transition={{ ease: "easeOut", duration: 0.4 }}
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#14b8a6" />
                    <stop offset="100%" stopColor="#f59e0b" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-xl font-semibold text-gray-900 dark:text-white">
                {Math.round(progress)}%
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
