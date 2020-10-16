//! Import required modules/packages.
const fetch = require('node-fetch');
const Discord = require('discord.js');

//! API url
const apiUrl = 'https://api.flutter.dev/flutter/index.json'
module.exports = {
    name: 'prop',
    description: 'This will help you with property you are searching for.',
    execute(message, args) {
        let widget = args[0].split('.')[0].toLowerCase();
        let property = args[0].split('.')[1].toLowerCase();
        let chaMsg = message.channel;
        const arg = args[0].charAt(0).toUpperCase() + args[0].slice(1)
        if (!args.length) {
            return chaMsg.send(`You didn't provide any arguments, ${message.author}!`);
        } else {
            message.author
            // Todo - Getting Data from API.
            const get_data = async apiUrl => {
                try {
                    const data = await fetch(apiUrl).then(response => response.json())
                    if (args[0].includes('.')) {
                        if (property != '') {
                            const prop = data.find(
                                d => d.name.toLowerCase() === property && d.type === 'property' && d.qualifiedName.toLowerCase().includes(`.${widget}.${property}`)
                            );
                            const embededLinks = new Discord.MessageEmbed()
                                .setColor('#2ECC71')
                                .setTitle('Result for your command')
                                .addFields({
                                    name: `${prop.enclosedBy.name}'s ${prop.name} property`,
                                    value: `https://api.flutter.dev/flutter/${prop.href}`
                                });
                            chaMsg.send(embededLinks);
                            return;
                        } else {
                            chaMsg.send(new Discord.MessageEmbed()
                                .setColor('#ff0000')
                                .setTitle('Wrong arguments')
                                .setDescription(`We hope you don't know how to use property command. Check for pinned messages for help or tag me for all commads help.\n**Command:** ***prop! widget.property***`));
                        }
                    } else {
                        message.channel.send('Tag me for help commands. Cause, I  think you don\'t know how to use property command.')
                    }
                } catch (error) {
                    message.channel.send(new Discord.MessageEmbed()
                        .setColor('#ff0000')
                        .setTitle('Not Found')
                        .setDescription(`Sorry, we couldn't able to fetch detailes about **${args[0]}**.`));
                    // message.channel.send(error.message);
                }
            }
            get_data(apiUrl);
        }
    }
};