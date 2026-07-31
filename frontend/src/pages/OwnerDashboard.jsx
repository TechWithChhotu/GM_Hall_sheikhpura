import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Calendar,
  Phone,
  Check,
  X,
  Search,
  ShieldCheck,
  RefreshCw,
  Sparkles,
} from "lucide-react";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const OwnerDashboard = () => {
  const [inquiries, setInquiries] = useState([]);
  const [dateStatuses, setDateStatuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  // Separate Calendar Modal State (Opened ONLY on "Approve & Confirm")
  const [approveModal, setApproveModal] = useState({
    isOpen: false,
    inquiry: null,
    targetDate: "",
    calendarStatus: "BOOKED", // Default suggested status when confirming
  });

  // Manual Date Status Override Form states
  const [selectedDateToUpdate, setSelectedDateToUpdate] = useState("");
  const [newStatusForDate, setNewStatusForDate] = useState("AVAILABLE");
  const [isUpdatingDate, setIsUpdatingDate] = useState(false);

  // Filter & Search states
  const [activeTab, setActiveTab] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");

  const getStatusString = (status) => {
    if (typeof status === "string") return status;
    if (typeof status === "object" && status !== null) {
      return status.status || status.type || JSON.stringify(status);
    }
    return String(status || "");
  };

  // -------------------------------------------------------------
  // 1. FETCH DATA
  // -------------------------------------------------------------
  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [inquiriesRes, datesRes] = await Promise.all([
        api.get("/api/bookings/admin/inquiries"),
        api.get("/api/bookings/dates"),
      ]);

      setInquiries(inquiriesRes.data.data || inquiriesRes.data || []);
      setDateStatuses(datesRes.data.data || datesRes.data || {});
    } catch (error) {
      console.error("Dashboard Fetch Error:", error.response || error.message);
      alert("Backend error! Could not load dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // -------------------------------------------------------------
  // 2. OPEN APPROVE + CALENDAR MODAL
  // -------------------------------------------------------------
  const handleOpenApproveModal = (inquiry) => {
    const rawDate = inquiry.eventDate || inquiry.bookingDate;
    const formattedDate = rawDate
      ? new Date(rawDate).toISOString().split("T")[0]
      : "";

    setApproveModal({
      isOpen: true,
      inquiry,
      targetDate: formattedDate,
      calendarStatus: "BOOKED", // Default to fully booked on approval
    });
  };

  // -------------------------------------------------------------
  // 3. SUBMIT APPROVAL & CALENDAR OVERRIDE TOGETHER
  // -------------------------------------------------------------
  const handleConfirmAndOverrideCalendar = async () => {
    const { inquiry, targetDate, calendarStatus } = approveModal;
    const id = inquiry._id || inquiry.id;

    setUpdatingId(id);
    setApproveModal((prev) => ({ ...prev, isOpen: false }));

    try {
      // 1. Update Inquiry Status to CONFIRMED
      await api.patch(`/api/bookings/admin/inquiries/${id}/status`, {
        status: "CONFIRMED",
      });

      // 2. Synchronously Update Date Status on Calendar if Date exists
      if (targetDate) {
        await api.post("/api/bookings/admin/date-override", {
          date: targetDate,
          status: calendarStatus,
        });
      }

      // Re-sync UI
      fetchDashboardData();
    } catch (error) {
      console.error("Action Error:", error.response || error.message);
      alert("Failed to process approval & calendar sync.");
    } finally {
      setUpdatingId(null);
    }
  };

  // -------------------------------------------------------------
  // 4. DIRECT REJECT (NO POPUP)
  // -------------------------------------------------------------
  const handleDirectReject = async (id) => {
    setUpdatingId(id);
    try {
      await api.patch(`/api/bookings/admin/inquiries/${id}/status`, {
        status: "REJECTED",
      });

      setInquiries((prev) =>
        prev.map((item) =>
          item._id === id || item.id === id
            ? { ...item, status: "REJECTED" }
            : item,
        ),
      );
    } catch (error) {
      console.error("Reject Error:", error.response || error.message);
      alert("Failed to reject inquiry.");
    } finally {
      setUpdatingId(null);
    }
  };

  // -------------------------------------------------------------
  // 5. MANUAL SIDEBAR DATE OVERRIDE
  // -------------------------------------------------------------
  const handleUpdateDateStatus = async (e) => {
    e.preventDefault();
    if (!selectedDateToUpdate) return;

    setIsUpdatingDate(true);
    try {
      await api.post("/api/bookings/admin/date-override", {
        date: selectedDateToUpdate,
        status: newStatusForDate,
      });

      setSelectedDateToUpdate("");
      fetchDashboardData();
    } catch (error) {
      console.error("Date Override Error:", error.response || error.message);
      alert("Failed to update calendar date status.");
    } finally {
      setIsUpdatingDate(false);
    }
  };

  const dateList = Array.isArray(dateStatuses)
    ? dateStatuses.map((item) => ({
        date: item.eventDate
          ? new Date(item.eventDate).toISOString().split("T")[0]
          : item.date || "N/A",
        status: getStatusString(item.status),
      }))
    : Object.entries(dateStatuses).map(([date, status]) => ({
        date,
        status: getStatusString(status),
      }));

  const filteredInquiries = inquiries.filter((item) => {
    const matchesTab =
      activeTab === "ALL" ||
      item.status === activeTab ||
      (activeTab === "APPROVED" && item.status === "CONFIRMED");

    const clientName =
      item.fullName || item.clientDetails?.name || item.clientName || "";
    const phone = item.phone || item.clientDetails?.phone || "";

    return (
      matchesTab &&
      (clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        phone.includes(searchTerm))
    );
  });

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 sm:p-6 lg:p-8 font-sans relative">
      {/* Header */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center pb-6 border-b border-slate-800 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-8 h-8 text-emerald-400" />
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Owner Control Center
            </h1>
          </div>
          <p className="text-slate-400 text-sm mt-1">
            Live Backend Sync: Confirm deals & manage calendar visibility.
          </p>
        </div>

        <button
          onClick={fetchDashboardData}
          className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 px-4 py-2 rounded-xl text-sm font-semibold transition-all"
        >
          <RefreshCw
            className={`w-4 h-4 text-emerald-400 ${
              loading ? "animate-spin" : ""
            }`}
          />
          Refresh Data
        </button>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-8">
        <div className="bg-slate-800/50 border border-slate-700/60 rounded-2xl p-5">
          <span className="text-xs font-semibold text-slate-400 uppercase">
            Pending Review
          </span>
          <p className="text-3xl font-extrabold text-amber-400 mt-2">
            {inquiries.filter((i) => i.status === "PENDING").length}
          </p>
        </div>
        <div className="bg-slate-800/50 border border-slate-700/60 rounded-2xl p-5">
          <span className="text-xs font-semibold text-slate-400 uppercase">
            Confirmed Deals
          </span>
          <p className="text-3xl font-extrabold text-emerald-400 mt-2">
            {
              inquiries.filter(
                (i) => i.status === "CONFIRMED" || i.status === "APPROVED",
              ).length
            }
          </p>
        </div>
        <div className="bg-slate-800/50 border border-slate-700/60 rounded-2xl p-5">
          <span className="text-xs font-semibold text-slate-400 uppercase">
            Blocked Dates
          </span>
          <p className="text-3xl font-extrabold text-rose-400 mt-2">
            {
              dateList.filter(
                (d) => d.status === "BOOKED" || d.status === "BLOCKED",
              ).length
            }
          </p>
        </div>
        <div className="bg-slate-800/50 border border-slate-700/60 rounded-2xl p-5">
          <span className="text-xs font-semibold text-slate-400 uppercase">
            Partially Open Dates
          </span>
          <p className="text-3xl font-extrabold text-cyan-400 mt-2">
            {dateList.filter((d) => d.status === "PARTIAL").length}
          </p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-1 gap-8">
        <div className="lg:col-span-2 bg-slate-800/60 border border-slate-700/70 rounded-2xl p-6 backdrop-blur-md ">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h2 className="text-xl font-bold text-white">
              Inquiries & Deal Management
            </h2>

            <div className="flex bg-slate-900/80 p-1 rounded-xl border border-slate-700/60 text-xs">
              {["ALL", "PENDING", "APPROVED", "REJECTED"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                    activeTab === tab
                      ? "bg-emerald-600 text-white"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="relative mb-6">
            <Search className="w-5 h-5 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search by client name or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-11 pr-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {loading ? (
            <div className="text-center py-12 text-slate-400">
              Loading inquiries...
            </div>
          ) : filteredInquiries.length === 0 ? (
            <div className="text-center py-12 text-slate-500 border border-dashed border-slate-700 rounded-xl">
              No inquiry records found.
            </div>
          ) : (
            <div className="space-y-4 max-h-[640px] overflow-y-auto scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden pr-1">
              {filteredInquiries.map((inquiry) => {
                const id = inquiry._id || inquiry.id;
                const clientName =
                  inquiry.fullName ||
                  inquiry.clientDetails?.name ||
                  inquiry.clientName ||
                  "Client";
                const phone =
                  inquiry.phone || inquiry.clientDetails?.phone || "N/A";
                const eventType =
                  inquiry.eventType || inquiry.clientDetails?.eventType;
                const slot =
                  inquiry.slotPreference ||
                  inquiry.clientDetails?.slotPreference ||
                  "Full Day";
                const message =
                  inquiry.notes ||
                  inquiry.message ||
                  inquiry.clientDetails?.message;
                const eventDate = inquiry.eventDate
                  ? new Date(inquiry.eventDate).toISOString().split("T")[0]
                  : inquiry.bookingDate;
                const currentStatus = getStatusString(inquiry.status);

                return (
                  <div
                    key={id}
                    className="bg-slate-900/80 border border-slate-700/60 rounded-xl p-5 space-y-3 "
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="font-bold text-base text-white">
                          {clientName}
                        </span>
                        <p className="text-xs text-slate-400 mt-0.5">
                          Date:{" "}
                          <strong className="text-emerald-400">
                            {eventDate}
                          </strong>
                        </p>
                      </div>

                      <span
                        className={`text-xs px-3 py-1 rounded-full font-semibold ${
                          currentStatus === "CONFIRMED" ||
                          currentStatus === "APPROVED"
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                            : currentStatus === "REJECTED"
                              ? "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                              : "bg-amber-500/20 text-amber-400 border border-amber-500/30 animate-pulse"
                        }`}
                      >
                        {currentStatus}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 bg-slate-800/40 p-3 rounded-lg text-xs text-slate-300">
                      <div>
                        <span className="text-slate-500">Event:</span>{" "}
                        {eventType}
                      </div>
                      <div>
                        <span className="text-slate-500">Slot:</span> {slot}
                      </div>
                    </div>

                    {message && (
                      <p className="text-xs text-slate-400 bg-slate-800/20 p-2 rounded border-l-2 border-emerald-500">
                        "{message}"
                      </p>
                    )}

                    <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                      <a
                        href={`tel:${phone}`}
                        className="flex items-center gap-2 bg-slate-800 text-xs px-3 py-2 rounded-lg text-slate-200 border border-slate-700"
                      >
                        <Phone className="w-3.5 h-3.5 text-emerald-400" />{" "}
                        {phone}
                      </a>

                      {currentStatus === "PENDING" && (
                        <div className="flex gap-2">
                          {/* Reject: NO POPUP (Executes immediately) */}
                          <button
                            disabled={updatingId === id}
                            onClick={() => handleDirectReject(id)}
                            className="bg-rose-500/10 text-rose-400 border border-rose-500/30 text-xs px-3 py-2 rounded-lg flex items-center gap-1 hover:bg-rose-500/20 transition-all disabled:opacity-50"
                          >
                            <X className="w-4 h-4" /> Reject
                          </button>

                          {/* Accept & Confirm: OPENS OVERRIDE CALENDAR POPUP */}
                          <button
                            disabled={updatingId === id}
                            onClick={() => handleOpenApproveModal(inquiry)}
                            className="bg-emerald-600 text-white text-xs px-4 py-2 rounded-lg flex items-center gap-1 hover:bg-emerald-500 shadow-md shadow-emerald-600/20 transition-all disabled:opacity-50"
                          >
                            <Check className="w-4 h-4" /> Approve & Confirm
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* ========================================================= */}
      {/* ANIMATED CALENDAR OVERRIDE MODAL (Approve Only)            */}
      {/* ========================================================= */}
      {approveModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md transition-all duration-300">
          <div className="bg-slate-900 border border-slate-700/80 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative text-slate-100 transform transition-all duration-300 scale-100 animate-in fade-in zoom-in-95">
            {/* Header Glow */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-32 h-12 bg-emerald-500/20 blur-2xl rounded-full pointer-events-none" />

            <button
              onClick={() =>
                setApproveModal((prev) => ({ ...prev, isOpen: false }))
              }
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800 transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Title */}
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-400">
                <Sparkles className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">
                  Confirm Booking & Update Calendar
                </h3>
                <p className="text-xs text-slate-400">
                  Client:{" "}
                  <span className="text-emerald-400 font-semibold">
                    {approveModal.inquiry?.fullName ||
                      approveModal.inquiry?.clientDetails?.name ||
                      "Client"}
                  </span>
                </p>
              </div>
            </div>

            {/* Modal Body / Calendar Form */}
            <div className="mt-6 space-y-4 bg-slate-800/40 p-4 rounded-2xl border border-slate-700/50">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">
                  Booking Date
                </label>
                <div className="flex items-center gap-2 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-200 font-mono text-sm">
                  <Calendar className="w-4 h-4 text-emerald-400" />
                  <input
                    type="date"
                    value={approveModal.targetDate}
                    onChange={(e) =>
                      setApproveModal((prev) => ({
                        ...prev,
                        targetDate: e.target.value,
                      }))
                    }
                    className="bg-transparent border-none focus:outline-none text-white w-full"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">
                  Set Calendar Status for this Date
                </label>
                <select
                  value={approveModal.calendarStatus}
                  onChange={(e) =>
                    setApproveModal((prev) => ({
                      ...prev,
                      calendarStatus: e.target.value,
                    }))
                  }
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="BOOKED">
                    🔴 Fully Booked / Blocked (Recommended)
                  </option>
                  <option value="PARTIAL">
                    🟡 Partially Booked (Slots Remaining)
                  </option>
                  <option value="AVAILABLE">🟢 Keep Open / Available</option>
                </select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={() =>
                  setApproveModal((prev) => ({ ...prev, isOpen: false }))
                }
                className="w-1/2 py-3 px-4 rounded-xl border border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700 text-xs font-semibold transition-all"
              >
                Cancel
              </button>

              <button
                onClick={handleConfirmAndOverrideCalendar}
                className="w-1/2 py-3 px-4 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-1.5"
              >
                <Check className="w-4 h-4" /> Confirm & Push
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OwnerDashboard;
