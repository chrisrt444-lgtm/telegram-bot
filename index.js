import axios from "axios";
import TelegramBot from "node-telegram-bot-api";

const TOKEN = "8554767072:AAEVFBLRMeq5Kg9IGSvc63yiV7MknmGPpiY";

const bot = new TelegramBot(TOKEN, { polling: true });

/* ===== START COMMAND ===== */
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    "🤖 Bot is ONLINE!\n\nType /menu to continue."
  );
});

/* ===== MENU COMMAND ===== */
bot.onText(/\/menu/, (msg) => {
  bot.sendMessage(msg.chat.id, "Choose an option:", {
    reply_markup: {
      keyboard: [
        ["📈 SOL Price"],
        ["ℹ️ Status"]
      ],
      resize_keyboard: true
    }
  });
});

/* ===== SOL PRICE (COMMAND) ===== */
bot.onText(/\/price/, async (msg) => {
  try {
    const res = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price",
      {
        params: {
          ids: "solana",
          vs_currencies: "usd"
        }
      }
    );

    const price = res.data.solana.usd;

    bot.sendMessage(
      msg.chat.id,
      `🟣 Solana (SOL)\n💵 $${price}`
    );
  } catch {
    bot.sendMessage(msg.chat.id, "⚠️ Could not fetch SOL price");
  }
});

/* ===== SOL PRICE (BUTTON) ===== */
bot.on("message", async (msg) => {
  if (msg.text === "📈 SOL Price") {
    try {
      const res = await axios.get(
        "https://api.coingecko.com/api/v3/simple/price",
        {
          params: {
            ids: "solana",
            vs_currencies: "usd"
          }
        }
      );

      bot.sendMessage(
        msg.chat.id,
        `🟣 Solana (SOL)\n💵 $${res.data.solana.usd}`
      );
    } catch {
      bot.sendMessage(msg.chat.id, "⚠️ Error fetching price");
    }
  }

  if (msg.text === "ℹ️ Status") {
    bot.sendMessage(msg.chat.id, "✅ Bot running\n🌐 Telegram connected");
  }
});

