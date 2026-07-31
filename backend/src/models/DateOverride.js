import mongoose from "mongoose";

const dateOverrideSchema = new mongoose.Schema(
  {
    date: {
      type: String, // Format: YYYY-MM-DD
      required: true,
      unique: true,
    },
    status: {
      type: String,
      enum: ["AVAILABLE", "PARTIAL", "BOOKED", "BLOCKED"],
      default: "AVAILABLE",
    },
  },
  { timestamps: true },
);

const DateOverride = mongoose.model("DateOverride", dateOverrideSchema);
export default DateOverride;
