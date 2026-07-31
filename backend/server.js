import dotenv from "dotenv";
dotenv.config();

import app from "./src/app.js";
import { connectDB } from "./src/config/db.js";

const PORT = process.env.PORT || 5000;

// Connect DB first, then listen
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(
      `🚀 GM Hall Server listening in ${process.env.NODE_ENV} mode on port ${PORT}`,
    );
  });
});
