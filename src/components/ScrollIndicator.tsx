"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const ScrollIndicator = ({ targetId = null, hideAfterScroll = true }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!hideAfterScroll) return;

    const handleScroll = () => {
      const scrolled = window.scrollY > 100;
      setIsVisible(!scrolled);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hideAfterScroll]);

  const handleClick = () => {
    if (targetId) {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed bottom-16 sm:bottom-20 md:bottom-24 -translate-x-1/2 cursor-pointer group z-20 px-4"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ delay: 1, duration: 0.6 }}
      onClick={handleClick}
      role="button"
      aria-label="Scroll down to next section"
      style={{ willChange: 'transform' }}
    >
      <div className="flex flex-col items-center gap-1 sm:gap-2 md:gap-3">
        {/* Responsive Mouse Icon */}
        <motion.div
          className="relative w-6 h-10 xs:w-7 xs:h-11 sm:w-8 sm:h-12 md:w-12 md:h-16 lg:w-14 lg:h-20 flex items-center justify-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Main mouse body with enhanced contrast */}
          <div className="absolute inset-0 border-2 border-green-600 sm:border-2 md:border-3 rounded-lg sm:rounded-xl md:rounded-2xl bg-white/95 shadow-lg transition-all duration-300 group-hover:border-green-700 group-hover:shadow-xl group-hover:shadow-green-500/30 group-hover:bg-green-50/80" />

          {/* Scrolling dot with better visibility */}
          <motion.div
            className="w-0.5 h-2 xs:w-0.5 xs:h-2.5 sm:w-1 sm:h-3 md:w-1.5 md:h-4 bg-green-600 rounded-full absolute top-1.5 xs:top-2 sm:top-2 md:top-3 shadow-sm"
            animate={{
              y: [0, 4, 0],
              opacity: [1, 0.6, 1],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Enhanced pulse effect */}
          <motion.div
            className="absolute inset-0 border-2 border-green-500 sm:border-2 md:border-3 rounded-lg sm:rounded-xl md:rounded-2xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.4, 0, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
            }}
          />
        </motion.div>

        {/* Text and Chevrons with improved contrast */}
        <motion.div
          className="flex flex-col items-center gap-1 sm:gap-1.5 md:gap-2"
          animate={{
            y: [0, -2, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <motion.span
            className="text-xs xs:text-xs sm:text-sm md:text-base font-semibold tracking-wide text-center text-green-700 group-hover:text-green-800 transition-colors duration-300 px-3 py-1 bg-white/90 rounded-full shadow-md backdrop-blur-sm border border-green-200"
            animate={{
              opacity: [0.9, 1, 0.9],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            Discover More
          </motion.span>

          {/* Enhanced animated chevrons */}
          <div className="flex flex-col items-center gap-0.5 sm:gap-1">
            {[0, 1].map((i) => (
              <motion.svg
                key={i}
                className="w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-green-600 group-hover:text-green-700 transition-colors duration-300 drop-shadow-sm"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={{
                  y: [0, 3, 0],
                  opacity: [0.8, 0.4, 0.8],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: "easeInOut",
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M19 9l-7 7-7-7"
                />
              </motion.svg>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Demo content for testing */}
      {/* <div className="fixed top-0 left-0 w-full h-screen bg-white -z-10"></div>
      <div className="fixed top-4 right-4 text-xs sm:text-sm text-green-700 bg-green-50 border border-green-200 px-3 py-2 rounded-lg shadow-sm max-w-48 text-center">
        Enhanced for white background
      </div> */}
    </motion.div>
  );
};

export default ScrollIndicator;