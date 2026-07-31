import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    eventType: {
      type: String,

      required: true,
    },
    eventDate: {
      type: Date,
      required: [true, "Event date is required"],
    },
    guestCount: {
      type: Number,
      default: 100,
    },
    status: {
      type: String,
      enum: ["PENDING", "CONFIRMED", "CANCELLED", "REJECTED"],
      default: "PENDING",
    },
    notes: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Booking = mongoose.model("Booking", bookingSchema);
