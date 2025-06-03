// components/ScrollToTopButton.tsx
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const scrollThreshold = 250; // px from top before showing button

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > scrollThreshold);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Optional: Haptic feedback for supported devices
    if (navigator.vibrate) {
      navigator.vibrate(10);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          key="scroll-top"
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed bottom-6 right-6 z-50 p-3 sm:p-4 md:p-5 rounded-full bg-gradient-to-br from-teal-500 to-emerald-500 text-white shadow-2xl hover:scale-[1.12] hover:shadow-emerald-500/60 focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-400 transition-all duration-300 backdrop-blur-md"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <ArrowUp className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 animate-pulse" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTopButton;