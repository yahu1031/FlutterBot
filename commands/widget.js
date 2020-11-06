// ! Import required modules/packages.
const Discord = require('discord.js');

module.exports = {
    name: 'topwidget',
    args: true,
    description: 'This command will show the top Package/Object you are searching for.',
    execute(client, message, args) {
        // console.log(client.flutterData);
        // Todo - Getting Data from API.
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
                    .setTitle(`Top result of ${topWidget.name}`)
                    .addFields({
                        name: `${topWidget.type} ${topWidget.enclosedBy.name}`,
                        value: client.docsLink + topWidget.href,
                    });
                message.channel.send(result);
                return;
            }
            catch (err) {
                return (typeof topWidget !== undefined) ?
                    message.channel.send(client.notFoundMsg) : console.log('❌️ ' + err.message);
            }
        }
    },
};