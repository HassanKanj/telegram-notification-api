/*-------------------------------------------------------*
Telegram notifications API: 
https://github.com/HassanKanj/telegram-notifications-api
*-------------------------------------------------------*/

console.log(`>>> Generating a new API_SECRET_TOKEN...`);
let chars = '123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ=-.'
let token = '';

for (let i = 0; i < 105; i++) {
    let randomIndex = Math.floor(Math.random() * chars.length);
    token = token + chars.charAt(randomIndex);
}

console.log(`>>> Here's your new API_SECRET_TOKEN, make sure to add it to the .env file, then start/restart the app:\n    ${token}\n`);

return;