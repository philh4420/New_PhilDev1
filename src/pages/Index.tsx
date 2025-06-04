import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import LoadingScreen from "@/components/LoadingScreen";

const Index = () => {
  const [loadingComplete, setLoadingComplete] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Loader skip: only show on first visit of the session
  useEffect(() => {
    const hasLoadedBefore = sessionStorage.getItem("hasLoaded");
    if (hasLoadedBefore) {
      setLoadingComplete(true);
    } else {
      const timer = setTimeout(() => {
        setLoadingComplete(true);
        sessionStorage.setItem("hasLoaded", "true");
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <>
      <AnimatePresence>{!loadingComplete && <LoadingScreen />}</AnimatePresence>

      {loadingComplete && (
        <motion.main
          className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50/20 relative overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.8, ease: "easeOut" }}
        >
          {/* 🌟 Animated background blobs (skipped for reduced motion) */}
          {!prefersReducedMotion && (
            <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
              <motion.div
                className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-teal-100/30 to-transparent rounded-full blur-3xl"
                animate={{ y: [0, 20, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-tr from-amber-100/20 to-transparent rounded-full blur-3xl"
                animate={{ y: [0, -15, 0] }}
                transition={{ repeat: Infinity, duration: 8, ease: "easeInOut", delay: 1 }}
              />
            </div>
          )}

          {/* 👇 Page Content */}
          <div className="relative z-10">
            <Navigation />
            <Hero />
            <About />
            <Services />
            <Portfolio />
            <Contact />
            <Footer />
            <ScrollToTopButton />
          </div>
        </motion.main>
      )}
    </>
  );
};
export default Index;