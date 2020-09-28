/*-------------------------------------------------------*
Telegram notifications API: 
https://github.com/HassanKanj/telegram-notifications-api
*-------------------------------------------------------*/

// This file is the entry point, it will do some checks before starting the API.

require("dotenv").config();

if (!process.env.TELEGRAM_BOT_TOKEN) {
    require('./bot-token-is-not-set');
} else if (!process.env.API_SECRET_TOKEN) {
    require('./generate-api-token');
} else if (!process.env.MY_CHAT_ID) {
    require('./get-chat-id');
} else {
    require('./start-the-api');
}