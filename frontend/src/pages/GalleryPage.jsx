import React, { useState } from "react";
import { GALLERY_IMAGES } from "../data/mockData.js";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Sparkles,
} from "lucide-react";

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeModalIndex, setActiveModalIndex] = useState(null);

  // Categories list
  const categories = [
    { id: "all", label: "All Showcase" },
    { id: "stage", label: "Stage & Mandap" },
    { id: "dining", label: "Dining & Banquet" },
    { id: "lawn", label: "Outdoor Lawn" },
    { id: "lighting", label: "Lighting & Ambience" },
    { id: "entry", label: "Grand Entry" },
  ];

  // Filter Images
  const filteredImages =
    selectedCategory === "all"
      ? GALLERY_IMAGES
      : GALLERY_IMAGES.filter((img) => img.category === selectedCategory);

  // Modal Navigation
  const handlePrev = (e) => {
    e.stopPropagation();
    setActiveModalIndex((prev) =>
      prev === 0 ? filteredImages.length - 1 : prev - 1,
    );
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setActiveModalIndex((prev) =>
      prev === filteredImages.length - 1 ? 0 : prev + 1,
    );
  };

  // Variants for Scroll 3D Flip Animation
  const cardVariants = {
    hidden: {
      opacity: 0,
      rotateX: -30,
      y: 50,
      scale: 0.95,
    },
    visible: (index) => ({
      opacity: 1,
      rotateX: 0,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: (index % 4) * 0.08,
        ease: [0.215, 0.61, 0.355, 1],
      },
    }),
    exit: {
      opacity: 0,
      scale: 0.85,
      transition: { duration: 0.25 },
    },
  };

  return (
    <div className="pt-8 pb-24 max-w-7xl mx-auto px-4 sm:px-6 font-sans">
      {/* Animated Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl mx-auto mb-12"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold uppercase tracking-widest mb-4 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-rose-400" />
          <span>Visual Portfolio</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white tracking-tight mb-4">
          Venue{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-pink-400 to-rose-300">
            Gallery
          </span>
        </h1>
        <p className="text-slate-400 text-sm sm:text-base">
          Explore our breathtaking wedding setups, luxury banquet dining, and
          ambient outdoor lightings.
        </p>
      </motion.div>

      {/* Filter Category Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="flex items-center justify-center gap-2 flex-wrap mb-12"
      >
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`relative px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-300 capitalize cursor-pointer backdrop-blur-md ${
              selectedCategory === cat.id
                ? "bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-lg shadow-rose-600/25 scale-105"
                : "bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </motion.div>

      {/* Scroll Animated Flip Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredImages.map((img, index) => (
            <motion.div
              layout
              key={img.id}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-40px" }} // <-- CHANGED HERE: repeat animation on scroll up/down
              exit="exit"
              whileHover={{
                y: -8,
                transition: { duration: 0.3 },
              }}
              onClick={() => setActiveModalIndex(index)}
              className="group relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-800/80 hover:border-rose-500/50 transition-colors duration-300 cursor-pointer shadow-xl hover:shadow-rose-500/10"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={img.src}
                  alt={img.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                {/* Hover Maximize Badge */}
                <div className="absolute top-3 right-3 p-2.5 rounded-2xl bg-slate-900/60 backdrop-blur-md text-white border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <Maximize2 className="w-4 h-4 text-rose-300" />
                </div>

                {/* Category Tag */}
                <div className="absolute top-3 left-3 px-3 py-1 rounded-xl bg-slate-900/70 backdrop-blur-md text-[10px] font-bold text-rose-300 uppercase tracking-wider border border-white/10">
                  {img.category}
                </div>
              </div>

              {/* Title Bar */}
              <div className="p-4 bg-slate-900/90 backdrop-blur-md border-t border-slate-800/50 flex justify-between items-center">
                <h3 className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">
                  {img.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeModalIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
            onClick={() => setActiveModalIndex(null)}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveModalIndex(null)}
              className="absolute top-6 right-6 p-3 rounded-full bg-slate-800/80 hover:bg-slate-700 text-white border border-slate-700 transition z-50 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={handlePrev}
              className="absolute left-4 sm:left-8 p-3 rounded-full bg-slate-800/80 hover:bg-slate-700 text-white border border-slate-700 transition z-50 cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 sm:right-8 p-3 rounded-full bg-slate-800/80 hover:bg-slate-700 text-white border border-slate-700 transition z-50 cursor-pointer"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Popup Card */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-5xl max-h-[85vh] w-full bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={filteredImages[activeModalIndex].src}
                alt={filteredImages[activeModalIndex].title}
                className="w-full max-h-[75vh] object-contain bg-slate-950"
              />
              <div className="p-6 bg-slate-900 flex items-center justify-between border-t border-slate-800">
                <div>
                  <span className="text-xs text-rose-400 font-bold uppercase tracking-wider">
                    {filteredImages[activeModalIndex].category}
                  </span>
                  <h2 className="text-lg font-bold text-white">
                    {filteredImages[activeModalIndex].title}
                  </h2>
                </div>
                <span className="text-xs font-semibold text-slate-500 bg-slate-800 px-3 py-1.5 rounded-full">
                  {activeModalIndex + 1} / {filteredImages.length}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
