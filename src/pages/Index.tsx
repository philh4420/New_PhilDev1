import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingComplete(true);
    }, 3000); // You can sync this with your LoadingScreen duration

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {!loadingComplete && <LoadingScreen />}
      </AnimatePresence>

      {loadingComplete && (
        <motion.div
          className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50/20 relative overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* ✨ Floating Background Blobs */}
          <div className="fixed inset-0 pointer-events-none z-0">
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

          {/* 🔼 Main Content */}
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
        </motion.div>
      )}
    </>
  );
};

export default Index;
