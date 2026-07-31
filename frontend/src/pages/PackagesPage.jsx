import React from "react";
import { PACKAGES } from "../data/mockData.js";
import { motion } from "framer-motion";
import { Check, Sparkles, Star, ArrowRight } from "lucide-react";

export default function PackagesPage() {
  // 3D Flip Variant with bidirectional scroll trigger
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
        delay: index * 0.12,
        ease: [0.215, 0.61, 0.355, 1],
      },
    }),
  };

  return (
    <div className="pt-8 pb-24 max-w-7xl mx-auto px-4 sm:px-6 font-sans">
      {/* Animated Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl mx-auto mb-16"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold uppercase tracking-widest mb-4 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-rose-400" />
          <span>Transparent Pricing</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white tracking-tight mb-4">
          Our Wedding{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-pink-400 to-rose-300">
            Packages
          </span>
        </h1>
        <p className="text-slate-400 text-sm sm:text-base">
          Choose the perfect venue package tailored for your grand celebration,
          intimate gathering, or reception.
        </p>
      </motion.div>

      {/* Package Cards Grid */}
      <div className="grid md:grid-cols-3 gap-8 relative items-stretch">
        {PACKAGES.map((pkg, index) => {
          const isPopular = pkg.popular;

          return (
            <motion.div
              key={pkg.id}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-40px" }} // Both direction scroll trigger
              whileHover={{
                y: -10,
                transition: { duration: 0.3 },
              }}
              className={`relative bg-slate-900/90 backdrop-blur-xl border rounded-3xl p-8 flex flex-col justify-between transition-colors duration-300 shadow-xl ${
                isPopular
                  ? "border-rose-500/80 shadow-rose-500/10 ring-1 ring-rose-500/30"
                  : "border-slate-800 hover:border-rose-500/50"
              }`}
            >
              {/* Popular Badge */}
              {isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-rose-600/30 flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  Most Popular
                </div>
              )}

              <div>
                {/* Package Name & Price */}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {pkg.name}
                  </h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-400 to-rose-300">
                      {pkg.price}
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs sm:text-sm mt-3 leading-relaxed">
                    {pkg.description}
                  </p>
                </div>

                <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent my-6" />

                {/* Features List */}
                <ul className="space-y-3.5 text-sm mb-8">
                  {pkg.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-slate-300 font-medium text-xs sm:text-sm"
                    >
                      <span className="p-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <button
                className={`w-full py-3.5 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                  isPopular
                    ? "bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white shadow-lg shadow-rose-600/25 active:scale-95"
                    : "bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 hover:border-rose-500/30 active:scale-95"
                }`}
                onClick={() =>
                  alert(
                    `Selected package: ${pkg.name}. Redirecting to booking...`,
                  )
                }
              >
                <span>Book Package Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
