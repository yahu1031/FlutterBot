//! Import required modules/packages.
require('dotenv').config();

const fs = require('fs');
const Discord = require('discord.js');
const bot = new Discord.Client();
const prefix = process.env.PREFIX;

//! Checks for a numerics in the String.
let hasNumber = /\d/;

//! Reading command files dynamically.
bot.commands = new Discord.Collection();
//! Retrieving all command files.
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
//! Dynamically setting commands to the Collection.
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    bot.commands.set(command.name, command);
}

//! On bot ready.
bot.on('ready', () => {
    console.log(`${bot.user.tag} has been logged in.`);
    bot.user.setPresence({
        status: 'online',
        activity: {
            name: 'your commands',
            type: 'WATCHING',
            url: 'https://github.com/'
        },
    });
});

//! On message instance.
bot.on('message', message => {
    if (message.author.bot) return;
    try {
        if (message.channel.type == "dm") {
            if (message.author.bot) return;
            if (message.mentions.has(bot.user)) {
                bot.commands.get('mention').execute(message);
                message.channel.send('**NOTE:** These commands won\'t work here.');
                return;
            }
            else return message.reply(`Sorry ${message.author}! I can't reply you here. Ask in the server and for sure I can help you there.`);
        }
        // TODO - Mention Bot to get all the commands and help.    
        if (message.mentions.has(bot.user)) {
            if (message.author.bot) return;
            bot.commands.get('mention').execute(message);
        }
        // TODO - Check if the command is started with prefix.
        const args = message.content.slice(prefix.length)
            .trim()
            .split(/ +/);
        const command = args.shift().toLowerCase();
        const regex = /^(?<type>[\S]*?)(!)(?<whitespace>[\s]?)(?<command>[\S]*?)$/g;
        const str = message.content; //Your input string
        const result = regex.exec(str);
        if (result[3] === ' ') {
            if (message.author.bot) return;
            //^ Checking for top Widget/Object command.
            if (message.content.startsWith(`top${prefix}`)) {

                //& Check for the Numerics in the args.
                if (hasNumber.test(args) || !isNaN(args)) return message.channel.send('Make sure you are not searching a Numeric or an AlphaNumeric Package/Object.');
                bot.commands.get('top').execute(message, args);
                return;
            }
            //^ Checking for top Widget's/Object's property command.
            if (message.content.startsWith(`prop${prefix}`)) {
                if (message.author.bot) return;

                //& Check for the Numerics in the args.
                if (hasNumber.test(args) || !isNaN(args)) return message.channel.send('Make sure you are not searching a Numeric or an AlphaNumeric Package\'s/Object\'s property.');
                bot.commands.get('prop').execute(message, args);
                return;
            }
            //^ Checking for all widgets/objects command.
            else if (message.content.startsWith(`all${prefix}`)) {
                bot.commands.get('all').execute(message, args);
                return;
            }
            //^ Checking for all properties of widget/object command.
            else if (message.content.startsWith(`allprop${prefix}`)) {
                bot.commands.get('allprop').execute(message, args);
                return;
            } else if (message.content.startsWith(`pub${prefix}`)) {
                bot.commands.get('pub').execute(message, args);
                return;
            }
            return;
        }
        else return message.channel.send(new Discord.MessageEmbed()
                        .setColor('#ff0000')
                        .setTitle('Wrong arguments')
                        .setDescription(`We hope you don't know how to use property command. Check for pinned messages for help or tag me for all commads help.`));
    } catch (err) {
        return console.log(err.message);
    }
});

//! logging in the bot.
bot.login(process.env.BOT_TOKEN);