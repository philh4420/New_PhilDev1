import { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  // Determine context-aware message
  const getContextMessage = () => {
    const path = location.pathname.toLowerCase();
    if (path.includes("blog")) return "This blog post might have been moved.";
    if (path.includes("project")) return "Hmm... that project doesn’t seem to exist.";
    if (path.includes("dashboard")) return "Looks like this dashboard route is missing.";
    return "The page you’re looking for doesn’t exist.";
  };

  useEffect(() => {
    console.error("404 Error: Invalid route accessed:", location.pathname);

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          navigate("/");
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [location.pathname, navigate]);

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-white to-teal-50 px-4"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="text-center max-w-lg">
        {/* 🎨 SVG Illustration */}
        <svg
          viewBox="0 0 512 512"
          className="w-40 h-40 mx-auto mb-6 animate-float"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
        >
          <circle cx="256" cy="256" r="240" fill="#E0F7FA" />
          <path
            d="M168 224h24v96h-24v-96zm152 0h24v96h-24v-96zm-96-40h64v24h-64v-24z"
            fill="#26C6DA"
          />
          <circle cx="256" cy="256" r="100" stroke="#00ACC1" strokeWidth="8" />
          <circle cx="256" cy="256" r="10" fill="#00ACC1" />
        </svg>

        {/* 404 Text */}
        <h1 className="text-6xl font-extrabold text-teal-500 mb-4">404</h1>

        {/* Message */}
        <p className="text-xl text-gray-700 mb-3 font-medium">
          {getContextMessage()}
        </p>

        {/* Redirect Info */}
        <p className="text-sm text-gray-500 mb-6">
          You’ll be redirected to the homepage in{" "}
          <span className="font-semibold">{countdown}</span> second
          {countdown === 1 ? "" : "s"}.
        </p>

        {/* Manual Link Fallback */}
        <Link
          to="/"
          className="inline-block bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-6 py-3 rounded-full transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-300"
        >
          Go Home Now
        </Link>
      </div>
    </motion.div>
  );
};

export default NotFound;
