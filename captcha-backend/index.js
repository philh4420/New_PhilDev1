import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// ✅ Enable CORS from Vite (localhost:8080)
app.use(cors({
  origin: process.env.FRONTEND_ORIGIN?.split(",") || ["http://localhost:8080"],
  methods: ["POST"],
  allowedHeaders: ["Content-Type"],
}));

// ✅ Required to parse JSON body
app.use(express.json());

app.post("/verify-token", async (req, res) => {
  const { token } = req.body;
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  try {
    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`,
      { method: "POST" }
    );

    const data = await response.json();

    res.json({
      success: data.success,
      challenge_ts: data.challenge_ts,
      hostname: data.hostname,
    });
  } catch (err) {
    console.error("Verification error:", err);
    res.status(500).json({ success: false, error: "Token verification failed" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ reCAPTCHA backend running on http://localhost:${PORT}`);
});
