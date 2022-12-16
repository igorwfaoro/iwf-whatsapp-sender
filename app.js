const { Client } = require('whatsapp-web.js');
var qrcode = require('qrcode-terminal');

const PHONE_ID = '554192625362@c.us';
const MESSAGE = 'Hello World';
const SEND_TIMES = 10000;

const client = new Client();

client.on('qr', (qr) => {
    // Generate and scan this code with your phone
    console.log('QR RECEIVED', qr);
    qrcode.generate(qr, { small: true });
});

client.on('authenticated', () => {
    console.log('AUTHENTICATED');
});

client.on('auth_failure', msg => {
    // Fired if session restore was unsuccessful
    console.error('AUTHENTICATION FAILURE', msg);
});

client.on('ready', async () => {
    console.log('Client is ready!');

    for (const _ of Array.from({ length: SEND_TIMES }))
        await client.sendMessage(PHONE_ID, MESSAGE);
});

client.on('message', msg => {
    console.log('received message', msg.body)
    // if (msg.body == '!ping') {
    //     msg.reply('pong');
    // }
});

client.initialize();