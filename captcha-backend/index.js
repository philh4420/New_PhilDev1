import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const allowedOrigins = [
  "http://localhost:8080",
  "https://new-phil-dev1.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
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
app.listen(process.env.PORT, () => {
  console.log(`✅ Server running on port ${process.env.PORT}`);
});


