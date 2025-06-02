import React, { useRef, useState, useMemo } from "react";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, useInView } from "framer-motion";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";

interface Project {
  title: string;
  description: string;
  tech: string[];
  image: string;
  liveUrl: string;
}

const Portfolio: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedTech, setSelectedTech] = useState<string[]>([]);
  const [lightboxIsOpen, setLightboxIsOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<number>(0);

  const projects: Project[] = useMemo(() => [
    {
      title: "E-commerce Platform",
      description: "Modern shopping experience with responsive design.",
      tech: ["HTML5", "CSS3", "JavaScript"],
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
      liveUrl: "#",
    },
    {
      title: "Restaurant Website",
      description: "Elegant dining website with interactive menu.",
      tech: ["HTML5", "CSS Grid", "JavaScript"],
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop",
      liveUrl: "#",
    },
    {
      title: "Creative Agency",
      description: "Bold portfolio site with smooth animations.",
      tech: ["CSS3", "JavaScript", "GSAP"],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
      liveUrl: "#",
    },
    {
      title: "Business Landing",
      description: "Professional website with clean UI and UX.",
      tech: ["HTML5", "Tailwind CSS", "JavaScript"],
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop",
      liveUrl: "#",
    },
    {
      title: "SaaS Dashboard",
      description: "Intuitive dashboards with clean data visualization.",
      tech: ["CSS3", "JavaScript", "Chart.js"],
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=400&fit=crop",
      liveUrl: "#",
    },
    {
      title: "Portfolio Site",
      description: "Minimalist, mobile-first showcase site.",
      tech: ["HTML5", "CSS Grid", "Vanilla JS"],
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
      liveUrl: "#",
    },
  ], []);

  const allTech = useMemo(() => {
    const set = new Set<string>();
    projects.forEach(p => p.tech.forEach(t => set.add(t)));
    return Array.from(set).sort();
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (selectedTech.length === 0) return projects;
    return projects.filter(p =>
      selectedTech.every(t => p.tech.includes(t))
    );
  }, [projects, selectedTech]);

  const handleFilterToggle = (tech: string) => {
    setSelectedTech(prev =>
      prev.includes(tech)
        ? prev.filter(t => t !== tech)
        : [...prev, tech]
    );
  };

  const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
    tablet: { breakpoint: { max: 1024, min: 768 }, items: 2 },
    mobile: { breakpoint: { max: 768, min: 0 }, items: 1 },
  };

  const openLightbox = (index: number) => {
    setCurrentImage(index);
    setLightboxIsOpen(true);
  };

  const closeLightbox = () => {
    setLightboxIsOpen(false);
  };

  return (
    <motion.section
      ref={sectionRef}
      id="portfolio"
      className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-slate-50"
      role="region"
      aria-labelledby="portfolio-heading"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        visible: { transition: { staggerChildren: 0.2 } },
        hidden: {},
      }}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          variants={{
            hidden: { y: 40, opacity: 0 },
            visible: { y: 0, opacity: 1, transition: { duration: 0.8 } },
          }}
        >
          <h2
            id="portfolio-heading"
            className="text-5xl font-bold text-gray-900 font-[Poppins] mb-4"
          >
            Selected Projects
          </h2>
          <p className="text-xl text-gray-700 font-[Inter] max-w-3xl mx-auto">
            A curated selection of my recent frontend work emphasizing speed, style, and accessibility.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {allTech.map((tech) => (
            <button
              key={tech}
              onClick={() => handleFilterToggle(tech)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                selectedTech.includes(tech)
                  ? "bg-teal-600 text-white border-teal-600"
                  : "bg-white text-gray-700 border-gray-300 hover:border-teal-500"
              }`}
            >
              {tech}
            </button>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="block md:hidden">
          <Carousel responsive={responsive} infinite autoPlay autoPlaySpeed={4000}>
            {filteredProjects.map((project, index) => (
              <div key={index} className="px-2">
                <ProjectCard
                  project={project}
                  hovered={false}
                  onClick={() => openLightbox(index)}
                />
              </div>
            ))}
          </Carousel>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              whileHover={{ scale: 1.02 }}
              className="group h-full"
              onClick={() => openLightbox(index)}
            >
              <ProjectCard
                project={project}
                hovered={hoveredIndex === index}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {lightboxIsOpen && (
        <Lightbox
          open={lightboxIsOpen}
          close={closeLightbox}
          index={currentImage}
          slides={filteredProjects.map((p) => ({
            src: p.image,
            title: p.title,
            description: p.description,
          }))}
          plugins={[Captions]}
          captions={{
            descriptionTextAlign: "center",
            descriptionMaxLines: 3,
          }}
        />
      )}
    </motion.section>
  );
};

interface ProjectCardProps {
  project: Project;
  hovered: boolean;
  onClick?: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, hovered, onClick }) => (
  <article
    tabIndex={0}
    className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all transform ring-offset-2 focus:ring-2 focus:ring-teal-400 focus:outline-none flex flex-col h-full"
    onClick={onClick}
  >
    <div className="relative w-full aspect-video overflow-hidden rounded-t-2xl">
      <LazyLoadImage
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        effect="blur"
        style={{
          filter: hovered ? "brightness(0.9) saturate(1.1)" : "brightness(1)",
        }}
      />
      <div
        className={`absolute inset-0 flex items-center justify-center bg-black/60 transition-opacity duration-300 ${
          hovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <Button
          size="sm"
          className="bg-white text-teal-900 font-semibold shadow hover:bg-teal-600 hover:text-white transition-all"
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          View Project
        </Button>
      </div>
    </div>

    <div className="p-6 flex-1 flex flex-col justify-between">
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-gray-900 font-[Poppins] min-h-[3rem]">
          {project.title}
        </h3>
        <p className="text-gray-600 font-[Inter] text-sm line-clamp-3">{project.description}</p>
      </div>
      <div className="flex flex-wrap gap-2 mt-auto max-h-[2.5rem] overflow-hidden">
        {project.tech.slice(0, 4).map((tech, i) => (
          <span
            key={i}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
              hovered ? "bg-teal-600 text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  </article>
);

export default Portfolio;