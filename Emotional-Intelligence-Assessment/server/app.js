import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Routes
import authRoutes from "./routes/auth.js";
import quizRoutes from "./routes/quiz.js";
import aiReportRoutes from "./routes/aiReportRoutes.js";

// Load .env
dotenv.config();

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);
const app = express();

const buildPath = path.join(__dirname, "dist");
if (fs.existsSync(buildPath)){
app.use(express.static(buildPath));
app.get(/^\/(?!api).*/,(req, res)=>{
    res.sendFile(path.join(buildPath, "index.html"));
})
}
// Middleware
app.use(cors({ origin: ["http://localhost:5173", "https://nuvio.care/"] }));
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected"))
.catch((err) => console.error("❌ MongoDB Error:", err));

// Routes
app.get("/", (req, res) => {
  res.send("Server is working!");
});

app.use("/api/auth", authRoutes);   // handles /register & /login
app.use("/api/quiz", quizRoutes);   // handles /result & /results/:userId
app.use("/api/ai", aiReportRoutes); // handles AI report

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
