import express from "express";
import {
  getDateOverrides,
  upsertDateOverride,
  deleteDateOverride,
} from "../controllers/dateOverrideController.js";

const router = express.Router();

// GET: Fetch date overrides for calendar (/api/bookings/dates)
router.get("/booking-calender", getDateOverrides);

// POST: Update or create manual date status (/api/bookings/admin/date-override)
router.post("/admin/date-override", upsertDateOverride);

// DELETE: Optional - Reset date status (/api/bookings/admin/date-override/:date)
router.delete("/admin/date-override/:date", deleteDateOverride);

export default router;
