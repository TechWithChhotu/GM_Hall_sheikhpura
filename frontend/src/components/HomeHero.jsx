import React, { useState, useEffect } from "react";
import { MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollTo } from "../hooks/useScrollTo";

const HomeHero = () => {
  // Background images array (Wedding, Birthday, Anniversary, Corporate Party)
  const heroImages = [
    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1920", // Wedding Stage
    "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=1920", // Party / Reception Lights
    "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&q=80&w=1920", // Birthday Celebration
    "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1920", // Anniversary Banquet
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const scrollTo = useScrollTo();

  // Change background image every 6 seconds for a slow, cinematic drone feel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [heroImages.length]);

  // Content Text Staggered Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="relative w-full min-h-[550px] flex items-center justify-center overflow-hidden bg-slate-950 py-16 px-4">
      {/* 1. Cinematic Drone Shot Background Animation */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentImageIndex}
          initial={{ opacity: 0, scale: 1.0, x: "-2%", y: "-2%" }}
          animate={{
            opacity: 1,
            scale: 1.15, // Slow Drone Zoom In
            x: "2%", // Horizontal Pan
            y: "2%", // Vertical Tilt
          }}
          exit={{ opacity: 0, scale: 1.2 }}
          transition={{
            duration: 6.5,
            ease: "linear",
            opacity: { duration: 1.5, ease: "easeInOut" },
          }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${heroImages[currentImageIndex]}')` }}
        />
      </AnimatePresence>

      {/* 2. Dark Overlay Gradient - High Contrast for Text */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/75 to-slate-950/85 backdrop-blur-[2px]" />

      {/* 3. Hero Content Overlay */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-40px" }}
        className="relative z-10 max-w-4xl mx-auto text-center space-y-6"
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="inline-block">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-rose-500/30 backdrop-blur-md shadow-lg">
            <MapPin className="w-4 h-4 text-rose-500" />
            <span className="text-xs sm:text-sm font-semibold text-slate-200">
              Prime Location: Station Road, Sheikhpura, Bihar (811105)
            </span>
          </div>
        </motion.div>

        {/* Dynamic Heading */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight"
        >
          Sheikhpura's Most Premium{" "}
          <span className="bg-gradient-to-r from-rose-500 via-pink-300 to-rose-500 bg-clip-text text-transparent">
            Marriage & Event Venue
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto font-normal leading-relaxed"
        >
          Experience royal celebrations at{" "}
          <strong className="text-white">GM Marriage Hall</strong> with luxury
          AC banquet halls, spacious lawn facilities, and dedicated parking near
          Sheikhpura Hill.
        </motion.p>

        {/* Call To Action Button */}
        <motion.div variants={itemVariants} className="pt-2">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => {
              // 1. Address bar URL me #booking-calendar append karein
              window.history.pushState(null, "", "#booking-calendar");

              // 2. Element ko scroll karein
              const targetElement = document.getElementById("booking-calendar");
              if (targetElement) {
                targetElement.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }
            }}
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold text-sm shadow-xl shadow-rose-950/50 hover:shadow-rose-600/30 transition-all cursor-pointer"
          >
            Check Available Dates
          </motion.button>
        </motion.div>
      </motion.div>

      {/* 4. Small Dots Indicator at Bottom */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ delay: 0.4 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2"
      >
        {heroImages.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentImageIndex(idx)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              idx === currentImageIndex
                ? "w-6 bg-rose-500"
                : "w-1.5 bg-slate-600/60 hover:bg-slate-400"
            }`}
          />
        ))}
      </motion.div>
    </section>
  );
};

export default HomeHero;
