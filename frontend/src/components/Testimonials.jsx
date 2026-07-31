import React, { useState, useEffect } from "react";
import {
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Vikram Kumar",
    role: "Groom's Elder Brother",
    location: "Sheikhpura, Bihar",
    event: "Wedding Celebration",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
    rating: 5,
    text: "GM Marriage Hall me hamari behen ki shaadi thi. Station Road pe hone ki wajah se baarat aur guests ko aane me bohot aasani hui. Divya Raj ji aur unki team ka management super luxury tha! Sheikhpura ka best hall hai.",
  },
  {
    id: 2,
    name: "Anjali Sharma",
    role: "Bride",
    location: "Patna / Sheikhpura",
    event: "Reception Night",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200",
    rating: 5,
    text: "Sheikhpura Hill ka view aur venue ka AC banquet hall bilkul royal lagta hai. Stage decoration aur lighting photo shoot ke liye perfect thi. Everyone complimented the space and luxury feel.",
  },
  {
    id: 3,
    name: "Rajesh Ranjan",
    role: "Business Owner",
    location: "Barbigha, Sheikhpura",
    event: "1st Birthday Party",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    rating: 5,
    text: "Railway station se bas 700 meter ki doori par hone se bahar se aaye mehman bina kisi paresani ke pahunch gaye. Parking space kaafi bada hai aur service 10/10 thi.",
  },
  {
    id: 4,
    name: "Sanjay Singh",
    role: "Government Officer",
    location: "Sheikhpura",
    event: "Anniversary Function",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
    rating: 5,
    text: "Hall size bhot bada hai aur catering area clean & spacious hai. Booking process bohot smooth raha. Overall 5-star experience at GM Marriage Hall.",
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto animation - Changes slide every 5 seconds (Pauses when user hovers)
  useEffect(() => {
    if (isHovered) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isHovered]);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1,
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  return (
    <section className="bg-slate-950 text-white py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans border-t border-slate-800/80">
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-rose-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold">
            <Quote className="w-3.5 h-3.5" />
            <span>Client Reviews & Stories</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            What Our Guests Say
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
            Real experiences from happy families who celebrated their special
            moments at GM Marriage Hall, Sheikhpura.
          </p>
        </div>

        {/* Carousel Container */}
        <div
          className="relative bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Big Quote Icon in Background */}
          <Quote className="absolute top-6 right-8 w-20 h-20 text-slate-800/40 pointer-events-none" />

          {/* Testimonial Items Wrapper */}
          <div className="relative min-h-[260px] sm:min-h-[220px] flex items-center">
            {testimonials.map((item, index) => {
              const isActive = index === currentIndex;
              return (
                <div
                  key={item.id}
                  className={`absolute inset-0 transition-all duration-700 ease-in-out flex flex-col justify-between ${
                    isActive
                      ? "opacity-100 scale-100 pointer-events-auto translate-x-0"
                      : "opacity-0 scale-95 pointer-events-none translate-x-4"
                  }`}
                >
                  {/* Star Rating */}
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-amber-400 fill-amber-400"
                      />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-slate-200 text-base sm:text-lg leading-relaxed italic font-light mb-6">
                    "{item.text}"
                  </p>

                  {/* Client Info */}
                  <div className="flex items-center justify-between border-t border-slate-800/80 pt-4 mt-auto">
                    <div className="flex items-center gap-3.5">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-rose-500/50"
                      />
                      <div>
                        <h4 className="text-white font-bold text-sm sm:text-base flex items-center gap-1.5">
                          {item.name}
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 inline-block" />
                        </h4>
                        <p className="text-slate-400 text-xs">
                          {item.role} •{" "}
                          <span className="text-rose-400">{item.location}</span>
                        </p>
                      </div>
                    </div>

                    <span className="hidden sm:inline-block px-3 py-1 rounded-lg bg-slate-800 text-slate-300 text-xs font-medium border border-slate-700/60">
                      {item.event}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-8 pt-4 border-t border-slate-800/60">
            {/* Dots Indicator */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === currentIndex
                      ? "w-8 bg-gradient-to-r from-rose-500 to-pink-500"
                      : "w-2 bg-slate-700 hover:bg-slate-600"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Left / Right Arrow Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={prevSlide}
                className="p-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition duration-200 active:scale-95"
                aria-label="Previous Testimonial"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextSlide}
                className="p-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition duration-200 active:scale-95"
                aria-label="Next Testimonial"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
