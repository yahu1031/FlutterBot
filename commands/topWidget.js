// ! Import required modules/packages.
const fetch = require('node-fetch');
const Discord = require('discord.js');
// ! API url
const flutterApi = process.env.FLUTTERAPI;

module.exports = {
    name: 'top',
    args: true,
    description: 'On help command, the bot will send message that asking the user to wait for 10 minutes.',
    execute(message, args) {
        // Todo - Getting Data from API.
        const get_data = async () => {
            try {
                const data = await fetch(flutterApi).then(response => response.json());
                const topWidget = data.find(
                    d => d.name.toLowerCase().includes(args[0].toLowerCase()) && d.type === 'class',
                );
                const embededLinks = new Discord.MessageEmbed()
                    .setColor('#2ECC71')
                    .setTitle(`Top result of ${topWidget.name}`)
                    .addFields({
                        name: `${topWidget.type} ${topWidget.enclosedBy.name}`,
                        value: process.env.DOCSLINK + topWidget.href,
                    });
                message.channel.send(embededLinks);
                return;
            }
            catch (err) {
                message.channel.send(new Discord.MessageEmbed()
                    .setColor('#ff0000')
                    .setTitle('Not Found')
                    .setDescription(`Sorry, we couldn't able to fetch detailes about **${args[0]}**.`));
            }
        };
        get_data(flutterApi);
    },
};