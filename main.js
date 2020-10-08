//! Import required modules/packages
require('dotenv').config();

const fs = require('fs');
const Discord = require('discord.js');
const ms = require('ms');

const bot = new Discord.Client();
let commandTimeout = {};

//! Reading command files dynamically
bot.commands = new Discord.Collection();
//! Retrieving all command files 
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
//! Dynamically setting commands to the Collection
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    bot.commands.set(command.name, command);
}

async function checkActivity(bot) {
    const botGuilds = bot.guilds.cache;
    // loop through the guilds
    botGuilds.forEach(async (guild) => {
        guild.channels.cache.forEach(async channel => {
            if (channel.parentID !== process.env.NEEDED_HELP) return;

            if (!channel.lastMessage) {
                lastMessageTime = await channel.messages.fetch(
                    channelChecking.lastMessageID
                ).createdAt;
            } else lastMessageTime = channel.lastMessage.createdAt;

            if (!lastMessageTime) return;

            let time = Date.now() - lastMessageTime;

            if (time < 120000) return;

            //IF IT HAS GOTTEN HERE IT MEANS THAT THE @HELPER SHOULD GET PINGED
        })
    });
    console.log('checking channels');
};

//! On bot ready
bot.on('ready', () => {
    console.log(`${bot.user.tag} has been logged in.`);
    bot.user.setPresence({
        status: 'online',
        activity: {
            name: 'your commands',
            type: 'LISTENING',
            url: 'https://github.com/'
        },
    });


    setInterval(checkActivity, 1000, bot);
})

//! On message instance
bot.on('message', message => {
    if (!message.author || message.author.bot) return timer = true;
    // TODO - Check if message is in channel of NEEDED  HELP category

    // TODO - 
    const lastMessage = message.channel.fetch({
        limit: 1
    }).then(messages => console.log(`Received ${messages.size} messages`)).catch(console.error);
    setTimeout(() => {
        if (message.channel.parentID === process.env.NEEDED_HELP) {
            if (Math.floor(Date.now() / 1000) - Math.floor(lastMessage.createdTimestamp / 1000) >= 20) {
                // if (message.author.id == message.author.id) {
                console.log('moving to free to help');
                message.channel.setParent(process.env.FREE_TO_HELP);

                commandTimeout[message.author.id] = false;
                // setTimeout(() => {

                // }, ms('20s'));
                // }
            }
        }
    }, ms('20s'));
    const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    // TODO - Mention Bot to get all the commands and help
    if (message.content === `<@!${process.env.BOT_ID}>`) {
        message.channel.send('You mentioned bot');
    }
    // TODO - Check if the command is started with prefix
    else if (message.content.startsWith(process.env.PREFIX)) {
        //^ Checking for help command
        if (command === 'help') {
            bot.commands.get('help').execute(message, args);

        }
        //^ Checking for ping command
        else if (command === 'ping') {
            bot.commands.get('ping').execute(message, args);
        }
    }
});
//! logging in the bot
bot.login(process.env.BOT_TOKEN);