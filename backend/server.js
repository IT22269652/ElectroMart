import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import feedbackRouter from "./routes/feedbackRoute.js"; // Import Feedback Routes
import productRouter from "./routes/productRoute.js";

// App Configuration
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Database Connection
connectDB();

// API Routes
app.use("/api/user", userRouter);
app.use("/api/feedback", feedbackRouter); // Add Feedback API Route
app.use("/api/products", productRouter);

// Root Route
app.get("/", (req, res) => {
  res.send("🚀 API is working!");
});

// Start Server with Error Handling
app
  .listen(PORT, () => {
    console.log(`✅ Server started on http://localhost:${PORT}`);
  })
  .on("error", (err) => {
    console.error("❌ Server failed to start:", err.message);
  });
