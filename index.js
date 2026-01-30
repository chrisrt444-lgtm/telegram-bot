import TelegramBot from "node-telegram-bot-api";

const TOKEN = "8554767072:AAEVFBLRMeq5Kg9IGSvc63yiV7MknmGPpiY";

const bot = new TelegramBot(TOKEN, { polling: true });

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "🤖 Bot is online!");
});
