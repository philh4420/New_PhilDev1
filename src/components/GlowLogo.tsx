// src/components/GlowLogo.tsx
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const letterVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.2 + i * 0.08, duration: 0.6, ease: "easeOut" },
  }),
};

const floatingParticles = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  top: Math.random() * 100,
  delay: Math.random() * 5,
}));

const GlowLogo = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <motion.div
      className="relative w-64 h-64 rounded-full flex items-center justify-center overflow-visible"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      {/* Floating Ambient Blob */}
      <motion.div
        className="absolute w-[150%] h-[150%] bg-gradient-to-br from-cyan-400/10 via-yellow-200/10 to-transparent rounded-full blur-3xl z-0"
        animate={{ scale: [1, 1.1, 1], rotate: [0, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      {/* Particle Stars */}
      {floatingParticles.map(({ id, left, top, delay }) => (
        <motion.div
          key={id}
          className="absolute w-1 h-1 bg-white/20 dark:bg-white/10 rounded-full"
          style={{ left: `${left}%`, top: `${top}%` }}
          animate={{ y: [-2, 2, -2] }}
          transition={{ duration: 4, delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* Inner Pulse Ring */}
      <motion.div
        className="absolute w-full h-full rounded-full border border-cyan-300/30 dark:border-cyan-500/30"
        animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Text Wordmark */}
      <motion.div className="relative z-10 flex text-[2.5rem] sm:text-[3rem] font-extrabold tracking-tight font-[Poppins] text-cyan-600 dark:text-cyan-300">
        {"PhilDev".split("").map((letter, i) => (
          <motion.span
            key={i}
            className="inline-block"
            variants={letterVariants}
            initial="hidden"
            animate={mounted ? "visible" : "hidden"}
            custom={i}
          >
            {letter === "D" ? (
              <span className="text-yellow-400 dark:text-yellow-300">{letter}</span>
            ) : (
              letter
            )}
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default GlowLogo;
