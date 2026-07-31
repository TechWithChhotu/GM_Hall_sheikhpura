import React from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  MapPin,
  Phone,
  Car,
  Utensils,
  ShieldCheck,
  Heart,
} from "lucide-react";
import HomeHero from "../components/HomeHero";
import BookingCalendar from "../components/BookingCalendar";
import Testimonials from "../components/Testimonials";
import EventServices from "../components/EventServices";
import SEOHead from "../components/SEOHead";

export default function Home() {
  const homeSchema = {
    "@context": "https://schema.org",
    "@type": "EventVenue",
    name: "GM Marriage Hall Royal Palace",
    alternateName: "GM Hall Sheikhpura",
    description:
      "Sheikhpura Bihar ka sabse bada aur luxury AC banquet hall. Weddings, reception, birthday party, aur corporate events ke liye fully air-conditioned venue.",
    founder: {
      "@type": "Person",
      name: "Divya Raj",
    },
    telephone: "+918920823219",
    email: "contact.gmhall@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Station Road, Near Sheikhpura Hill",
      addressLocality: "Sheikhpura",
      addressRegion: "Bihar",
      postalCode: "811107",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 25.1385,
      longitude: 85.856,
    },
    hasMap: "https://maps.google.com/?q=Station+Road+Sheikhpura+Bihar+811107",
    openingHours: "Mo-Su 00:00-23:59",
    priceRange: "₹₹",
  };
  // Common Animation Variants for Bidirectional Scroll
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, rotateX: -25, y: 40, scale: 0.95 },
    visible: (index) => ({
      opacity: 1,
      rotateX: 0,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.215, 0.61, 0.355, 1],
      },
    }),
  };

  const amenities = [
    {
      icon: MapPin,
      title: "Prime Bailey Road Location",
      desc: "Easily accessible from Danapur, Saguna More, Boring Road, and Patna Airport.",
    },
    {
      icon: Car,
      title: "Hassle-Free Parking",
      desc: "Dedicated secure parking space with valet facility for all your guests.",
    },
    {
      icon: Utensils,
      title: "Grand Dining Infrastructure",
      desc: "Separate high-capacity dining area with modern food counter setups.",
    },
    {
      icon: ShieldCheck,
      title: "24/7 Power & Security",
      desc: "Heavy-duty generator backup and CCTV surveillance throughout the event.",
    },
    {
      icon: Heart,
      title: "Luxury Bridal Suites",
      desc: "Fully air-conditioned private rooms for bride, groom, and close family.",
    },
    {
      icon: Sparkles,
      title: "Custom Mandap & Stage Decor",
      desc: "In-house theme floral decor, LED lighting, and sound setup options.",
    },
  ];

  return (
    <div className="overflow-hidden font-sans">
      {/* 1. HERO SECTION */}
      <SEOHead
        title="GM Marriage Hall Sheikhpura | #1 Luxury Banquet Hall & Wedding Venue"
        description="Book GM Marriage Hall Sheikhpura (Owner: Divya Raj). Station Road near Sheikhpura Hill. AC banquet hall, open lawn space, catering & decoration services."
        canonicalUrl="https://gmmarriagehall.com/"
        schema={homeSchema}
      />
      <HomeHero />

      {/* 2. LOCAL ADVANTAGE STATS */}
      <section className="border-y border-slate-800 bg-slate-900/50 py-10 relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-30px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.15 } },
          }}
          className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          {[
            { value: "1200+", label: "Guest Capacity" },
            { value: "100+", label: "Car Parking Space" },
            { value: "100%", label: "Power Backup" },
            { value: "5 Min", label: "From Sheikhpura Junction" },
          ].map((stat, idx) => (
            <motion.div key={idx} variants={fadeInUp}>
              <p className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-300 font-serif">
                {stat.value}
              </p>
              <p className="text-slate-400 text-xs sm:text-sm mt-1">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 3. KEY AMENITIES */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-50px" }}
          variants={fadeInUp}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold uppercase tracking-widest mb-4 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-rose-400" />
            <span>World Class Facilities</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold mb-4 text-white">
            Why Choose Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-pink-400 to-rose-300">
              GM Hall?
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Designed to make weddings, receptions, and ring ceremonies grand and
            hassle-free.
          </p>
        </motion.div>

        {/* 3D Flip Card Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {amenities.map((item, idx) => (
            <motion.div
              key={idx}
              custom={idx}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-40px" }}
              whileHover={{
                y: -8,
                transition: { duration: 0.3 },
              }}
              className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 p-8 rounded-3xl hover:border-rose-500/50 transition-colors duration-300 shadow-xl group"
            >
              <div className="p-3.5 w-fit rounded-2xl bg-rose-500/10 border border-rose-500/20 mb-6 group-hover:scale-110 transition-transform duration-300">
                <item.icon className="w-7 h-7 text-rose-400" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white group-hover:text-rose-300 transition-colors">
                {item.title}
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* EVENT SERVICES SECTION */}
      <EventServices />

      {/* 4. GOOGLE MAP / LOCATION SECTION */}
      <section className="py-20 bg-slate-900/30 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          {/* Left Side Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-4 text-white">
              Visit Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-pink-400 to-rose-300">
                Venue
              </span>
            </h2>
            <p className="text-slate-400 mb-8 leading-relaxed text-sm sm:text-base">
              We invite you to take a physical tour of the banquet hall and
              discuss custom packages with our event manager.
            </p>

            <div className="space-y-4 text-slate-300 text-sm">
              <div className="flex items-center gap-3 bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
                <MapPin className="w-5 h-5 text-rose-400 shrink-0" />
                <span>
                  Main Road Sheikhpura, Near V Mart / Station road, Sheikhpura,
                  Bihar
                </span>
              </div>
              <div className="flex items-center gap-3 bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
                <Phone className="w-5 h-5 text-rose-400 shrink-0" />
                <span>+91 98765 43210 / +91 91234 56789</span>
              </div>
            </div>
          </motion.div>

          {/* Right Side Google Map */}
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="h-80 rounded-3xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl shadow-rose-500/5 relative group"
          >
            <iframe
              title="Bailey Banquet Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3597.511874220379!2d85.0510!3d25.6100!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDM2JzM2LjAiTiA4NcKwMDMnMDMuNiJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            />
          </motion.div>
        </div>
      </section>

      {/* OTHER COMPONENTS */}
      <BookingCalendar />
      <Testimonials />
    </div>
  );
}
