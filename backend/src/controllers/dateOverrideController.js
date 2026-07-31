import DateOverride from "../models/DateOverride.js";
import { Booking } from "../models/Booking.js"; // Standardize on Booking model
// GET: Fetch all date overrides
export const getDateOverrides = async (req, res) => {
  try {
    // 1. Fetch records where manual overrides or bookings exist
    const bookings = await DateOverride.find({}).sort({ eventDate: 1 });
    console.log("Raw DB Records:", bookings);

    // 2. Format response to keep frontend clean (YYYY-MM-DD format)
    const formattedData = bookings.map((item) => {
      const dateStr = item.eventDate
        ? new Date(item.eventDate).toISOString().split("T")[0]
        : item.date;

      return {
        date: dateStr,
        status: item.status,
        note: item.notes || item.note || "",
      };
    });

    return res.status(200).json({
      success: true,
      data: formattedData,
    });
  } catch (error) {
    console.error("Error fetching date overrides:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching calendar dates.",
      error: error.message,
    });
  }
};

// POST: Add or update date status (Push Status to Calendar)
export const upsertDateOverride = async (req, res) => {
  try {
    const { date, status } = req.body;

    if (!date || !status) {
      return res.status(400).json({
        success: false,
        message: "Please provide both 'date' (YYYY-MM-DD) and 'status'.",
      });
    }

    // Upsert: Updates existing date or inserts a new record if it doesn't exist
    const updatedOverride = await DateOverride.findOneAndUpdate(
      { date },
      { status },
      { new: true, upsert: true, runValidators: true },
    );

    return res.status(200).json({
      success: true,
      message: `Date ${date} updated to ${status} successfully.`,
      data: updatedOverride,
    });
  } catch (error) {
    console.error("Error updating date status:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while saving date override.",
      error: error.message,
    });
  }
};

// DELETE: Reset/Remove override for a specific date
export const deleteDateOverride = async (req, res) => {
  try {
    const { date } = req.params;

    const deleted = await DateOverride.findOneAndDelete({ date });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: `No override found for date ${date}.`,
      });
    }

    return res.status(200).json({
      success: true,
      message: `Override removed for date ${date}.`,
    });
  } catch (error) {
    console.error("Error deleting date override:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while resetting date status.",
      error: error.message,
    });
  }
};
