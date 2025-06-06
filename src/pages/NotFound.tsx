import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Player } from "@lottiefiles/react-lottie-player";
import { useToast } from "@/hooks/use-toast";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);
  const { toast } = useToast();
  const fallbackRef = useRef<HTMLVideoElement | null>(null);

  const getContextMessage = () => {
    const path = location.pathname.toLowerCase();
    if (path.includes("blog")) return "This blog post might have been moved.";
    if (path.includes("project"))
      return "That project might not exist anymore.";
    if (path.includes("dashboard")) return "Dashboard route not found.";
    return "The page you’re looking for doesn’t exist.";
  };

  // Toast + Countdown
  useEffect(() => {
    if (!location.pathname.toLowerCase().includes("notfound")) {
      console.warn("[404] Invalid route accessed:", location.pathname);
    }

    const visits =
      parseInt(sessionStorage.getItem("notfound-visits") || "0", 10) + 1;
    sessionStorage.setItem("notfound-visits", visits.toString());

    if (visits > 1) {
      toast({
        title: "Lost again?",
        description: "You've hit a broken link more than once.",
        variant: "info",
      });
    }

    const timer = setInterval(() => {
      setCountdown((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [location.pathname, toast]);

  // Redirect to homepage when countdown hits 0
  useEffect(() => {
    if (countdown === 0) {
      navigate("/");
    }
  }, [countdown, navigate]);

  return (
    <AnimatePresence mode="wait">
      <motion.main
        key="notfound"
        className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 bg-gradient-to-br from-slate-100 via-white to-teal-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 overflow-hidden"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        {/* 🫧 Animated Background */}
        <div className="absolute inset-0 pointer-events-none -z-10">
          <motion.div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[420px] h-[420px] bg-teal-300/20 dark:bg-teal-500/10 blur-3xl rounded-full"
            animate={{ y: [0, 25, 0] }}
            transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
          />
        </div>

        {/* 📦 Toast Layer - ensures z-index priority */}
        <div className="absolute top-0 left-0 w-full z-50 pointer-events-none" />

        {/* 📦 Main Content */}
        <div className="text-center max-w-xl w-full z-10">
          {/* 🎞 Lottie Animation or fallback */}
          <div className="w-64 h-64 mx-auto mb-6 relative">
            <Player
              autoplay
              loop
              src="/lottie/404.json"
              className="w-full h-full"
              onError={() => {
                if (fallbackRef.current) {
                  fallbackRef.current.style.display = "block";
                }
              }}
            />
            <video
              ref={fallbackRef}
              src="/lottie/404.webm"
              className="w-full h-full absolute top-0 left-0 hidden"
              autoPlay
              loop
              muted
              playsInline
            />
          </div>

          {/* ✨ Error Title */}
          <h1 className="text-6xl sm:text-7xl font-extrabold text-teal-600 dark:text-yellow-400 mb-4 tracking-tight">
            404
          </h1>

          {/* 🧠 Smart Message */}
          <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 font-medium mb-4">
            {getContextMessage()}
          </p>

          {/* ⏳ Countdown Info */}
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            Redirecting to the homepage in{" "}
            <span className="font-semibold">{countdown}</span> second
            {countdown !== 1 && "s"}...
          </p>

          {/* 🚪 Manual Return Button */}
          <Link
            to="/"
            className="inline-block bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-300 dark:focus:ring-offset-slate-900"
          >
            Go Home Now
          </Link>
        </div>
      </motion.main>
    </AnimatePresence>
  );
};

export default NotFound;
