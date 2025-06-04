// src/components/GlowLogo.tsx
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const GlowLogo = () => {
  const [mounted, setMounted] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => setMounted(true), []);

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.15 + i * 0.07,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  const floatingParticles = Array.from({ length: 14 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 4,
    size: Math.random() * 4 + 1,
    duration: Math.random() * 3 + 3,
  }));

  return (
    <motion.div
      className="relative w-56 h-56 sm:w-64 sm:h-64 flex items-center justify-center rounded-full overflow-visible"
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      {/* Ambient Radial Gradient Background */}
      {!prefersReducedMotion && (
        <motion.div
          className="absolute w-[150%] h-[150%] rounded-full blur-3xl pointer-events-none z-0"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(56,189,248,0.08) 0%, rgba(251,191,36,0.04) 60%, transparent 100%)",
          }}
          animate={{ scale: [1, 1.1, 1], rotate: [0, 360] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        />
      )}

      {/* Orbiting Particles */}
      {floatingParticles.map(({ id, left, top, delay, size, duration }) => (
        <motion.div
          key={id}
          className="absolute rounded-full bg-white/20 dark:bg-white/10"
          style={{
            left: `${left}%`,
            top: `${top}%`,
            width: size,
            height: size,
          }}
          animate={{ y: [0, -3, 0] }}
          transition={{
            duration,
            repeat: Infinity,
            delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Double Pulse Glow Rings */}
      {!prefersReducedMotion && (
        <>
          <motion.div
            className="absolute w-full h-full rounded-full border border-cyan-400/20 dark:border-cyan-300/20"
            animate={{ scale: [1, 1.06, 1], opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute w-[110%] h-[110%] rounded-full border border-yellow-400/20 dark:border-yellow-200/20"
            animate={{ scale: [1, 1.04, 1], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}

      {/* Animated Wordmark */}
      <motion.div className="relative z-10 flex text-[2.25rem] sm:text-[2.75rem] font-extrabold tracking-tight font-[Poppins] text-cyan-600 dark:text-cyan-300 drop-shadow-md">
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
              <span className="text-yellow-400 dark:text-yellow-300 drop-shadow-[0_0_4px_rgba(251,191,36,0.8)]">
                {letter}
              </span>
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
