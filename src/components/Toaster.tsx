import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { X } from "lucide-react";
import clsx from "clsx";

const Toaster = () => {
  const { toasts, dismiss } = useToast();
  const isMobile = useIsMobile();

  const positioningStyles: React.CSSProperties = {
    position: "fixed",
    bottom: isMobile ? "7rem" : "2rem",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 9999,
    width: "100%",
    maxWidth: "24rem", // Tailwind's max-w-sm equivalent
    paddingLeft: "1rem",
    paddingRight: "1rem",
    pointerEvents: "none",
  };

  return (
    <div
      style={positioningStyles}
      role="region"
      aria-live="polite"
      aria-atomic="true"
    >
      <AnimatePresence initial={false}>
        {toasts.map((toast) => {
          const variant = toast.variant ?? "default";

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              drag="x"
              dragElastic={0.3}
              onDragEnd={(e, { offset }) => {
                if (Math.abs(offset.x) > 100) dismiss(toast.id);
              }}
              className={clsx(
                "pointer-events-auto rounded-lg shadow-xl ring-1 backdrop-blur-md mb-3 transition-colors duration-300",
                {
                  "bg-white text-gray-900 dark:bg-gray-900 dark:text-white ring-black/10":
                    variant === "default",
                  "bg-green-100 text-green-900 ring-green-200 dark:bg-green-800 dark:text-white dark:ring-green-600":
                    variant === "success",
                  "bg-red-100 text-red-900 ring-red-200 dark:bg-red-800 dark:text-white dark:ring-red-600":
                    variant === "destructive",
                  "bg-blue-100 text-blue-900 ring-blue-200 dark:bg-blue-800 dark:text-white dark:ring-blue-600":
                    variant === "info",
                }
              )}
            >
              <div className="flex items-start gap-3 p-4">
                <div className="flex-1">
                  {toast.title && (
                    <p className="text-base font-semibold">{toast.title}</p>
                  )}
                  {toast.description && (
                    <p className="text-sm mt-1">{toast.description}</p>
                  )}
                  {toast.action && <div className="mt-3">{toast.action}</div>}
                </div>
                <button
                  onClick={() => dismiss(toast.id)}
                  aria-label="Dismiss"
                  className="shrink-0 p-2 rounded-md hover:bg-black/5 dark:hover:bg-white/10 transition"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default Toaster;