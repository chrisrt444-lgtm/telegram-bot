import TelegramBot from "node-telegram-bot-api";

const TOKEN = "8554767072:AAGYgg8nSWQ2Xxw6O3QPtXtw-SLpd2DDA64k";

const bot = new TelegramBot(TOKEN, { polling: true });

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "🤖 Bot is online!");
});
