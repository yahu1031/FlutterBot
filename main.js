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
})

//! On message instance
bot.on('message', message => {
    if (!message.author || message.author.bot) return timer = true;
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
})
//! logging in the bot
bot.login(process.env.BOT_TOKEN);