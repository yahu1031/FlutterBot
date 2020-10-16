//! Import required modules/packages.
const fetch = require('node-fetch');
const Discord = require('discord.js');

//! API url
const apiUrl = 'https://api.flutter.dev/flutter/index.json'
module.exports = {
    name: 'top',
    description: 'On Top command, the bot will provide the information about what the user is searching for.',
    execute(message, args) {
        let chaMsg = message.channel;
        if (!args.length) {
            return chaMsg.send(`You didn't provide any arguments, ${message.author}!`);
        } else {
            message.author
            // Todo - Getting Data from API.
            const get_data = async apiUrl => {
                try {
                    const data = await fetch(apiUrl).then(response => response.json())
                    const topWidget = data.find(
                        d => d.name.toLowerCase() === args[0].toLowerCase() && d.type === 'class'
                    );
                    const embededLinks = new Discord.MessageEmbed()
                        .setColor('#2ECC71')
                        .setTitle(`Top result of ${args[0]}`)
                        .addFields({
                            name: `${topWidget.type} ${topWidget.enclosedBy.name}`,
                            value: `https://api.flutter.dev/flutter/${topWidget.href}`
                        });
                    chaMsg.send(embededLinks);
                    return;
                } catch (err) {
                    message.channel.send(new Discord.MessageEmbed()
                        .setColor('#ff0000')
                        .setTitle('Not Found')
                        .setDescription(`Sorry, we couldn't able to fetch detailes about **${args[0]}**.`));
                }
            }
            get_data(apiUrl);
            return;
        }
    }
};