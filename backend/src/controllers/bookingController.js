import { Booking } from "../models/Booking.js";
import { asyncHandler } from "../middlewares/asyncWrapper.js";
import DateOverride from "../models/DateOverride.js";
// import Inquiry from "../models/Inquiry.js";
// @desc    Create a new booking request
// @route   POST /api/bookings
// @access  Public

export const createBooking = asyncHandler(async (req, res) => {
  try {
    console.log("Inquiry submitted:", req.body);

    const { fullName, phone, eventType, eventDate, guestCount, notes } =
      req.body;

    // 1. Validation check for date
    if (!eventDate || isNaN(new Date(eventDate).getTime())) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid event date.",
      });
    }

    const parsedDate = new Date(eventDate);

    // 2. Check if date is already booked
    const existingBooking = await Booking.findOne({
      eventDate: parsedDate,
      status: "CONFIRMED",
    });

    if (existingBooking) {
      return res.status(400).json({
        success: false,
        message: "This date is already booked for a confirmed event.",
      });
    }

    // 3. Create Booking
    const booking = await Booking.create({
      fullName,
      phone,
      eventType,
      eventDate: parsedDate,
      guestCount: guestCount || 0,
      notes: notes || "",
    });

    return res.status(201).json({
      success: true,
      message: "Booking request submitted successfully!",
      data: booking,
    });
  } catch (error) {
    console.error("Create Booking Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

// @desc    Get all booked dates (for frontend calendar display)
// @route   GET /api/bookings/dates
// @access  Public
export const getBookedDates = asyncHandler(async (req, res) => {
  console.log("getBookedDates");
  const bookings = await Booking.find({}, "eventDate status");

  res.status(200).json({
    success: true,
    data: bookings,
  });
});

export const getAllInquiries = asyncHandler(async (req, res) => {
  const inquiries = await Booking.find().sort({ createdAt: -1 });
  console.log("admin/inquiries ==> hited");
  res.status(200).json({
    success: true,
    count: inquiries.length,
    data: inquiries,
  });
});

// @desc    Approve or Reject an inquiry deal
// @route   PATCH /api/admin/inquiries/:id/status
// @access  Owner/Admin
export const updateInquiryStatus = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Use Booking instead of Inquiry
    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true },
    );

    if (!updatedBooking) {
      return res.status(404).json({
        success: false,
        message: "Booking/Inquiry not found in database.",
      });
    }

    return res.status(200).json({
      success: true,
      data: updatedBooking,
    });
  } catch (error) {
    console.error("Patch Inquiry Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// @desc    Directly block/unblock or set partial date status on calendar
// @route   POST /api/admin/date-override
// @access  Owner/Admin

export const overrideDateStatus = asyncHandler(async (req, res) => {
  console.log("overrideDateStatus called");

  const { date, status } = req.body;

  if (!date || !status) {
    return res.status(400).json({
      success: false,
      message: "Date and status are required.",
    });
  }

  const allowedStatuses = ["AVAILABLE", "PARTIAL", "BOOKED", "BLOCKED"];

  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      message: "Invalid status.",
    });
  }

  const override = await DateOverride.findOneAndUpdate(
    { date }, // Find by date
    { status }, // Update status
    {
      new: true, // Return updated document
      upsert: true, // Create if not exists
      runValidators: true,
    },
  );

  res.status(200).json({
    success: true,
    message: "Date status updated successfully.",
    data: override,
  });
});
