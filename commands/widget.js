// ! Import required modules/packages.
const Discord = require('discord.js');

module.exports = {
    name: 'topwidget',
    args: true,
    description: 'This command will show the top Package/Object you are searching for.',
    execute(client, message, args) {
        if (args[0] === 'help') {
            message.channel.send('**__Usage of topwidget command__** \n \n Use this command to get docs of the widget you are searching for. \n > `!topwidget <widget>` \n \n **__Eg__:** `!topwidget hero`');
        }
        else {
            try {
                const topWidget = client.flutterData.find(
                    d => d.name.toLowerCase() === args[0].toLowerCase() && d.type === 'class',
                );
                const result = new Discord.MessageEmbed()
                    .setColor('#46D1FD')
                    .setThumbnail('https://cdn.discordapp.com/attachments/756903745241088011/775823132375515156/flutter.webp')
                    .setTitle(`Top result of ${topWidget.name}`)
                    .addFields({
                        name: topWidget.type + topWidget.enclosedBy.name,
                        value: client.docsLink + topWidget.href,
                    });
                return message.channel.send(result);
            }
            catch (err) {
                return (typeof topWidget !== undefined) ?
                    message.channel.send(client.notFoundMsg) : console.log('❌️ ' + err.message);
            }
        }
    },
};