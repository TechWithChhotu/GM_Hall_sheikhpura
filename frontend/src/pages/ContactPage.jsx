import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageSquare,
  Clock,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "Wedding",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        eventType: "Wedding",
        message: "",
      });

      // Reset success state after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1500);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className="relative min-h-screen bg-slate-950 text-slate-100 py-16 px-4 sm:px-6 lg:px-8 font-sans overflow-hidden flex items-center">
      {/* Animated Background Gradients & Glows (30% Rose Theme) */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-rose-600/15 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 bg-rose-500/10 border border-rose-500/30 px-4 py-1.5 rounded-full text-rose-400 text-xs font-semibold uppercase tracking-wider mb-4 animate-bounce">
            <Sparkles className="w-3.5 h-3.5" /> Let's Plan Your Special Event
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Get In{" "}
            <span className="bg-gradient-to-r from-rose-400 via-rose-500 to-rose-300 bg-clip-text text-transparent">
              Touch With Us
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3">
            Have questions about hall bookings, availability, or pricing? Drop
            us a message and our event coordination team will respond within 2
            hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Contact Info Cards */}
          <div className="lg:col-span-5 space-y-4">
            {/* Phone Card */}
            <a
              href="tel:+919876543210"
              className="group p-5 bg-slate-900/70 border border-slate-800 rounded-2xl flex items-center gap-4 transition-all duration-300 hover:border-rose-500/50 hover:bg-slate-900 hover:shadow-lg hover:shadow-rose-500/10 hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 group-hover:scale-110 group-hover:bg-rose-500 group-hover:text-white transition-all duration-300 shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-rose-400 font-medium">
                  Direct Call / Booking Desk
                </p>
                <h4 className="text-base font-bold text-slate-100 group-hover:text-rose-300 transition-colors">
                  +91 98765 43210
                </h4>
                <p className="text-xs text-slate-500">
                  Mon - Sun: 8:00 AM - 10:00 PM
                </p>
              </div>
            </a>

            {/* Email Card */}
            <a
              href="mailto:events@venuehall.com"
              className="group p-5 bg-slate-900/70 border border-slate-800 rounded-2xl flex items-center gap-4 transition-all duration-300 hover:border-rose-500/50 hover:bg-slate-900 hover:shadow-lg hover:shadow-rose-500/10 hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 group-hover:scale-110 group-hover:bg-rose-500 group-hover:text-white transition-all duration-300 shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-rose-400 font-medium">
                  Official Email Inquiry
                </p>
                <h4 className="text-base font-bold text-slate-100 group-hover:text-rose-300 transition-colors">
                  inquiries@venuehall.com
                </h4>
                <p className="text-xs text-slate-500">
                  Guaranteed response within 24h
                </p>
              </div>
            </a>

            {/* Location Card */}
            <div className="group p-5 bg-slate-900/70 border border-slate-800 rounded-2xl flex items-center gap-4 transition-all duration-300 hover:border-rose-500/50 hover:bg-slate-900 hover:shadow-lg hover:shadow-rose-500/10 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 group-hover:scale-110 group-hover:bg-rose-500 group-hover:text-white transition-all duration-300 shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-rose-400 font-medium">
                  Venue Address
                </p>
                <h4 className="text-base font-bold text-slate-100 group-hover:text-rose-300 transition-colors">
                  Royal Celebration Grand Hall
                </h4>
                <p className="text-xs text-slate-400">
                  Grand Avenue, Boring Road, Patna, Bihar
                </p>
              </div>
            </div>

            {/* Quick Action Badge Card */}
            <div className="p-5 bg-gradient-to-br from-rose-950/40 to-slate-900 border border-rose-500/30 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-rose-400 animate-spin-slow" />
                <div>
                  <h5 className="text-xs font-semibold text-white">
                    Instant WhatsApp Response
                  </h5>
                  <p className="text-[11px] text-slate-400">
                    Chat directly with venue executive
                  </p>
                </div>
              </div>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noreferrer"
                className="bg-rose-600 hover:bg-rose-500 text-white text-xs px-3.5 py-2 rounded-xl font-medium transition-all shadow-md shadow-rose-600/30"
              >
                Chat Now
              </a>
            </div>
          </div>

          {/* Right Column: Animated Interactive Contact Form */}
          <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 p-6 sm:p-8 rounded-3xl backdrop-blur-xl shadow-2xl relative">
            {/* Success Overlay Banner */}
            {isSubmitted && (
              <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/40 rounded-xl flex items-center gap-3 text-rose-300 text-xs sm:text-sm animate-fade-in">
                <CheckCircle2 className="w-5 h-5 text-rose-400 shrink-0" />
                <span>
                  Thank you! Your message has been received. Our team will
                  contact you shortly.
                </span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Full Name Input */}
                <div className="relative">
                  <input
                    type="text"
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder=" "
                    className="peer w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all placeholder-transparent"
                  />
                  <label className="absolute left-4 top-3.5 text-xs text-slate-500 transition-all duration-200 pointer-events-none peer-placeholder-shown:text-sm peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-slate-400 peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:text-rose-400 peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:text-rose-400">
                    Your Full Name *
                  </label>
                </div>

                {/* Email Address Input */}
                <div className="relative">
                  <input
                    type="email"
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder=" "
                    className="peer w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all placeholder-transparent"
                  />
                  <label className="absolute left-4 top-3.5 text-xs text-slate-500 transition-all duration-200 pointer-events-none peer-placeholder-shown:text-sm peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-slate-400 peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:text-rose-400 peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:text-rose-400">
                    Email Address *
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Phone Number Input */}
                <div className="relative">
                  <input
                    type="tel"
                    required
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder=" "
                    className="peer w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all placeholder-transparent"
                  />
                  <label className="absolute left-4 top-3.5 text-xs text-slate-500 transition-all duration-200 pointer-events-none peer-placeholder-shown:text-sm peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-slate-400 peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:text-rose-400 peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:text-rose-400">
                    Phone Number *
                  </label>
                </div>

                {/* Event Type Dropdown */}
                <div>
                  <select
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleChange}
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3.5 text-sm text-slate-300 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all"
                  >
                    <option value="Wedding">Wedding / Reception</option>
                    <option value="Corporate">Corporate Conference</option>
                    <option value="Birthday">
                      Birthday / Anniversary Party
                    </option>
                    <option value="Exhibition">Exhibition / Workshop</option>
                    <option value="Other">Other Inquiry</option>
                  </select>
                </div>
              </div>

              {/* Message Input */}
              <div className="relative">
                <textarea
                  rows="4"
                  required
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder=" "
                  className="peer w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all placeholder-transparent resize-none"
                ></textarea>
                <label className="absolute left-4 top-3.5 text-xs text-slate-500 transition-all duration-200 pointer-events-none peer-placeholder-shown:text-sm peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-slate-400 peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:text-rose-400 peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:text-rose-400">
                  Tell us about your event (Approx. guest count, preferred
                  dates)...
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-rose-600 hover:bg-rose-500 text-white font-semibold text-sm py-4 rounded-xl shadow-lg shadow-rose-600/30 hover:shadow-rose-500/50 flex items-center justify-center gap-2 transition-all duration-300 group disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
