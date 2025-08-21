const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// ✅ Environment variables (Render Dashboard → Environment)
const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

// Home route
app.get("/", (req, res) => {
  res.send("🚀 Telegram Signal Bot Server Running ✅");
});

// API endpoint to send signal
app.post("/send-signal", async (req, res) => {
  const { asset, action, timeframe } = req.body;

  if (!BOT_TOKEN || !CHAT_ID) {
    return res.status(500).json({ error: "BOT_TOKEN or CHAT_ID not set" });
  }

  try {
    const message = `📊 Signal Alert\nAsset: ${asset}\nAction: ${action}\nTimeframe: ${timeframe}`;
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

    await axios.post(url, {
      chat_id: CHAT_ID,
      text: message,
      parse_mode: "HTML",
    });

    res.json({ success: true, message: "Signal sent ✅" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to send signal" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
