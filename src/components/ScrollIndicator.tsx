"use client";

import { motion } from "framer-motion";

const ScrollIndicator = () => {
  return (
    <motion.div
      className="absolute bottom-20 transform -translate-x-1/2 cursor-pointer group"
      style={{ zIndex: 20 }}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.6 }}
      onClick={() =>
        window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
      }
      role="button"
      aria-label="Scroll down"
    >
      <div className="flex flex-col items-center gap-2 md:gap-3">
        {/* Responsive Mouse Icon */}
        <motion.div
          className="relative w-10 h-14 md:w-14 md:h-20 flex items-center justify-center"
          whileHover={{ scale: 1.05 }}
        >
          <div className="absolute inset-0 border-2 border-emerald-300/40 rounded-xl md:rounded-2xl backdrop-blur-sm transition-all duration-300 group-hover:border-emerald-300/60" />

          <motion.div
            className="w-1.5 h-4 md:h-6 bg-emerald-300 rounded-full absolute top-3 md:top-4"
            animate={{
              y: [0, 8, 0],
              opacity: [1, 0.4, 1],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="absolute inset-0 border-2 md:border-4 border-emerald-300/20 rounded-xl md:rounded-2xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
            }}
          />
        </motion.div>

        {/* Responsive Text & Chevrons */}
        <motion.div
          className="flex flex-col items-center gap-1 md:gap-2"
          animate={{
            y: [0, -3, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <motion.span
            className="text-xs md:text-sm font-medium tracking-wide md:tracking-wider text-emerald-200/90 group-hover:text-emerald-300 transition-colors"
            animate={{
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            Discover More
          </motion.span>

          <div className="flex flex-col items-center gap-0.5 md:gap-1">
            {[0, 1].map((i) => (
              <motion.svg
                key={i}
                className="w-3 h-3 md:w-4 md:h-4 text-emerald-300/60"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={{
                  y: i === 0 ? [0, 3] : [0, 3],
                  opacity: i === 0 ? [1, 0] : [0.6, 0],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </motion.svg>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ScrollIndicator;