const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const app = express();

const token = process.env.BOT_TOKEN;
const chatId = process.env.CHAT_ID;

// Bot ko polling mode me start karo
const bot = new TelegramBot(token, { polling: true });

// Jab koi /start kare to reply do
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "✅ Bot is running!");
});

// Jab koi normal message bheje to reply do
bot.on('message', (msg) => {
  if (msg.text !== '/start') {
    bot.sendMessage(msg.chat.id, `You said: ${msg.text}`);
  }
});

// Express server (Render ko chalane ke liye)
app.get('/', (req, res) => {
  res.send('Bot is live 🚀');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
