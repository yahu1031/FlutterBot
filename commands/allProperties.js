// ! Import required modules/packages.
const fetch = require('node-fetch');
const Discord = require('discord.js');
// ! API url
const flutterApi = process.env.FLUTTERAPI;

module.exports = {
    name: 'allprop',
    args: true,
    description: 'On help command, the bot will send message that asking the user to wait for 10 minutes.',
    execute(message, args) {
        // Todo - Getting Data from API.
        const notFoundMsg = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setTitle('Not Found')
            .setDescription(`Sorry, we couldn't able to fetch detailes about **${args[0]}**.`);
        const widget = args[0].toLowerCase();
        if (args.length) {
            // Todo - Getting Data from API.
            const get_data = async () => {
                try {
                    const data = await fetch(flutterApi).then(response => response.json());
                    const result = [];
                    const prop = data.filter(d => d.type != 'class' && d.type != 'constructor' && d.qualifiedName.toLowerCase().includes(`.${widget}.`));
                    const [hrefs, types, names] = ['href', 'type', 'name'].map(p => prop.map(td => td[p]));
                    for (let i = 0; i < prop.length; i++) {
                        const embededLinks = {
                            name: `${names[i]} - ${types[i]}`,
                            value: `https://api.flutter.dev/flutter/${hrefs[i]}`,
                        };
                        result.push(embededLinks);
                    }
                    const response = new Discord.MessageEmbed()
                        .setColor('#2ECC71')
                        .setTitle(`All properties of ${widget}`)
                        .addFields(result);
                    if (result.length === 0) return message.channel.send(notFoundMsg);
                    message.channel.send(response);
                    return;
                }
                catch (error) {
                    message.channel.send(`Sorry there might be an issue. <@${process.env.MAINTAINER}> will look into it. Mean while please try Googling it.`);
                    return console.log(error.message);
                }
            };
            get_data(flutterApi);
            return;
        }
        else {
            return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
        }
    },
};