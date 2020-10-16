//! Import required modules/packages.
const fetch = require('node-fetch');
const Discord = require('discord.js');

//! API url
const apiUrl = 'https://api.flutter.dev/flutter/index.json'

module.exports = {
    name: 'all',
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
                    let result = []
                    const data_wanted = data.filter(
                        d => d.name.toLowerCase().includes(args[0].toLowerCase()) && d.type === 'constructor'
                    );
                    const hrefs = data_wanted.map(data => data.href);
                    const types = data_wanted.map(data => data.type);
                    const names = data_wanted.map(data => data.name);
                    for (let i = 0; i < data_wanted.length; i++) {
                            const embededLinks = {
                                name: `${names[i]} - ${types[i]}`,
                                value: `https://api.flutter.dev/flutter/${hrefs[i]}`
                            }
                            result.push(embededLinks)
                        }
                    const response = new Discord.MessageEmbed()
                        .setColor('#2ECC71')
                        .setTitle(`All results for ${data_wanted[0].name} Widget/Object`)
                        .addFields(result)
                    chaMsg.send(response);
                    return
                } catch (error) {
                    chaMsg.send(new Discord.MessageEmbed()
                        .setColor('#ff0000')
                        .setTitle('Not Found')
                        .setDescription(`Sorry, we couldn't able to fetch detailes about **${args[0]}**.`));
                    return
                }
            }
            //& Calling the get_data method
            get_data(apiUrl);
            return;
        }
    }
}