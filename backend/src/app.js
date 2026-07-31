import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import bookingRoutes from "./routes/bookingRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import calendarRoutes from "./routes/dateOverrideRoutes.js";

const app = express();

// Security & Middlewares
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL || "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// API Routes
app.use("/api/bookings", bookingRoutes);
app.use("/api/calendar", calendarRoutes);

// Health Check
app.get("/health", (req, res) => {
  res
    .status(200)
    .json({ status: "OK", message: "GM Hall Server Running Smoothly" });
});

// 404 Route Handler
app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
});

// Global Error Handler
app.use(errorHandler);

export default app;
