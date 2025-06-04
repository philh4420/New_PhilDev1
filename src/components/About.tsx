import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const About = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const techStyles = {
    HTML: "bg-orange-600/20 text-orange-700",
    CSS: "bg-blue-600/20 text-blue-700",
    JS: "bg-yellow-500/20 text-yellow-700",
    SQL: "bg-purple-600/20 text-purple-700",
  };

  return (
    <motion.section
      ref={sectionRef}
      id="about"
      className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-teal-50/30"
      role="region"
      aria-labelledby="about-heading"
    >
      {/* Decorative Floating Background */}
      <motion.div
        className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-teal-400/10 via-cyan-300/5 to-blue-400/10 rounded-full blur-3xl pointer-events-none"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 1 }}
      />
      <motion.div
        className="absolute -bottom-40 -left-40 w-72 h-72 bg-gradient-to-tr from-amber-200/10 via-orange-100/5 to-teal-200/10 rounded-full blur-3xl pointer-events-none"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 1.2, delay: 0.2 }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Avatar Card */}
          <motion.div
            className="flex justify-center"
            initial={{ x: -50, opacity: 0, scale: 0.95 }}
            animate={isInView ? { x: 0, opacity: 1, scale: 1 } : {}}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          >
            <motion.div
              className="relative group w-72 sm:w-80 h-80 rounded-3xl bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border border-white/20 shadow-2xl overflow-hidden transition-transform duration-700 hover:scale-105 hover:rotate-1 focus:outline-none focus-visible:ring-4 focus-visible:ring-yellow-300"
              tabIndex={0}
              whileHover={{ scale: 1.05, rotate: 1 }}
              role="img"
              aria-label="Profile photo with frontend tech stack"
            >
              <div className="w-full h-full flex flex-col items-center justify-center z-10 p-6 sm:p-8 relative">
                <motion.div
                  className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden shadow-xl mb-4"
                  whileHover={{ scale: 1.1 }}
                >
                  <img
                    src="/assets/img/profile-pic-1.webp"
                    alt="Phil's avatar"
                    className="w-full h-full object-cover rounded-full"
                    loading="lazy"
                  />
                </motion.div>
                <div className="px-4 py-1.5 rounded-full bg-white/30 backdrop-blur-md border border-white/40 text-xs sm:text-sm font-semibold text-gray-800 mb-3">
                  Frontend Developer
                </div>
                <div className="flex gap-2 sm:gap-3 opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                  {["HTML", "CSS", "JS", "SQL"].map((tech) => (
                    <div
                      key={tech}
                      className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center text-xs sm:text-sm font-bold ${techStyles[tech as keyof typeof techStyles]}`}
                      aria-label={tech}
                    >
                      {tech}
                    </div>
                  ))}
                </div>
              </div>

              {/* Decorative Pulse Particles */}
              <div className="absolute top-4 right-4 w-2 h-2 bg-teal-400 rounded-full opacity-60 animate-pulse" />
              <div className="absolute bottom-6 left-6 w-1.5 h-1.5 bg-amber-400 rounded-full opacity-70 animate-pulse delay-1000" />
              <div className="absolute top-1/3 left-4 w-1 h-1 bg-blue-400 rounded-full opacity-50 animate-pulse delay-2000" />
            </motion.div>
          </motion.div>
                    {/* Text Column */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{ type: "spring", stiffness: 90, damping: 18, delay: 0.1 }}
          >
            <header className="mb-6 sm:mb-8">
              <h2
                id="about-heading"
                className="text-4xl sm:text-6xl font-bold font-[Poppins] bg-gradient-to-r from-gray-900 via-teal-700 to-gray-900 bg-clip-text text-transparent mb-4"
              >
                About Me
              </h2>
              <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-teal-500 to-amber-400 rounded-full" />
            </header>

            <div className="space-y-5 sm:space-y-6 text-base sm:text-lg font-[Inter] leading-relaxed text-gray-700">
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : {}}
                transition={{ delay: 0.2 }}
              >
                I’m a <span className="font-semibold text-teal-700">creative frontend developer</span> focused on building accessible, high-performance websites with clean, scalable code.
              </motion.p>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : {}}
                transition={{ delay: 0.3 }}
              >
                I’ve worked across startups and agencies, shipping projects with HTML, Tailwind, and modern frameworks like React and Svelte.
              </motion.p>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : {}}
                transition={{ delay: 0.4 }}
              >
                On the backend, I’m comfortable with Python and MySQL — enabling full-stack delivery and better collaboration with backend teams.
              </motion.p>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : {}}
                transition={{ delay: 0.5 }}
                className="text-gray-600 italic"
              >
                When I’m not coding, you’ll find me leveling up in Division 2 or honing my 8-ball pool skills.
              </motion.p>
            </div>

            <motion.div
              className="mt-6 sm:mt-8"
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
            >
              <button
                onClick={() =>
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                }
                className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 rounded-full bg-gradient-to-r from-teal-600 to-teal-700 text-white font-medium hover:from-teal-700 hover:to-teal-800 transition-transform duration-300 hover:scale-105 shadow-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
              >
                Let’s Build Something Amazing
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default About;