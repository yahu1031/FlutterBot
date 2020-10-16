//! Import required modules/packages.
const fetch = require('node-fetch');
const Discord = require('discord.js');

//! API url
const apiUrl = 'https://pub.dev/api/search?q='

module.exports = {
    name: 'pub',
    description: 'Ping!',
    execute(message, args) {
        const notFoundMsg = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setTitle('Not Found')
            .setDescription(`Sorry, we couldn't able to fetch detailes about **${args[0]}**.`);
        let widget = args[0].toLowerCase();
        pubAPIurl = apiUrl + widget;
        if (!args.length) {
            return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
        } else {
            message.author
            // Todo - Getting Data from API.
            const get_data = async pubAPIurl => {
                try {
                    const data = await fetch(pubAPIurl).then(response => response.json())
                    if (data.packages.length === 0) return message.channel.send(notFoundMsg);
                    let result = [];
                    for (let i = 0; i < data.packages.length; i++) {
                        const embededLinks = {
                            name: data.packages[i].package,
                            value: `https://pub.dev/packages/${data.packages[i].package}`
                        };
                        result.push(embededLinks);
                    }
                    const resultMsg = new Discord.MessageEmbed()
                        .setColor('#2ECC71')
                        .setTitle(`Pub packages for search ${args[0]}`)
                        .addFields(result)
                    if (result.length === 0) return message.channel.send(notFoundMsg);
                    message.channel.send(resultMsg);
                } catch (error) {
                    return message.channel.send(error.message);
                }
                return
            }
            get_data(pubAPIurl);
            return;
        }
    }
}