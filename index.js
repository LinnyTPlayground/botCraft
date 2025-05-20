require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
})


const greetings = ['hello', 'hi', 'hey', 'yo', 'sup'];


client.on('messageCreate', message => {
    if (message.author.bot) return;

    const username = message.member.displayName;
    const responses = [`Hey ${username}!`, `Hi ${username}!`, `What's up ${username}!`, `Hello ${username}!`];
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];

    const msg = message.content.toLowerCase();

    // Yay Feature
    if (msg.includes('yay')) {
        message.channel.send(`Good Job ${username}!`)
    }

    // Greeting Feature
    if (greetings.some(greet => msg.includes(greet))) {
        message.channel.send(randomResponse);
    }

    // Scolding Feature
    if (message.content.startsWith('!scold')) {
        const mentionedUser = message.mentions.users.first();
        if (!mentionedUser) {
            message.reply('Please mention someone to scold (!scold @user)');
            return;
        };

        const mentionedTag = `<@${mentionedUser.id}>`;
        const scoldMessages = [
            `Better stop lying and start apologizing ${mentionedTag}`,
            `Prank together, get spanked together ${mentionedTag}`,
            `${mentionedTag}... you're on thin ice.`,
            `Behave yourself ${mentionedTag}`,
            `Really? ${mentionedTag}`,
            `That's not very nice ${mentionedTag}`,
        ]
        const randomScold = scoldMessages[Math.floor(Math.random() * scoldMessages.length)]
        message.channel.send(randomScold);
    }
});

client.login(process.env.BOT_TOKEN);
