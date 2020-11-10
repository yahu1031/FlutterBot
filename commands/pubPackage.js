const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'pub',
    args: true,
    description: 'This command will give you the top search of the packages if given command matches with the package.',
    execute(client, message, args) {
        const widget = args[0].toLowerCase();
        const pubAPIurl = client.pubApi + widget;
        const get_data = async () => {
            try {
                const pubData = await fetch(pubAPIurl).then(response => response.json());
                const packageName = pubData.packages[0].package;
                if (pubData.packages.length === 0) return message.channel.send(client.notFoundMsg);
                if (widget === packageName.toLowerCase()) {
                    return message.channel.send(new Discord.MessageEmbed()
                        .setColor('#01579B')
                        .setThumbnail('https://cdn.discordapp.com/attachments/756903745241088011/775823137312210974/dart.png')
                        .setTitle(`Pub packages for search ${args[0]}`)
                        .addFields({
                            name: packageName,
                            value: `https://pub.dev/packages/${packageName}`,
                        }));
                }
                else {
                    return message.channel.send(client.notFoundMsg);
                }
            }
            catch (err) {
                return console.log('❌️ ' + err.message);
            }
        };
        if (widget === 'help') {
            return message.channel.send('**__Usage of pub command__** \n \n Use this command only if you know what package it is. \n > `!pub <package you want>` \n \n **__Eg__:** `!pub google_fonts`');
        }
        else {
            get_data(pubAPIurl);
        }
        // return;
    },
};