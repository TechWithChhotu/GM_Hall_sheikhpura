import express from "express";
import {
  createBooking,
  getAllInquiries,
  getBookedDates,
  overrideDateStatus,
  updateInquiryStatus,
} from "../controllers/bookingController.js";

const router = express.Router();

router.post("/", createBooking);
router.get("/dates", getBookedDates);
router.get("/monthly", async (req, res) => {
  console.log("router.get( / monthly");
  try {
    const { month } = req.query; // e.g. "2026-08"

    // Find overrides or bookings starting with "2026-08"
    const overrides = await DateOverride.find({
      date: { $regex: `^${month}` },
    });

    res.status(200).json(overrides);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch month overrides" });
  }
});

// Owner / Admin Routes
router.get("/admin/inquiries", getAllInquiries);
router.patch("/admin/inquiries/:id/status", updateInquiryStatus);
router.post("/admin/date-override", overrideDateStatus);
// /api/bookings/monthly
// Express Route Handler Example

export default router;
