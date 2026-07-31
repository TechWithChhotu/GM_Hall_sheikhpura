import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import BookingCalendar from "./components/BookingCalendar";
import BookingPage from "./pages/BookingPage";
import Footer from "./components/Footer";
import OwnerDashboard from "./pages/OwnerDashboard";
import FAQPage from "./pages/FAQPage";
import ContactPage from "./pages/ContactPage";
import GalleryPage from "./pages/GalleryPage";
import PackagesPage from "./pages/PackagesPage";
import ScrollToTop from "./hooks/ScrollToTop";

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="bg-slate-950 text-slate-100 min-h-screen font-sans selection:bg-rose-500 selection:text-white flex flex-col">
        <Navbar />

        {/* FIXED: Added <main className="pt-20 flex-grow"> */}
        {/* pt-20 adds 80px of padding at top, preventing ANY route from overlapping with Navbar */}
        <main className="pt-20 flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/packages" element={<PackagesPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/owner" element={<OwnerDashboard />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}
