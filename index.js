const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());

// Environment variables (Render → Environment → Variables)
const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

// test route
app.get("/", (req, res) => {
  res.send("🚀 Bot is live!");
});

// API endpoint to send signal
app.post("/send-signal", async (req, res) => {
  const { asset, signal } = req.body;

  if (!BOT_TOKEN || !CHAT_ID) {
    return res.status(500).send("❌ BOT_TOKEN or CHAT_ID not set");
  }

  try {
    const text = `📊 Signal\nAsset: ${asset}\nSignal: ${signal}`;
    await axios.post(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        chat_id: CHAT_ID,
        text: text,
        parse_mode: "HTML",
      }
    );

    res.send("✅ Signal sent!");
  } catch (err) {
    console.error("Telegram API Error:", err.response?.data || err.message);
    res.status(500).send("❌ Failed to send signal");
  }
});

// Render requires PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
