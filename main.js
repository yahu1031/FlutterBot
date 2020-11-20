//  ! Import required modules/packages.
require('dotenv').config();
const Discord = require('discord.js');
const fs = require('fs');
const fetch = require('node-fetch');
const client = new Discord.Client();

//  ! Environment variables.
client.token = process.env.BOT_TOKEN;
client.prefix = process.env.PREFIX;
client.flutterApi = process.env.FLUTTERAPI;
client.maintainerID = process.env.MAINTAINERID;
client.docsLink = process.env.DOCSLINK;
client.pubApi = process.env.PUBAPI;
client.pubDocs = process.env.PUBAPIDOCS;

//  ! Bin website sources
client.binSites = new Discord.MessageEmbed()
    .setColor('#')
    .setTitle('Bin Sites')
    .setDescription('Here are some bin site we mostly prefer to use for easy code sharing.')
    .addFields({
        name: '**Hastebin**',
        value: 'https://hasteb.in/ or https://hastebin.com/',
    }, {
        name: '**Pastebin**',
        value: 'https://pastebin.com/',
    }, {
        name: '**Sourcebin**',
        value: 'https://sourceb.in/',
    }, {
        name: '**GitHub Gist**',
        value: 'https://gist.github.com/',
    }).setTimestamp();

//  ! Reading command files dynamically.
client.commands = new Discord.Collection();

//  ! Retrieving all command files.
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

//  ! Dynamically setting commands to the Collection.
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

//  ! Fetching data from flutter API.
const get_data = async () => {
    try {
        const data = await fetch(client.flutterApi).then(response => response.json());
        console.log('Data fetched from API.....✔️');
        //  ! Checking if the fetched data is null.
        if (data != null) {
            console.log(`${client.user.tag} has been logged in.....🌐`);
            //  ! Setting up the bot status.
            client.user.setPresence({
                status: 'online',
                activity: {
                    name: 'your commands',
                    type: 'WATCHING',
                    url: 'https://github.com/yahu1031/FlutterBot.git',
                },
            });
            //  ! Making the data accessable within the project.
            client.flutterData = data;
            return;
        }
        return;
    }
    catch (err) {
        return console.log('❌️' + err);
    }
};

//  ! On bot ready.
client.once('ready', () => {
    get_data(client.flutterApi);
});

//  ! Handling websocket & network error
client.on('shardError', error => {
    return console.error('❌️ A websocket connection encountered an error: \n', error);
});

//  ! Handling API Errors
process.on('unhandledRejection', error => {
    return console.error('❌️ Unhandled promise rejection: \n', error);
});

//  ! Listening to messages
client.on('message', message => {
    // ! This makes your bot ignore other bots and itself
    // ! and not get into a spam loop (we call that "botception").
    if (message.author.bot) return;
    const args = message.content.slice(client.prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName);
    if (message.channel.type === 'dm') {
        if (message.author.bot) return;
        return message.reply(`Sorry ${message.author}! I can't reply you here. Ask in the server, I can help you there.`);
    }
    else if (message.mentions.has(client.user.id)) {
        client.commands.get('mention').execute(message);
    }
    else if (message.content === client.prefix + 'code') {
        // Delete the user's message in 5mins, inform it by the bot's message.
        // message.delete({ timeout: 5 * 60 * 1000 });
        message.channel.send('Hey bud, We would request you to kindly share your code in following bin sites.');
        return message.channel.send(client.binSites);
    }
    else if (message.content.toLowerCase() === client.prefix + 'sourcecode') {
        return message.channel.send('Hey bud, We appriciate your interest to develop the bot.\n Here is the source code for the FlutterBot. https://github.com/yahu1031/flutterbot');
    }
    else {
        if (!client.commands.has(commandName) || !message.content.startsWith(client.prefix)) return;
        if (command.args && args.length) {
            try {
                client.notFoundMsg = new Discord.MessageEmbed()
                    .setColor('#ff0000')
                    .setTitle('Not Found')
                    .setDescription(`Sorry, we couldn't able to fetch details about **${args[0]}**.`);
                client.noDocsFound = new Discord.MessageEmbed()
                    .setColor('#ff0000')
                    .setTitle('Not Found')
                    .setDescription(`Sorry, we couldn't able to fetch Documentation about **${args[0]}**.`);
                command.execute(client, message, args);
            }
            catch (error) {
                console.error(error.message);
                return message.channel.send(`There was an error trying to execute that command!, <@${client.maintainerID}> will check it.`);
            }
            return;
        }
        else {
            return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
        }
    }
});

//  ! logging in the client.
client.login(client.token);