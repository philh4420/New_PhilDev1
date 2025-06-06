import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {
  Palette,
  Code,
  Zap,
  Gauge,
  Paintbrush,
  CodeXml,
  FileCode,
  Layers,
  Search,
  Wand2,
  Bolt,
  Sparkles,
  BrainCircuit,
} from "lucide-react";

interface Service {
  icon: React.ElementType;
  title: string;
  description: string;
  gradient: string;
  bgColor: string;
  tags: string[];
}

const Services = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const services = [
  {
    icon: Palette,
    title: "Modern Web Design",
    description: "Responsive, accessible interfaces aligned with 2025 trends.",
    gradient: "from-pink-500/20 to-rose-500/20",
    bgColor: "bg-pink-600",
    tags: ["HTML", "CSS", "Design"],
  },
  {
    icon: Code,
    title: "Custom Development",
    description: "Hand-crafted HTML/CSS/JS with clean, SEO-friendly code.",
    gradient: "from-blue-500/20 to-cyan-500/20",
    bgColor: "bg-blue-600",
    tags: ["Tailwind", "Next.js", "SEO"],
  },
  {
    icon: Zap,
    title: "Interactive Experiences",
    description: "Smooth micro-interactions and high-conversion flows.",
    gradient: "from-yellow-400/20 to-orange-400/20",
    bgColor: "bg-yellow-500",
    tags: ["Framer Motion", "GSAP", "UX"],
  },
  {
    icon: Gauge,
    title: "Performance Optimization",
    description: "Lighthouse-perfect speed & Core Web Vitals mastery.",
    gradient: "from-purple-500/20 to-indigo-500/20",
    bgColor: "bg-purple-600",
    tags: ["Lighthouse", "Next.js", "Lazy Load"],
  },
  {
    icon: Paintbrush,
    title: "Creative UI Systems",
    description: "Design systems built for flexibility and brand consistency.",
    gradient: "from-orange-400/20 to-amber-400/20",
    bgColor: "bg-orange-500",
    tags: ["Style Guide", "UI/UX" , "Design Systems"],
  },
  {
    icon: BrainCircuit, // ✅ Replaces Sparkles
    title: "AI-Enhanced Development",
    description: "Next-gen workflows and intelligent automation.",
    gradient: "from-teal-500/20 to-cyan-500/20",
    bgColor: "bg-teal-600",
    tags: ["AI", "OpenAI", "JavaScript", "MySQL"],
  },
];

  const tagIcons: { [key: string]: React.ElementType } = {
    HTML: CodeXml,
    CSS: Paintbrush,
    Figma: Sparkles,
    JavaScript:  FileCode,
    Tailwind: Layers,
    "Next.js": Layers,
    SEO: Search,
    UX: Wand2,
    "Framer Motion": Bolt,
    GSAP: Bolt,
    Lighthouse: Gauge,
    "Lazy Load": Gauge,
    AI: BrainCircuit,
    OpenAI: BrainCircuit,
    Automation: Sparkles,
    MySQL: Gauge,
  };

  const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
    tablet: { breakpoint: { max: 1024, min: 768 }, items: 2 },
    mobile: { breakpoint: { max: 768, min: 0 }, items: 1 },
  };

  const renderCard = (service: Service, index: number) => (
    <motion.article
      key={index}
      className="group relative bg-white/80 dark:bg-slate-900/60 border border-white/20 backdrop-blur-xl rounded-2xl shadow-lg p-6 sm:p-7 flex flex-col h-full transition-all"
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: index * 0.15,
        duration: 0.6,
        ease: "easeOut",
      }}
      whileHover={{ scale: 1.02, y: -6 }}
    >
      <div
        className={`absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${service.gradient}`}
      />
      <div className="relative z-10 flex flex-col gap-4">
        <div className={`w-12 h-12 ${service.bgColor} text-white flex items-center justify-center rounded-xl shadow-md`}>
          <service.icon className="w-5 h-5" />
        </div>

        <div>
          <h3 className="text-lg font-semibold font-[Poppins] text-gray-900 dark:text-white">
            {service.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 font-[Inter] mt-1">
            {service.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mt-auto">
          {service.tags.map((tag, i) => {
            const Icon = tagIcons[tag] || Sparkles;
            return (
              <span
                key={i}
                className={`flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full ${service.bgColor} text-white bg-opacity-90`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tag}
              </span>
            );
          })}
        </div>
      </div>
    </motion.article>
  );

  return (
    <section
      ref={sectionRef}
      id="services"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-slate-50/60 to-teal-50/40 relative overflow-hidden"
    >
      {!prefersReducedMotion && (
        <>
          <motion.div
            className="absolute top-24 right-10 w-64 h-64 bg-gradient-to-br from-cyan-100/20 to-blue-200/30 rounded-full blur-3xl pointer-events-none"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1 }}
          />
          <motion.div
            className="absolute bottom-20 left-10 w-80 h-80 bg-gradient-to-tr from-amber-100/15 via-orange-50/10 to-pink-100/20 rounded-full blur-3xl pointer-events-none"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.2 }}
          />
        </>
      )}

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2
            id="services-heading"
            className="text-4xl sm:text-5xl font-bold font-[Poppins] text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-teal-600 to-gray-900"
          >
            What I Offer
          </h2>
          <div className="w-24 h-1 mx-auto mt-4 bg-gradient-to-r from-teal-400 via-yellow-400 to-orange-400 rounded-full lg:w-50" />
          <p className="text-lg sm:text-xl text-gray-700 mt-4 font-[Inter]">
            Future-ready solutions tailored to your next leap.
          </p>
        </motion.div>

        <div className="block md:hidden mb-10">
          <Carousel
            responsive={responsive}
            infinite
            autoPlay
            autoPlaySpeed={5000}
            arrows={false}
            showDots
            containerClass="carousel-container"
            itemClass="px-2"
          >
            {services.map((service, index) => (
              <div key={index} className="pb-4">
                {renderCard(service, index)}
              </div>
            ))}
          </Carousel>
        </div>

        <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => renderCard(service, index))}
        </div>
      </div>
    </section>
  );
};

export default Services;