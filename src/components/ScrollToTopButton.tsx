import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ScrollToTopButton = () => {
  const [scrollY, setScrollY] = useState(0);
  const [visible, setVisible] = useState(false);
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / maxScroll) * 100;

      setScrollY(scrollPercent);
      setVisible(scrollTop > 300);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (navigator.vibrate) navigator.vibrate(10);
  };

  const getRingColor = () => {
    if (scrollY < 33) return "#5eead4";
    if (scrollY < 66) return "#2dd4bf";
    return "#10b981";
  };

  const showMagnet = scrollY >= 85;
  const showPulse = scrollY >= 80;

  return (
    <AnimatePresence>
      {visible && !prefersReducedMotion && (
        <motion.div
          key="scroll-top-wrapper"
          className="fixed bottom-6 right-6 z-50 group"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {/* Tooltip (on hover) */}
          <div className="absolute bottom-full right-1/2 translate-x-1/2 mb-2 hidden sm:block pointer-events-none group-hover:opacity-100 opacity-0 transition-opacity duration-200">
            <div className="bg-black/80 text-white text-xs px-3 py-1 rounded shadow-lg">
              Back to top
            </div>
          </div>

          {/* Outer SVG Progress Ring */}
          <div className="relative w-16 h-16 sm:w-20 sm:h-20">
            <svg
              className="absolute top-0 left-0 w-full h-full rotate-[-90deg] pointer-events-none"
              viewBox="0 0 36 36"
            >
              <circle
                cx="18"
                cy="18"
                r="16"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="3"
                fill="none"
              />
              <motion.circle
                cx="18"
                cy="18"
                r="16"
                stroke={getRingColor()}
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
                strokeDasharray="100"
                strokeDashoffset={100 - scrollY}
                transition={{ ease: "easeOut", duration: 0.3 }}
              />
            </svg>

            {/* Optional pulse behind button when 80%+ scrolled */}
            {showPulse && (
              <motion.div
                className="absolute inset-0 rounded-full bg-emerald-500/20 blur-2xl z-[-1]"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.3, 0.5, 0.3] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            )}

            {/* Main Button */}
            <motion.button
              onClick={scrollToTop}
              aria-label="Scroll to top"
              className="absolute inset-1.5 sm:inset-2 w-[calc(100%-0.75rem)] h-[calc(100%-0.75rem)] sm:w-[calc(100%-1rem)] sm:h-[calc(100%-1rem)]
                rounded-full bg-white/90 dark:bg-slate-900/80
                shadow-xl backdrop-blur-md
                focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-400
                flex items-center justify-center
                hover:scale-105 transition-transform"
            >
              {showMagnet ? (
                <span
                  className="text-xl sm:text-2xl animate-bounce"
                  role="img"
                  aria-label="Magnet"
                >
                  🧲
                </span>
              ) : (
                <ArrowUp
                  className="w-5 h-5 sm:w-6 sm:h-6 text-teal-700 dark:text-teal-300 animate-bounce"
                  aria-hidden="true"
                />
              )}
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTopButton;
