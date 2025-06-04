import { Github, Linkedin } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateSize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <motion.footer
      className="relative z-20 backdrop-blur-md bg-white/5 dark:bg-black/20 border-t border-white/10 dark:border-gray-800 shadow-inner shadow-black/10 text-white transition-all duration-500"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-6 py-10 sm:px-8 lg:px-12 flex flex-col sm:flex-row justify-between items-center gap-6 sm:gap-0 flex-wrap">
        {/* Branding */}
        <motion.div
          className="text-center text-black sm:text-left font-[Inter] text-sm sm:text-base tracking-wide"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <span className="font-semibold">© {currentYear} PhilDev</span> – All
          rights reserved.
        </motion.div>

        {/* Social Links */}
        <motion.div
          className="flex justify-center sm:justify-end gap-6"
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
            aria-label="Phil's GitHub"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:text-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded-full transition-all duration-200"
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <Github className="h-6 w-6 sm:h-7 sm:w-7" />
          </motion.a>

          <motion.a
            href="https://linkedin.com/in/philhigdon"
            aria-label="Phil's LinkedIn"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:text-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded-full transition-all duration-200"
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <Linkedin className="h-6 w-6 sm:h-7 sm:w-7" />
          </motion.a>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
