import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
} from "framer-motion";
import { useLocation } from "react-router-dom";

const navItems = [
  { id: "hero", label: "home" },
  { id: "about", label: "about" },
  { id: "services", label: "services" },
  { id: "portfolio", label: "portfolio" },
  { id: "contact", label: "contact" },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero");
  const location = useLocation();

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 20 });

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px 0px -60% 0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    navItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Skip to content */}
      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:absolute top-2 left-2 z-[9999] bg-yellow-400 text-black px-4 py-2 rounded-md"
      >
        Skip to content
      </a>

      {/* Scroll progress bar */}
      <motion.div
        style={{ scaleX: progress }}
        className="fixed top-0 left-0 right-0 h-1 bg-yellow-400 origin-left z-[9998]"
      />

      {/* Navigation */}
      <AnimatePresence mode="wait">
        <motion.nav
          key={location.pathname}
          className="fixed top-0 w-full z-[9997] transition-colors duration-300 bg-white/90 dark:bg-slate-900/85 backdrop-blur-sm shadow-sm"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          aria-label="Primary Navigation"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              {/* Logo */}
              <motion.button
                onClick={() => scrollToSection("hero")}
                className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                aria-label="Scroll to top"
              >
                <img
                  src="/assets/img/logo.webp"
                  alt="PhilDev logo"
                  className="w-12 h-12 object-contain rounded-full shadow-lg transition-transform duration-300 hover:scale-105"
                />
                <span className="text-2xl font-bold font-[Poppins] text-gray-900 dark:text-white">
                  Phil<span className="text-yellow-500">Dev</span>
                </span>
              </motion.button>

              {/* Desktop Menu */}
              <div className="hidden md:flex space-x-8">
                {navItems.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <motion.button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`capitalize relative font-medium font-[Inter] text-sm px-2 py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 rounded transition-all ${
                        isActive
                          ? "text-yellow-600 dark:text-yellow-400 font-semibold"
                          : "text-gray-900 dark:text-white hover:text-teal-600"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {item.label}
                      {isActive && (
                        <motion.span
                          layoutId="underline"
                          className="absolute left-0 bottom-0 h-[2px] w-full bg-yellow-400"
                        />
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* Mobile Menu Toggle */}
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded p-2 text-gray-900 dark:text-white hover:text-teal-600 transition"
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
                aria-controls="mobile-navigation"
              >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </motion.button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  key="mobile-nav"
                  id="mobile-navigation"
                  className="md:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm rounded-xl mt-2 py-4 shadow-xl"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {navItems.map((item) => {
                    const isActive = activeSection === item.id;
                    return (
                      <motion.button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className={`block w-full text-left px-6 py-3 capitalize font-medium font-[Inter] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
                          isActive
                            ? "text-yellow-600 dark:text-yellow-400 font-semibold"
                            : "text-gray-900 dark:text-white"
                        } hover:text-teal-700 hover:bg-teal-50 dark:hover:bg-teal-800`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        aria-current={isActive ? "page" : undefined}
                      >
                        {item.label}
                      </motion.button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.nav>
      </AnimatePresence>
    </>
  );
};

export default Navigation;