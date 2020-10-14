//! Import required modules/packages.
const fetch = require('node-fetch');
const Discord = require('discord.js');

//! API url
const apiUrl = 'https://api.flutter.dev/flutter/index.json'
module.exports = {
    name: 'allprop',
    description: 'This will help you with property you are searching for.',
    execute(message, args) {
        const notFoundMsg = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setTitle('Not Found')
            .setDescription(`Sorry, we couldn't able to fetch detailes about **${args[0]}**.`);
        let widget = args[0].toLowerCase();
        if (!args.length) {
            return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
        } else {
            message.author
            // Todo - Getting Data from API.
            const get_data = async apiUrl => {
                try {
                    const data = await fetch(apiUrl).then(response => response.json())
                    let result = []
                    console.log(widget)
                    const prop = data.filter(d => d.type != 'class' && d.type != 'constructor' && d.qualifiedName.toLowerCase().includes(`.${widget}.`));
                    const hrefs = prop.map(data => data.href);
                    const types = prop.map(data => data.type);
                    const names = prop.map(data => data.name);
                    for (let i = 0; i < prop.length; i++) {
                        const embededLinks = {
                            name: `${names[i]} - ${types[i]}`,
                            value: `https://api.flutter.dev/flutter/${hrefs[i]}`
                        }
                        result.push(embededLinks)
                    }
                    const response = new Discord.MessageEmbed()
                        .setColor('#2ECC71')
                        .setTitle(`All properties of ${widget}`)
                        .addFields(result);
                    if (result.length === 0) return message.channel.send(notFoundMsg);
                    message.channel.send(response);
                    return;
                } catch (error) {
                    return message.channel.send(notFoundMsg)
                }
            }
            get_data(apiUrl);
            return;
        }
    }
};