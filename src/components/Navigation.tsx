import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      window.requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 50);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  const navItems = [
    { id: "hero", label: "home" },
    { id: "about", label: "about" },
    { id: "services", label: "services" },
    { id: "portfolio", label: "portfolio" },
    { id: "contact", label: "contact" },
  ];

  return (
    <motion.nav
      className={`fixed top-0 w-full z-50 transition-colors duration-300 ${
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
      style={{ "--accent-color": "#F9A826" } as React.CSSProperties}
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-2 cursor-pointer"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => scrollToSection("hero")}
          >
            <img
  src="/assets/img/logo.png"
  alt="PhilDev logo"
  className="w-18 h-18 object-contain rounded-full shadow-lg transition-transform duration-300 hover:scale-105"
/>
            <span
              className="text-2xl font-bold font-[Poppins] transition-colors"
              style={{ color: isScrolled ? "#1F2937" : "white" }}
            >
              Phil<span style={{ color: "var(--accent-color)" }}>Dev</span>
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`transition-colors duration-200 capitalize font-medium font-[Inter] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 rounded ${
                  isScrolled
                    ? "text-gray-700 hover:text-teal-600"
                    : "text-white hover:text-teal-200"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
              </motion.button>
            ))}
          </div>

          {/* Mobile Toggle */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 rounded ${
              isScrolled
                ? "text-gray-700 hover:text-teal-600"
                : "text-white hover:text-teal-200"
            }`}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            initial={false}
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Mobile Navigation Panel */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="mobile-nav"
              className="md:hidden bg-white/95 backdrop-blur-md rounded-xl mt-2 py-4 shadow-lg"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left px-6 py-3 text-gray-700 hover:text-teal-700 hover:bg-teal-50 transition-all duration-200 capitalize font-medium font-[Inter] focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {item.label}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navigation;
