// ! Import required modules/packages.
const Discord = require('discord.js');

module.exports = {
    name: 'prop',
    args: true,
    description: 'This will help you with property you are searching for.',
    execute(client, message, args) {
        const widget = args[0].toLowerCase().split('.')[0];
        const property = args[0].toLowerCase().split('.')[1];
        // Todo - Getting Data from API.
        try {
            if (args[0].includes('.')) {
                if (property != '') {
                    const prop = client.flutterData.find(
                        d => d.name.toLowerCase() === property && d.type === 'property' && d.qualifiedName.toLowerCase().includes(`.${widget}.${property}`),
                    );
                    const embededLinks = new Discord.MessageEmbed()
                        .setColor('#2ECC71')
                        .setTitle('Property result')
                        .addFields({
                            name: `${prop.enclosedBy.name}'s ${prop.name} property`,
                            value: client.docsLink + prop.href,
                        });
                    return message.channel.send(embededLinks);
                }
                else {
                    return message.channel.send(client.notFoundMsg);
                }
            }
            else {
                return message.channel.send('Tag me for help commands. Cause, I  think you don\'t know how to use property command.\n**FYKI : ** The command is `!prop Widget/Package.property`. Please make a note of it next time.');
            }
        }
        catch (err) {
            return (typeof prop !== undefined) ?
                message.channel.send(client.notFoundMsg) : console.log('❌️ ' + err.message);
        }
    },
};