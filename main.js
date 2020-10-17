//  ! Import required modules/packages.
require('dotenv').config();
const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = process.env.PREFIX;

//  ! Reading command files dynamically.
client.commands = new Discord.Collection();

//  ! Retrieving all command files.
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

//  ! Dynamically setting commands to the Collection.
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

//  ! On bot ready.
client.once('ready', () => {
    console.log(`${client.user.tag} has been logged in.`);
    client.user.setPresence({
        status: 'online',
        activity: {
            name: 'your queries',
            type: 'LISTENING',
            url: 'https://github.com/yahu1031/Flutterclient.git',
        },
    });
});

//  ! Handling websocket & network error
client.on('shardError', error => {
    console.error('A websocket connection encountered an error:', error);
});

//  ! Handling API Errors
process.on('unhandledRejection', error => {
    console.error('Unhandled promise rejection:', error);
});

//  ! Listening to messages
client.on('message', message => {
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName);
    if (message.author.bot) return;
    if (message.mentions.has(client.user.id)) {
        client.commands.get('mention').execute(message, args);
    }
    else {
        if (!client.commands.has(commandName)) return;
        if (command.args && args.length) {
            try {
                command.execute(message, args);
            }
            catch (error) {
                console.error(error.message);
                return message.reply(`There was an error trying to execute that command!, <@${process.env.MAINTAINER}> will check it.`);
            }
            return;
        }
        else {
            return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
        }
    }
});

//  ! logging in the client.
client.login(process.env.BOT_TOKEN);