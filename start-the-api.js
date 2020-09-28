require("dotenv").config();

const TelegramBot = require('node-telegram-bot-api');
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const http = require("http").createServer(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// create a new TelegramBot, and set polling to false since I just need to send messages.
const telegramBot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {
    polling: false
});

const port = process.env.PORT;
const appUrl = process.env.APP_URL;

// starting the server
http.listen(port, function () {
    console.log(`Listening on port ${port} [${appUrl}:${port}]`);
});

// API route(s)

app.get('/', (request, response) => {
    response.send(`<div style='width:500px; background-color:green; margin: 0 auto;text-align:center;max-width:95%;height:40px; padding-top: 23px;border-radius:10px; color: black; background-color: #EEEEEE; margin-top: 50px;font-family: helvetica'>If you can see this page, that means the API server is running.</div>`);
});

app.post('/send-notification', (request, response) => {
    if (request.body.token != process.env.API_SECRET_TOKEN) {
        response.status(401).send({
            error: "invalid token"
        });
    } else if (typeof request.body.message === 'undefined' || request.body.message == '') {
        response.status(400).send({
            error: "invalid notification message, please make sure the message parameter is set and not empty"
        });
    } else {
        telegramBot.sendMessage(process.env.MY_CHAT_ID, request.body.message).then(() => {
            timestamp = new Date().toISOString();
            console.log(`[${timestamp}] Message: ${request.body.message}`);
            console.log(`[${timestamp}] Status: Message sent successfully\n`);
            response.send({
                response: "notification sent successfully"
            });
        }).catch((error) => {
            response.send(error.response.body);
        })
    } // else 
}); // send-notification