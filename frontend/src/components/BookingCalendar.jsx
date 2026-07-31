import React, { useState, useEffect } from "react";
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
  CheckCircle2,
  AlertCircle,
  XCircle,
  History,
  Loader2,
  RefreshCw,
} from "lucide-react";

const BookingCalendar = () => {
  const today = startOfDay(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  // Backend state
  const [bookingData, setBookingData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // -------------------------------------------------------------
  // Backend Fetch Function
  // -------------------------------------------------------------
  const fetchBookingData = async () => {
    setLoading(true);
    setError(null);

    try {
      // Correct Backend Route
      const response = await fetch(
        "http://localhost:5000/api/calendar/booking-calender",
      );

      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }

      const result = await response.json();

      // Handling { success: true, data: [...] } structure
      if (result.success && Array.isArray(result.data)) {
        const formattedData = {};
        result.data.forEach((item) => {
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
      setError("Failed to connect to backend server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookingData();
  }, [currentMonth]);

  // Navigation Logic
  const prevMonth = () => {
    const previous = subMonths(currentMonth, 1);
    if (startOfMonth(previous) >= startOfMonth(today)) {
      setCurrentMonth(previous);
      setSelectedDate(null);
    }
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
    setSelectedDate(null);
  };

  // Date Status Mapper
  const getStatusDetails = (day) => {
    const dateStr = format(day, "yyyy-MM-dd");
    const bookingInfo = bookingData[dateStr];

    if (isBefore(day, today)) {
      return {
        status: "PAST",
        bgColor: "bg-slate-100 text-slate-400 cursor-not-allowed opacity-60",
        badgeColor: "bg-slate-200 text-slate-600",
        label: "Passed Date",
        icon: <History className="w-4 h-4 mr-1 text-slate-500" />,
      };
    }

    if (!bookingInfo) {
      return {
        status: "AVAILABLE",
        bgColor:
          "bg-emerald-500 hover:bg-emerald-600 text-white cursor-pointer shadow-sm",
        badgeColor: "bg-emerald-100 text-emerald-800",
        label: "Fully Available",
        icon: <CheckCircle2 className="w-4 h-4 mr-1 text-emerald-600" />,
      };
    }

    if (
      bookingInfo.status === "PARTIAL" ||
      bookingInfo.status === "PARTIALLY_BOOKED"
    ) {
      return {
        status: "PARTIAL",
        bgColor:
          "bg-amber-400 hover:bg-amber-500 text-slate-900 cursor-pointer shadow-sm",
        badgeColor: "bg-amber-100 text-amber-800",
        label: "Partially Booked",
        note: bookingInfo.note || "Some slots are already booked.",
        icon: <AlertCircle className="w-4 h-4 mr-1 text-amber-600" />,
      };
    }

    if (
      bookingInfo.status === "BOOKED" ||
      bookingInfo.status === "FULL" ||
      bookingInfo.status === "BLOCKED"
    ) {
      return {
        status: "FULL",
        bgColor: "bg-rose-500 text-white cursor-not-allowed opacity-75",
        badgeColor: "bg-rose-100 text-rose-800",
        label: "Fully Booked / Blocked",
        note: bookingInfo.note || "No slots available for this date.",
        icon: <XCircle className="w-4 h-4 mr-1 text-rose-600" />,
      };
    }

    return {
      status: "AVAILABLE",
      bgColor:
        "bg-emerald-500 hover:bg-emerald-600 text-white cursor-pointer shadow-sm",
      badgeColor: "bg-emerald-100 text-emerald-800",
      label: "Fully Available",
      icon: <CheckCircle2 className="w-4 h-4 mr-1 text-emerald-600" />,
    };
  };

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const days = eachDayOfInterval({ start: startDate, end: endDate });
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const selectedStatus = selectedDate ? getStatusDetails(selectedDate) : null;
  const isPrevDisabled =
    startOfMonth(subMonths(currentMonth, 1)) < startOfMonth(today);

  return (
    <div
      className="max-w-4xl mx-auto p-4 sm:p-6  bg-slate-900  font-sans rounded-4xl"
      id="booking-calendar"
    >
      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-indigo-600 rounded-2xl">
              <CalendarIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-wide flex items-center gap-2">
                Select Event Date
                {loading && (
                  <Loader2 className="w-4 h-4 animate-spin text-indigo-400" />
                )}
              </h2>
              <p className="text-xs text-slate-400">
                Choose an available slot for your booking
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-slate-800/80 p-1.5 rounded-2xl border border-slate-700">
            <button
              onClick={prevMonth}
              disabled={isPrevDisabled || loading}
              className="p-2 rounded-xl border border-slate-700 hover:bg-slate-700 disabled:opacity-20 disabled:cursor-not-allowed transition"
            >
              <ChevronLeft className="w-5 h-5 text-slate-200" />
            </button>
            <span className="font-semibold text-sm w-32 text-center select-none">
              {format(currentMonth, "MMMM yyyy")}
            </span>
            <button
              onClick={nextMonth}
              disabled={loading}
              className="p-2 rounded-xl border border-slate-700 hover:bg-slate-700 disabled:opacity-20 disabled:cursor-not-allowed transition"
            >
              <ChevronRight className="w-5 h-5 text-slate-200" />
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-amber-50 text-amber-800 px-6 py-2 text-xs font-semibold border-b border-amber-200 flex justify-between items-center">
            <span>{error}</span>
            <button
              onClick={fetchBookingData}
              className="flex items-center gap-1 underline text-amber-900 hover:text-black"
            >
              <RefreshCw className="w-3 h-3" /> Retry
            </button>
          </div>
        )}

        {/* Grid */}
        <div className="p-6">
          <div className="grid grid-cols-7 gap-2 mb-3 text-center">
            {weekDays.map((day) => (
              <div
                key={day}
                className="text-xs font-bold text-slate-400 uppercase tracking-wider py-1"
              >
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2 sm:gap-3 relative">
            {days.map((day, idx) => {
              const isCurrentMonth = isSameMonth(day, currentMonth);
              const statusInfo = getStatusDetails(day);
              const isSelected = selectedDate && isSameDay(day, selectedDate);
              const isPastOrFull =
                statusInfo.status === "FULL" || statusInfo.status === "PAST";

              return (
                <button
                  key={idx}
                  onClick={() => !isPastOrFull && setSelectedDate(day)}
                  disabled={!isCurrentMonth || isPastOrFull || loading}
                  className={`
                    h-12 sm:h-14 rounded-2xl flex flex-col items-center justify-center transition-all relative font-bold text-xs sm:text-sm
                    ${!isCurrentMonth ? "opacity-10 cursor-default bg-transparent" : statusInfo.bgColor}
                    ${isSelected ? "ring-4 ring-offset-2 ring-indigo-600 z-10 scale-105 shadow-md" : ""}
                  `}
                >
                  <span>{format(day, "d")}</span>
                </button>
              );
            })}
          </div>

          {/* Legends */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap justify-center gap-4 text-xs font-semibold">
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-full bg-emerald-500"></span>
              <span className="text-slate-600">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-full bg-amber-400"></span>
              <span className="text-slate-600">Partially Booked</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-full bg-rose-500"></span>
              <span className="text-slate-600">Fully Booked</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-full bg-slate-300"></span>
              <span className="text-slate-600">Past Date</span>
            </div>
          </div>

          {/* Animated Action Footer */}
          <div
            className={`grid transition-all duration-500 ease-in-out ${
              selectedDate
                ? "grid-rows-[1fr] opacity-100 mt-6"
                : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"
            }`}
          >
            <div className="overflow-hidden">
              {selectedDate && (
                <div className="p-4 sm:p-5 rounded-2xl bg-indigo-50/70 border border-indigo-100 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm animate-in fade-in slide-in-from-bottom-3 duration-300">
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col">
                      <span className="text-xs text-indigo-500 uppercase tracking-wider font-bold">
                        Selected Date
                      </span>
                      <span className="text-lg font-bold text-slate-800">
                        {format(selectedDate, "EEEE, MMMM d, yyyy")}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <div
                      className={`px-3 py-1.5 rounded-xl font-medium text-xs flex items-center ${selectedStatus.badgeColor}`}
                    >
                      {selectedStatus.icon}
                      {selectedStatus.label}
                    </div>
                    <button
                      className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition shadow-md hover:shadow-lg w-full sm:w-auto active:scale-95"
                      onClick={() =>
                        alert(
                          `Proceeding with booking for ${format(selectedDate, "yyyy-MM-dd")}`,
                        )
                      }
                    >
                      Proceed
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCalendar;
