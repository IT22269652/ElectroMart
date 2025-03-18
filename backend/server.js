import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoute.js";

// app config
const app = express();
const port = 4000;

// middleware
app.use(express.json());
app.use(cors());

// db connection
connectDB();

// api endpoints
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.send("API WORKING");
});

app.listen(port, () => {
  console.log(`Server Started on http://localhost:${port}`);
});
