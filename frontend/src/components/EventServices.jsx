import React from "react";
import { motion } from "framer-motion";
import { Calendar, Sparkles, ArrowRight } from "lucide-react";

const services = [
  {
    id: 1,
    title: "WEDDING",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800",
    description:
      "Make your wedding planning dreams come true with us at GM Marriage Hall, Sheikhpura. We'll help you manage your royal wedding just the way you want.",
  },
  {
    id: 2,
    title: "ANNIVERSARY",
    image:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800",
    description:
      "An Anniversary is a day that makes the couple remember their cherished moments. Celebrate it with luxury ambient decor near Sheikhpura Hill.",
  },
  {
    id: 3,
    title: "ENGAGEMENT",
    image:
      "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&q=80&w=800",
    description:
      "The first step towards a wedding life should be grand and chilling. Start your journey with top-class AC hall setup at Station Road, Sheikhpura.",
  },
  {
    id: 4,
    title: "RECEPTION",
    image:
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=800",
    description:
      "The main event that attracts the focus of all guests. Interact and enjoy a lavish buffet of fine dining with spacious capacity for 1000+ guests.",
  },
  {
    id: 5,
    title: "BIRTHDAY PARTY",
    image:
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&q=80&w=800",
    description:
      "What would be the best gift than a memorable birthday party? Host amazing themed birthday parties with custom lighting and stage setups.",
  },
  {
    id: 6,
    title: "CORPORATE EVENTS",
    image:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800",
    description:
      "Looking forward to making your corporate event a grand success? We offer the best corporate conference and event services in Sheikhpura.",
  },
];

// Stagger Animation Variants for Scroll Effect
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Har card 0.15s ke delay se aayega
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

const EventServices = () => {
  const handleBookingClick = (serviceName) => {
    // Smooth Scroll to Booking Calendar Section
    const calendarSection = document.getElementById("booking-calendar");
    if (calendarSection) {
      calendarSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="bg-slate-950 py-20 px-4 sm:px-6 lg:px-8 text-white relative overflow-hidden font-sans border-t border-slate-800/80">
      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-rose-600/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header with Reveal Animation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 0.99, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-3 mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Sheikhpura's Premier Event Spaces</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Our Special Event Services
          </h2>

          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
            From royal weddings to intimate birthday celebrations at{" "}
            <strong className="text-slate-200">GM Marriage Hall</strong>,
            Station Road, Sheikhpura (811107).
          </p>
        </motion.div>

        {/* 6 Grid Cards Container with Scroll Animation */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="bg-slate-900/90 border border-slate-800/90 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-rose-950/40 hover:border-rose-500/30 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Image Wrapper with Zoom Hover Effect */}
                <div className="relative h-60 w-full overflow-hidden">
                  <img
                    src={service.image}
                    alt={`${service.title} at GM Marriage Hall Sheikhpura`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80" />
                </div>

                {/* Content Area */}
                <div className="p-6 text-center space-y-3">
                  <h3 className="text-xl font-black tracking-wider text-rose-400 uppercase group-hover:text-rose-300 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-slate-300 text-sm leading-relaxed font-light">
                    {service.description}
                  </p>
                </div>
              </div>

              {/* Action Button Container */}
              <div className="p-6 pt-0 text-center">
                <motion.button
                  whileTap={{ scale: 0.92 }} // Click Animation Effect
                  whileHover={{ scale: 1.03 }}
                  onClick={() => handleBookingClick(service.title)}
                  className="w-full py-3 px-6 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-rose-950/50 flex items-center justify-center gap-2 transition duration-200"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Now</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default EventServices;
