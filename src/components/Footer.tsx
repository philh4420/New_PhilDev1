import { Github, Linkedin, ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            key="scrollToTop"
            type="button"
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-teal-600 hover:bg-teal-700 text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            initial={{ opacity: 0, y: 40, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            aria-label="Scroll to top"
            tabIndex={0}
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Footer */}
      <motion.footer
        className="py-12 px-4 sm:px-6 lg:px-8"
        style={{
          '--footer-bg': '#0d1117',
          backgroundColor: 'var(--footer-bg)',
        } as React.CSSProperties}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <motion.div
              className="text-white font-[Inter]"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <p>© {currentYear} PhilDev</p>
            </motion.div>

            <motion.div
              className="flex space-x-6"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.2 },
                },
              }}
            >
              <motion.a
                href="https://github.com/philh4420"
                className="text-white hover:text-gray-300 transition-colors duration-200"
                aria-label="Phil's GitHub profile"
                target="_blank"
                rel="noopener noreferrer"
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <Github className="h-6 w-6" />
              </motion.a>

              <motion.a
                href="https://linkedin.com/in/philhigdon"
                className="text-white hover:text-gray-300 transition-colors duration-200"
                aria-label="Phil's LinkedIn profile"
                target="_blank"
                rel="noopener noreferrer"
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <Linkedin className="h-6 w-6" />
              </motion.a>
            </motion.div>
          </div>
        </div>
      </motion.footer>
    </>
  );
};

export default Footer;
