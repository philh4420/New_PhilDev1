import { useRef, useState, useEffect } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import ShaderBackground from "./ShaderBackground";
import { Button } from "@/components/ui/button";
import Typed from "typed.js";

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [voicePlaying, setVoicePlaying] = useState(false);
  const [buttonsVisible, setButtonsVisible] = useState(true);
  const [fadeOverlay, setFadeOverlay] = useState(false);

  useEffect(() => {
    const typed = new Typed("#typed-output", {
      strings: ["Frontend Experiences."],
      typeSpeed: 50,
      showCursor: true,
      cursorChar: "|",
    });

    return () => typed.destroy();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setButtonsVisible(false);
    }, 12000);

    return () => clearTimeout(timeout);
  }, [voicePlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, []);

  const playIntro = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.play()
      .then(() => setVoicePlaying(true))
      .catch(() => {
        const utterance = new SpeechSynthesisUtterance(
          "Welcome to my portfolio. I’m Phil, a creative frontend developer crafting seamless, modern experiences. Scroll down to explore my work or hit skip to dive right in."
        );
        utterance.lang = "en-GB";
        utterance.rate = 1;
        utterance.onend = () => {
          setVoicePlaying(false);
          setFadeOverlay(true);
        };
        speechSynthesis.speak(utterance);
        setVoicePlaying(true);
      });

    if (audio) {
      audio.onended = () => {
        setVoicePlaying(false);
        setFadeOverlay(true);
      };
    }
  };

  const skipIntro = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    speechSynthesis.cancel();
    setVoicePlaying(false);
    setFadeOverlay(true);
  };

  const scrollTo = (selector: string) => {
    document.querySelector(selector)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.section
      ref={sectionRef}
      id="hero"
      className="min-h-screen flex items-center relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6 }}
    >
      <ShaderBackground />
      <audio ref={audioRef} src="/assets/intro.mp3" preload="auto" />

      {/* Background Overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/60 via-slate-800/40 to-teal-900/50 pointer-events-none" />
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />

      {/* Fade Overlay on Audio End */}
      {fadeOverlay && (
        <motion.div
          className="absolute inset-0 bg-black/50 pointer-events-none z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 1.2 }}
        />
      )}

      {/* Voice Intro Buttons */}
      <AnimatePresence>
        {buttonsVisible && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1.7, ease: "easeOut" }}
            className="absolute z-50 flex gap-2 items-center px-4
                       right-9 top-4 sm:top-4 sm:right-4
                       sm:flex-row flex-col sm:items-center items-end"
          >
            {!voicePlaying ? (
              <button
                onClick={playIntro}
                className="px-4 py-2 bg-teal-500 text-white font-bold rounded-full shadow hover:bg-teal-600 transition"
              >
                ▶ Play Intro
              </button>
            ) : (
              <button
                onClick={skipIntro}
                className="px-4 py-2 bg-yellow-500 text-black font-bold rounded-full shadow hover:bg-yellow-600 transition"
              >
                ⏭ Skip Intro
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="max-w-4xl">
          <motion.h1
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 font-[Poppins] perspective-1000 drop-shadow-2xl"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
              visible: { transition: { staggerChildren: 0.15 } },
              hidden: {},
            }}
          >
            {["Crafting", "Seamless,", "Modern"].map((word, i) => (
              <motion.span
                key={i}
                className="inline-block"
                variants={{
                  hidden: { y: 100, opacity: 0, rotateX: 90 },
                  visible: {
                    y: 0,
                    opacity: 1,
                    rotateX: 0,
                    transition: { type: "spring", stiffness: 80, damping: 20 },
                  },
                }}
              >
                {i === 1 ? <><br />{word}</> : ` ${word}`}
              </motion.span>
            ))}{" "}
            <br />
            <span className="inline-block text-teal-200" id="typed-output" />
          </motion.h1>

          <motion.p
            className="text-xl sm:text-2xl text-white mb-8 max-w-2xl font-[Inter] drop-shadow-lg"
            initial={{ y: 40, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
          >
            Beautifully responsive websites built with HTML, CSS, and JavaScript — fast, accessible, and user-first.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.9, duration: 0.6, ease: "easeOut" }}
          >
            <Button
              onClick={() => scrollTo("#portfolio")}
              size="lg"
              className="group bg-white text-black hover:bg-teal-50 px-8 py-4 rounded-full font-semibold transition-all duration-500 hover:scale-110 hover:shadow-2xl transform hover:-translate-y-2 hover:rotate-1"
            >
              View My Work
            </Button>
            <Button
              onClick={() => scrollTo("#contact")}
              variant="outline"
              size="lg"
              className="group bg-yellow-500 text-black hover:bg-yellow-600 px-8 py-4 rounded-full font-semibold transition-all duration-500 hover:scale-110 transform hover:-translate-y-2 hover:-rotate-1 hover:shadow-2xl"
            >
              Let's Work Together
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator with blur trail */}
      <motion.div
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.8, y: 0 }}
        transition={{ delay: 2, duration: 0.8, ease: "easeOut" }}
      >
        <div className="relative">
          <div className="absolute inset-0 w-10 h-10 bg-white/10 rounded-full blur-2xl animate-pulse" />
          <button
            onClick={() => scrollTo("#about")}
            aria-label="Scroll Down"
            className="relative z-10 animate-bounce text-white opacity-90 hover:opacity-100 text-3xl"
          >
            ↓
          </button>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Hero;
