const Discord = require('discord.js');

const flutterIcon = 'https://flutter.dev/images/flutter-mono-81x100.png';

const taggedBotReply = new Discord.MessageEmbed()
    .setThumbnail(flutterIcon)
    .setColor('#2ECC71')
    .setTitle('**__Help__**')
    .addFields({
        name: 'Flutter Commands',
        value: '!topwidget, !allwidgets, !prop, !allprop \n `!<flutter command> help` - for command usage',
    }, {
            name: 'Pub Commands',
            value: '!pub, !allpub \n `!<pub command> help` - for command usage',
    }, {
            name: 'Flutterfire Commands',
            value: '!flutterfire \n `!flutterfire list` - for documents/commands list',
    }).setTimestamp();

module.exports = {
    name: 'mention',
    description: 'On help command, the bot will send message that asking the user to wait for 10 minutes.',
    execute(message) {
        // Watching the user message content whether bot is tagged or not.
        message.channel.send(taggedBotReply);
    },
};