// ! Import required modules/packages.
const Discord = require('discord.js');

module.exports = {
    name: 'top',
    args: true,
    description: 'This command will show the top Package/Object you are searching for.',
    execute(client, message, args) {
        // console.log(client.flutterData);
        // Todo - Getting Data from API.
        try {
            const topWidget = client.flutterData.find(
                d => d.name.toLowerCase() === args[0].toLowerCase() && d.type === 'class' && d.href.toLowerCase().startsWith('widgets/'),
            );
            const result = new Discord.MessageEmbed()
                .setColor('#2ECC71')
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
    },
};