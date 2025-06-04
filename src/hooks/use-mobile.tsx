import { useState, useEffect } from "react";

const MOBILE_BREAKPOINT = 768;
const DEBOUNCE_MS = 150;

export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let timeoutId: NodeJS.Timeout;

    const checkMobile = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
      }, DEBOUNCE_MS);
    };

    // Initial check
    checkMobile();

    window.addEventListener("resize", checkMobile);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  return isMobile;
}