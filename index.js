require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
})

const greetings = ['hello', 'hi', 'hey', 'yo', 'sup'];

client.on('messageCreate', message => {
    if (message.author.bot) return;

    const msg = message.content.toLowerCase();

    if (msg === 'ping') {
        message.channel.send('Pong!');
    } else if (greetings.some(greet => msg.includes(greet))) {
        message.channel.send('Hi there!');
    }
});

client.login(process.env.BOT_TOKEN);