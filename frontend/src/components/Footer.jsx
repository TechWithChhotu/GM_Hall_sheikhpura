import React from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ChevronRight,
  Sparkles,
  Heart,
  ShieldCheck,
  Navigation,
} from "lucide-react";
import { Link, NavLink } from "react-router-dom";

const Footer = () => {
  // Local SEO Schema for Footer Structured Data
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "EventVenue",
    name: "GM Marriage Hall",
    description:
      "Sheikhpura ka sabse bada aur luxury marriage hall. Best banquet hall for weddings, receptions, birthday parties, and corporate events in Sheikhpura Bihar.",
    founder: "Divya Raj",
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
      latitude: "25.1385",
      longitude: "85.8560",
    },
    openingHours: "Mo-Su 00:00-23:59",
  };

  return (
    <footer className="bg-slate-950 text-slate-300 relative overflow-hidden border-t border-slate-800/80 pt-16 pb-8 font-sans">
      {/* Inject Local SEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />

      {/* Background Decorative Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-rose-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* TOP SECTION: Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
          {/* COLUMN 1: Brand Info & SEO Pitch (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <Link to="/" className="flex items-center gap-2">
                <span className="text-2xl font-black tracking-wide bg-gradient-to-r from-white via-pink-300 to-rose-500 bg-clip-text text-transparent inline-flex items-center gap-2">
                  GM Hall{" "}
                  <Heart className="w-6 h-6  fill-rose-500 inline-block shrink-0" />{" "}
                  Royal Palace
                </span>
              </Link>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" /> Sheikhpura's #1 Luxury Venue
            </div>

            <p className="text-sm text-slate-400 leading-relaxed">
              <strong>GM Marriage Hall</strong> (Owner: Divya Raj) Sheikhpura ka
              sabse bada aur premium AC marriage banquet hall hai. Situated near
              Sheikhpura Hill, just 700 meters from Sheikhpura Junction Railway
              Station.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Managed By:
              </span>
              <span className="text-xs bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-md text-slate-200 font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Divya
                Raj
              </span>
            </div>
          </div>

          {/* COLUMN 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-white text-sm font-bold uppercase tracking-wider border-l-2 border-rose-500 pl-2">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: "Home", path: "/" },
                { label: "Check Available Dates", path: "/booking" },
                { label: "Packages & Pricing", path: "/packages" },
                { label: "Photo Gallery", path: "/gallery" },
                { label: "Contact Us", path: "/contact" },
                { label: "FAQ", path: "/faq" },
              ].map((item, idx) => (
                <li key={idx}>
                  <Link
                    to={item.path}
                    className="hover:text-rose-400 transition-colors flex items-center gap-1.5 text-slate-400 hover:translate-x-1 duration-200"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-rose-500" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 3: Local SEO Keyword Services (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-white text-sm font-bold uppercase tracking-wider border-l-2 border-rose-500 pl-2">
              Our Event Services
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li className="hover:text-slate-200 transition">
                💍 Grand Weddings & Receptions
              </li>
              <li className="hover:text-slate-200 transition">
                🎉 Engagement & Ring Ceremonies
              </li>
              <li className="hover:text-slate-200 transition">
                🎂 Birthday & Anniversary Parties
              </li>
              <li className="hover:text-slate-200 transition">
                🏢 Corporate Events & Conferences
              </li>
              <li className="hover:text-slate-200 transition">
                🌺 Spacious Dining & Open Lawn Space
              </li>
            </ul>
          </div>

          {/* COLUMN 4: Contact & Location Info (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-white text-sm font-bold uppercase tracking-wider border-l-2 border-rose-500 pl-2">
              Venue Location & Info
            </h4>

            <div className="space-y-3 text-xs sm:text-sm text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
                <span>
                  Station Road, Near Sheikhpura Hill, Sheikhpura, Bihar - 811107
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Navigation className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span className="text-emerald-400 font-semibold">
                  700m (5 mins) from Sheikhpura Junction
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-sky-400 flex-shrink-0" />
                <a
                  href="tel:8920823219"
                  className="hover:text-white transition font-bold text-slate-200"
                >
                  +91 8920823219
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-purple-400 flex-shrink-0" />
                <a
                  href="mailto:contact.gmhall@gmail.com"
                  className="hover:text-white transition text-slate-300"
                >
                  contact.gmhall@gmail.com
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>Open 24/7 for Bookings & Visits</span>
              </div>
            </div>

            {/* Google Maps Directions Button */}
            <a
              href="https://maps.google.com/?q=Station+Road+Sheikhpura+Bihar+811107"
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 rounded-xl text-xs font-bold text-slate-200 transition hover:border-rose-500/50"
            >
              <Navigation className="w-3.5 h-3.5 text-rose-500" />
              <span>Get Directions on Google Maps</span>
            </a>
          </div>
        </div>

        {/* MIDDLE SECTION: Local SEO Tag Cloud */}
        <div className="py-6 border-b border-slate-800/80">
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-2">
            Popular Local Searches:
          </p>
          <div className="flex flex-wrap gap-2 text-[11px] text-slate-400">
            {[
              "Best Marriage Hall in Sheikhpura",
              "GM Marriage Hall Station Road",
              "Banquet Hall near Sheikhpura Junction",
              "Marriage Hall Sheikhpura Bihar 811107",
              "Luxury Wedding Venue Sheikhpura Hill",
              "Divya Raj GM Marriage Hall",
              "Top AC Banquet Hall Sheikhpura",
            ].map((tag, idx) => (
              <span
                key={idx}
                className="bg-slate-900/90 border border-slate-800/80 px-2.5 py-1 rounded-lg hover:border-rose-500/40 transition cursor-default"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* BOTTOM SECTION: Copyright & Credentials */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()} <strong>GM Marriage Hall</strong>. All
            rights reserved.
          </p>
          <p className="flex items-center gap-1">
            <span>Designed & Developed by</span>

            <Link
              className="text-white font-semibold"
              to="https://techsolex.in"
              target="_blank"
            >
              TechSolex
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
