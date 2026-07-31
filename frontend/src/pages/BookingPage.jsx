import React, { useState, useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import {
  format,
  addMonths,
  subMonths,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isBefore,
  startOfDay,
} from "date-fns";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Phone,
  MapPin,
  Clock,
  Sparkles,
  CheckCircle2,
  Loader2,
  RefreshCw,
  User,
  MessageSquare,
  Send,
} from "lucide-react";

const BookingPage = () => {
  const today = startOfDay(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  // Backend State
  const [bookingData, setBookingData] = useState({});
  const [isLoadingBookings, setIsLoadingBookings] = useState(false);
  const [error, setError] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    clientName: "",
    phone: "",
    eventType: "Wedding (Shaadi)",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const slideInLeft = {
    hidden: { opacity: 0, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const fetchMonthlyBookings = async () => {
    setIsLoadingBookings(true);
    setError(null);

    try {
      const response = await fetch(
        "http://localhost:5000/api/calendar/booking-calender",
      );

      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success && Array.isArray(result.data)) {
        const formattedData = {};
        result.data.forEach((item) => {
          formattedData[item.date] = {
            status: item.status,
            note: item.note || "",
          };
        });
        setBookingData(formattedData);
      } else if (Array.isArray(result)) {
        const formattedData = {};
        result.forEach((item) => {
          formattedData[item.date] = {
            status: item.status,
            note: item.note || "",
          };
        });
        setBookingData(formattedData);
      } else {
        setBookingData({});
      }
    } catch (err) {
      console.error("API Error:", err);
      setError("Failed to fetch booking data.");
    } finally {
      setIsLoadingBookings(false);
    }
  };

  useEffect(() => {
    fetchMonthlyBookings();
  }, [currentMonth]);

  const isPrevMonthDisabled =
    startOfMonth(subMonths(currentMonth, 1)) < startOfMonth(today);

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => {
    if (!isPrevMonthDisabled) {
      setCurrentMonth(subMonths(currentMonth, 1));
      setSelectedDate(null);
    }
  };

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  const days = eachDayOfInterval({ start: startDate, end: endDate });

  const getStatusDetails = (day) => {
    const isPastDate = isBefore(startOfDay(day), today);

    if (isPastDate) {
      return {
        status: "PAST",
        bgColor: "bg-slate-100 text-slate-300 opacity-60 cursor-not-allowed",
        badgeColor: "bg-slate-100 text-slate-400",
        label: "Past Date",
      };
    }

    const dateStr = format(day, "yyyy-MM-dd");
    const bookingInfo = bookingData[dateStr];

    if (!bookingInfo) {
      return {
        status: "AVAILABLE",
        bgColor:
          "bg-emerald-500 hover:bg-emerald-600 text-white cursor-pointer active:scale-95 transition-transform",
        badgeColor: "bg-emerald-100 text-emerald-800",
        label: "Fully Available",
      };
    }

    if (
      bookingInfo.status === "PARTIAL" ||
      bookingInfo.status === "PARTIALLY_BOOKED"
    ) {
      return {
        status: "PARTIAL",
        bgColor:
          "bg-amber-400 hover:bg-amber-500 text-slate-900 cursor-pointer active:scale-95 transition-transform",
        badgeColor: "bg-amber-100 text-amber-800",
        label: "Partially Booked",
        note:
          bookingInfo.note || "Some slots are already reserved for this date.",
      };
    }

    if (
      bookingInfo.status === "BOOKED" ||
      bookingInfo.status === "FULL" ||
      bookingInfo.status === "BLOCKED"
    ) {
      return {
        status: "FULL",
        bgColor:
          "bg-rose-500 hover:bg-rose-600 text-white opacity-80 cursor-not-allowed",
        badgeColor: "bg-rose-100 text-rose-800",
        label: "Fully Booked",
      };
    }

    return {
      status: "AVAILABLE",
      bgColor:
        "bg-emerald-500 hover:bg-emerald-600 text-white cursor-pointer active:scale-95 transition-transform",
      badgeColor: "bg-emerald-100 text-emerald-800",
      label: "Fully Available",
    };
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDate) return;

    setIsSubmitting(true);

    const payload = {
      fullName: formData.clientName,
      phone: formData.phone,
      eventType: formData.eventType,
      eventDate: format(selectedDate, "yyyy-MM-dd"),
      notes: formData.message,
    };

    try {
      const response = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmittedData(payload);
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#10B981", "#6366F1", "#F59E0B", "#EC4899"],
        });
      } else {
        alert(data.message || "Failed to submit booking inquiry.");
      }
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Something went wrong. Please try again or call us directly!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <HelmetProvider>
      <div className="min-h-screen bg-slate-900 font-sans text-slate-50 overflow-hidden">
        <Helmet>
          <title>
            GM Marriage Hall Sheikhpura | Booking & Date Availability
          </title>
        </Helmet>

        {/* Animated Header */}
        <motion.header
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-40px" }}
          transition={{ duration: 0.6 }}
          className="bg-slate-950 text-white pb-12 px-4 sm:px-8 border-b border-slate-800 relative overflow-hidden pt-20"
        >
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold mb-3 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-rose-400" />
                <span>Sheikhpura Ka Sabse Bada & Luxury Hall</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                GM Marriage Hall
              </h1>
              <p className="text-slate-400 text-sm sm:text-base mt-2 flex items-center gap-2 flex-wrap">
                <MapPin className="w-4 h-4 text-rose-500 flex-shrink-0" />
                <span>Station Road, Sheikhpura, Bihar - 811105</span>
              </p>
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-slate-800 text-xs space-y-2.5 w-full md:w-auto shadow-xl"
            >
              <div className="flex items-center gap-2.5 text-slate-300">
                <Clock className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>
                  <strong className="text-white">700m / 5 Min</strong> from
                  Sheikhpura Junction
                </span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-300">
                <Phone className="w-4 h-4 text-sky-400 flex-shrink-0" />
                <span>
                  <strong className="text-white">Phone:</strong> +91 8920823219
                </span>
              </div>
            </motion.div>
          </div>
        </motion.header>

        {/* Main Body */}
        <main className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
          {/* Section Title */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-30px" }}
            variants={fadeInUp}
            className="text-center mb-8"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-50">
              Check Date Availability & Send Inquiry
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* LEFT COLUMN: Animated Calendar */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-40px" }}
              variants={slideInLeft}
              className="lg:col-span-7 bg-white p-5 sm:p-6 rounded-3xl shadow-xl border border-slate-200"
            >
              {/* Availability Badges */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-6 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded-full bg-emerald-500"></span>
                  <span className="text-xs font-bold text-slate-700">
                    Fully Available
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded-full bg-amber-400"></span>
                  <span className="text-xs font-bold text-slate-700">
                    Partially Booked
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded-full bg-rose-500"></span>
                  <span className="text-xs font-bold text-slate-700">
                    Fully Booked
                  </span>
                </div>
              </div>

              {/* Month Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-extrabold text-slate-800 flex items-center gap-2">
                  {format(currentMonth, "MMMM yyyy")}
                  {isLoadingBookings && (
                    <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
                  )}
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={prevMonth}
                    disabled={isPrevMonthDisabled || isLoadingBookings}
                    className={`p-2 rounded-xl border border-slate-200 transition active:scale-95 ${
                      isPrevMonthDisabled
                        ? "opacity-30 cursor-not-allowed bg-slate-50"
                        : "hover:bg-slate-100"
                    }`}
                  >
                    <ChevronLeft className="w-5 h-5 text-slate-600" />
                  </button>
                  <button
                    onClick={nextMonth}
                    disabled={isLoadingBookings}
                    className="p-2 rounded-xl border border-slate-200 hover:bg-slate-100 transition active:scale-95"
                  >
                    <ChevronRight className="w-5 h-5 text-slate-600" />
                  </button>
                </div>
              </div>

              {/* Days Grid */}
              <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                  <div
                    key={d}
                    className="text-xs font-bold text-slate-400 py-2"
                  >
                    {d}
                  </div>
                ))}

                {days.map((day, idx) => {
                  const isCurrentMonth = isSameMonth(day, currentMonth);
                  const statusInfo = getStatusDetails(day);
                  const isSelected =
                    selectedDate && isSameDay(day, selectedDate);
                  const isPast = isBefore(startOfDay(day), today);

                  return (
                    <motion.button
                      whileHover={
                        !isPast && statusInfo.status !== "FULL"
                          ? { scale: 1.05 }
                          : {}
                      }
                      key={idx}
                      onClick={() =>
                        !isPast &&
                        statusInfo.status !== "FULL" &&
                        setSelectedDate(day)
                      }
                      disabled={
                        !isCurrentMonth ||
                        isPast ||
                        statusInfo.status === "FULL" ||
                        isLoadingBookings
                      }
                      className={`
                        h-12 sm:h-14 rounded-2xl flex flex-col items-center justify-center transition-all relative font-bold text-xs sm:text-sm
                        ${
                          !isCurrentMonth
                            ? "opacity-10 cursor-default"
                            : statusInfo.bgColor
                        }
                        ${
                          isSelected
                            ? "ring-4 ring-offset-2 ring-rose-500 z-10 scale-105 shadow-md"
                            : ""
                        }
                      `}
                    >
                      <span>{format(day, "d")}</span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>

            {/* RIGHT COLUMN: Animated Inquiry Form */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-40px" }}
              variants={slideInRight}
              className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-3xl shadow-xl border border-slate-100 overflow-hidden relative"
            >
              <AnimatePresence mode="wait">
                {submittedData ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="text-center py-8 px-2 space-y-5"
                  >
                    <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <div>
                      <h4 className="text-2xl font-black text-slate-900 tracking-tight">
                        Inquiry Received! 🎉
                      </h4>
                      <p className="text-slate-600 text-sm mt-1">
                        Thank you, <strong>{submittedData.fullName}</strong>.
                        Aapki inquiry receive ho gayi hai!
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setSubmittedData(null);
                        setSelectedDate(null);
                      }}
                      className="w-full py-3 text-slate-500 hover:text-slate-800 text-xs font-semibold flex items-center justify-center gap-1 transition"
                    >
                      <RefreshCw className="w-3.5 h-3.5" /> Dusri Date Check
                      Karein
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {!selectedDate ? (
                      <div className="p-12 text-center bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl">
                        <CalendarIcon className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                        <p className="text-slate-600 font-bold text-sm">
                          Please select an available date from the calendar.
                        </p>
                        <p className="text-slate-400 text-xs mt-1">
                          Calendar me se koi bhi date chuniye inquiry bhejne ke
                          liye.
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Selected Date Card */}
                        {(() => {
                          const statusInfo = getStatusDetails(selectedDate);
                          return (
                            <div className="bg-slate-50/80 border border-slate-100 p-4 rounded-2xl flex items-center justify-between">
                              <div>
                                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                                  SELECTED DATE
                                </span>
                                <h4 className="text-base sm:text-lg font-black text-slate-900">
                                  {format(selectedDate, "EEEE, d MMMM yyyy")}
                                </h4>
                              </div>
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-bold ${statusInfo.badgeColor}`}
                              >
                                {statusInfo.label}
                              </span>
                            </div>
                          );
                        })()}

                        {/* FULL NAME */}
                        <div>
                          <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2">
                            FULL NAME <span className="text-rose-500">*</span>
                          </label>
                          <div className="relative">
                            <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                              type="text"
                              name="clientName"
                              required
                              value={formData.clientName}
                              onChange={handleInputChange}
                              placeholder="Apna naam darj karein"
                              className="w-full pl-10 pr-4 py-3 bg-slate-50/50 border border-slate-200 rounded-2xl text-sm font-medium text-slate-800 focus:bg-white focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 outline-none transition-all placeholder:text-slate-400"
                            />
                          </div>
                        </div>

                        {/* PHONE NUMBER */}
                        <div>
                          <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2">
                            PHONE NUMBER{" "}
                            <span className="text-rose-500">*</span>
                          </label>
                          <div className="relative">
                            <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                              type="tel"
                              name="phone"
                              required
                              value={formData.phone}
                              onChange={handleInputChange}
                              placeholder="10-digit mobile number"
                              className="w-full pl-10 pr-4 py-3 bg-slate-50/50 border border-slate-200 rounded-2xl text-sm font-medium text-slate-800 focus:bg-white focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 outline-none transition-all placeholder:text-slate-400"
                            />
                          </div>
                        </div>

                        {/* EVENT TYPE */}
                        <div>
                          <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2">
                            EVENT TYPE
                          </label>
                          <select
                            name="eventType"
                            value={formData.eventType}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-slate-50/50 border border-slate-200 rounded-2xl text-sm font-semibold text-slate-800 focus:bg-white focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 outline-none transition-all cursor-pointer"
                          >
                            <option value="WEDDING">Wedding (Shaadi)</option>
                            <option value="RECEPTION">Reception</option>
                            <option value="ENGAGEMENT">
                              Engagement (Sagai)
                            </option>
                            <option value="BIRTHDAY PARTY">
                              Birthday Party
                            </option>
                            <option value="ANNIVERSARY">Anniversary</option>
                            <option value="CORPORATE EVENTS">
                              Corporate Event
                            </option>
                            <option value="OTHER FUNCTION">
                              Other Function
                            </option>
                          </select>
                        </div>

                        {/* REQUIREMENTS / MESSAGE */}
                        <div>
                          <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2">
                            REQUIREMENTS / MESSAGE
                          </label>
                          <div className="relative">
                            <MessageSquare className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                            <textarea
                              name="message"
                              rows={3}
                              value={formData.message}
                              onChange={handleInputChange}
                              placeholder="Guest count ya koi khas zaroorat..."
                              className="w-full pl-10 pr-4 py-3 bg-slate-50/50 border border-slate-200 rounded-2xl text-sm font-medium text-slate-800 focus:bg-white focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 outline-none transition-all placeholder:text-slate-400 resize-none"
                            />
                          </div>
                        </div>

                        {/* SUBMIT BUTTON */}
                        <motion.button
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.98 }}
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full py-3.5 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold rounded-2xl text-sm shadow-lg shadow-rose-600/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                        >
                          {isSubmitting ? (
                            "Submitting..."
                          ) : (
                            <>
                              <Send className="w-4 h-4" />
                              <span>Submit Inquiry</span>
                            </>
                          )}
                        </motion.button>
                      </form>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </main>
      </div>
    </HelmetProvider>
  );
};

export default BookingPage;
