require('dotenv').config();
const TelegramApi = require('node-telegram-bot-api');
const { againOptions, gameOptions } = require('../options');
// const weather = require('../weather')
const API_TELEGRAM_TOKEN = process.env.API_TELEGRAM_TOKEN;
const stickerHello =
  'https://tlgrm.ru/_/stickers/c22/4c9/c224c9aa-b175-3f4b-b46e-6142170015c6/1.webp';
const stickerFail =
  'https://tlgrm.ru/_/stickers/c22/4c9/c224c9aa-b175-3f4b-b46e-6142170015c6/192/47.webp';
const stickerTrue =
  'https://tlgrm.ru/_/stickers/c22/4c9/c224c9aa-b175-3f4b-b46e-6142170015c6/192/52.webp';
const stickerInfo =
  'https://tlgrm.ru/_/stickers/c22/4c9/c224c9aa-b175-3f4b-b46e-6142170015c6/192/49.webp';
const bot = new TelegramApi(API_TELEGRAM_TOKEN, { polling: true });

// bot.setWebHook('public-url.com', {
//   certificate: 'path/to/crt.pem', // Path to your crt.pem
// });

const chats = {};

const startGame = async (chatId) => {
  await bot.sendMessage(chatId, `Вгадай число від 0 до 9`);
  const randomNumber = Math.floor(Math.random() * 10);
  chats[chatId] = randomNumber;
  await bot.sendMessage(chatId, `Відгадай`, gameOptions);
  return;
};

const start = () => {
  // weather()
  bot.setMyCommands([
    { command: '/start', description: 'Привітання!' },
    { command: '/info', description: 'Інформація' },
    { command: '/game', description: 'Тупо пограти коли нефіг делать' },
  ]);

  bot.on('message', async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;

    switch (text) {
      case '/start':
        await bot.sendSticker(chatId, stickerHello);
        bot.sendMessage(
          chatId,
          `Радий вітати ${msg.from.first_name} ${
            msg.from.last_name || ''
          } в телеграм боті Polovynka Team.`
        );
        return;
      case '/info':
        return await bot.sendSticker(chatId, stickerInfo);
      case '/game':
        return startGame(chatId);

      default:
        return bot.sendMessage(
          chatId,
          `Я тебе не розумію або такої команди не знайдено, спробуй ще.`
        );
    }
  });

  bot.on('callback_query', async (msg) => {
    const data = msg.data;
    const chatId = msg.message.chat.id;
    if (data === '/again') {
      return startGame(chatId);
    }
    if (Number(data) === chats[chatId]) {
      await bot.sendSticker(chatId, stickerTrue);
      return bot.sendMessage(
        chatId,
        `Вітаю, ти вгадав цифру ${chats[chatId]}`,
        againOptions
      );
    } else {
      await bot.sendSticker(chatId, stickerFail);
      return bot.sendMessage(
        chatId,
        `На жаль ти не вгадав, загадане число ${chats[chatId]}`,
        againOptions
      );
    }
  });
};
start();
