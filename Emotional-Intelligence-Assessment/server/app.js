import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// 1. Load Environment Variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

// 2. CRITICAL: Global Middlewares (MUST come before routes)
app.use(cors());
app.use(express.json()); // This fixes the 'undefined' req.body
app.use(express.urlencoded({ extended: true }));

// 3. Import Routes
import authRoutes from "./routes/auth.js";
import quizRoutes from "./routes/quiz.js";
import aiReportRoutes from "./routes/aiReportRoutes.js";

// 4. Use Routes
app.use("/api/auth", authRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/ai", aiReportRoutes);

// 5. MongoDB Connection
mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/nuvio")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));
// 6. Default Route (Health Check)
app.get("/", (req, res) => res.send("Server is running!"));

// 7. Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));