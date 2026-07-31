import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Heart, Menu, X, Phone } from "lucide-react";
import GM_Hall from "../assets/GM_Hall.png";
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors hover:text-rose-400 ${
      isActive ? "text-rose-500 font-semibold" : "text-slate-300"
    }`;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-24 sm:w-32   flex items-center justify-center shrink-0 overflow-hidden">
            <img
              src={GM_Hall}
              alt="GM Hall Royal Palace Logo"
              className="w-full h-full  mix-blend-screen"
            />
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/packages" className={navLinkClass}>
            Packages
          </NavLink>
          <NavLink to="/gallery" className={navLinkClass}>
            Gallery
          </NavLink>
          <NavLink to="/booking" className={navLinkClass}>
            Book Venue
          </NavLink>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <a
            href="tel:+919876543210"
            className="flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-rose-400 transition-colors"
          >
            <Phone className="w-4 h-4 text-rose-500" /> +91 98765 43210
          </a>
          <Link
            to="/booking"
            className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-lg shadow-rose-500/20 transition-all"
          >
            Check Dates
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-slate-300 hover:text-white"
        >
          {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden bg-slate-950 border-b border-slate-800 px-6 py-6 space-y-4">
          <NavLink
            to="/"
            onClick={() => setIsOpen(false)}
            className="block text-slate-200 text-lg"
          >
            Home
          </NavLink>
          <NavLink
            to="/packages"
            onClick={() => setIsOpen(false)}
            className="block text-slate-200 text-lg"
          >
            Packages
          </NavLink>
          <NavLink
            to="/gallery"
            onClick={() => setIsOpen(false)}
            className="block text-slate-200 text-lg"
          >
            Gallery
          </NavLink>
          <NavLink
            to="/booking"
            onClick={() => setIsOpen(false)}
            className="block text-slate-200 text-lg"
          >
            Book Venue
          </NavLink>
        </div>
      )}
    </nav>
  );
}
