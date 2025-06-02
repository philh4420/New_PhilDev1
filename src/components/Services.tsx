import { Palette, Code, Zap, Globe, Gauge, Sparkles } from "lucide-react";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const Services = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const services = [
    {
      icon: Palette,
      title: "Modern Web Design",
      description: "Responsive, accessible interfaces aligned with 2025 trends.",
      gradient: "from-pink-500/20 to-rose-500/20",
      iconColor: "text-pink-700",
      bgColor: "bg-pink-600"
    },
    {
      icon: Code,
      title: "Custom Development",
      description: "Hand-crafted HTML/CSS/JS with clean, SEO-friendly code.",
      gradient: "from-blue-500/20 to-cyan-500/20",
      iconColor: "text-blue-700",
      bgColor: "bg-blue-600"
    },
    {
      icon: Zap,
      title: "Interactive Experiences",
      description: "Smooth micro-interactions and high-conversion flows.",
      gradient: "from-yellow-400/20 to-orange-400/20",
      iconColor: "text-yellow-700",
      bgColor: "bg-yellow-500"
    },
    {
      icon: Globe,
      title: "Full-Stack Solutions",
      description: "Complete solutions with Python, MongoDB & more.",
      gradient: "from-green-500/20 to-emerald-500/20",
      iconColor: "text-green-700",
      bgColor: "bg-green-600"
    },
    {
      icon: Gauge,
      title: "Performance Optimization",
      description: "Lighthouse-perfect speed & Core Web Vitals mastery.",
      gradient: "from-purple-500/20 to-indigo-500/20",
      iconColor: "text-purple-700",
      bgColor: "bg-purple-600"
    },
    {
      icon: Sparkles,
      title: "AI-Enhanced Development",
      description: "Next-gen workflows and intelligent automation.",
      gradient: "from-teal-500/20 to-cyan-500/20",
      iconColor: "text-teal-700",
      bgColor: "bg-teal-600"
    }
  ];

  return (
    <section
      ref={sectionRef}
      id="services"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-slate-50/50 to-teal-50/30 relative overflow-hidden"
      role="region"
      aria-labelledby="services-heading"
    >
      {/* Background Decoration */}
      <motion.div
        className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-br from-teal-200/20 via-cyan-100/10 to-blue-200/20 rounded-full blur-3xl pointer-events-none"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1 }}
      />
      <motion.div
        className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-tr from-amber-100/15 via-orange-50/10 to-pink-100/15 rounded-full blur-3xl pointer-events-none"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1.2, delay: 0.2 }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Title */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: "spring", stiffness: 80, damping: 12 }}
        >
          <h2
            id="services-heading"
            className="text-5xl sm:text-6xl font-bold font-[Poppins] bg-gradient-to-r from-gray-900 via-teal-700 to-gray-900 bg-clip-text text-transparent mb-6"
          >
            What I Offer
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-teal-500 to-amber-400 rounded-full mx-auto mb-4" />
          <p className="text-xl text-gray-700 max-w-2xl mx-auto font-[Inter]">
            Future-ready solutions tailored for your next leap.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.article
              key={index}
              tabIndex={0}
              className="group relative bg-white/60 backdrop-blur-xl rounded-3xl p-8 border border-white/30 shadow-xl focus:outline-none focus:ring-4 focus:ring-teal-200"
              whileHover={{ y: -10, scale: 1.02 }}
              initial={{ opacity: 0, y: 80 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: index * 0.12,
                type: "spring",
                stiffness: 100,
                damping: 18
              }}
              role="article"
              aria-label={service.title}
            >
              {/* Gradient Hover Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none`}
              />

              {/* Icon + Text */}
              <div className="relative z-10">
                <div
                  className={`w-16 h-16 ${service.bgColor} rounded-2xl flex items-center justify-center text-white shadow-lg mb-6 transition-transform duration-300 group-hover:scale-110`}
                >
                  <service.icon className="w-8 h-8" />
                </div>

                <h3 className="text-xl font-bold text-gray-800 font-[Poppins] mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-700 font-[Inter] text-base leading-relaxed">
                  {service.description}
                </p>

                <div className={`mt-4 h-0.5 w-0 group-hover:w-full ${service.bgColor} transition-all duration-500 rounded-full`} />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
