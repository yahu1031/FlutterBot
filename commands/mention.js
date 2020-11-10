const Discord = require('discord.js');

const taggedBotReply = new Discord.MessageEmbed()
    .setThumbnail('https://cdn.discordapp.com/attachments/756903745241088011/775823132375515156/flutter.webp')
    .setColor('#46D1FD')
    .setTitle('**__Help__**')
    .addFields({
        name: 'Flutter Commands',
        value: '!topwidget, !allwidgets, !prop, !allprop \n `!<flutter command> help` - for command usage.',
    }, {
        name: 'Pub Commands',
        value: '!pub, !allpub \n `!<pub command> help` - for command usage.',
    }, {
        name: 'Flutterfire Commands',
        value: '!flutterfire \n `!flutterfire list` - for documents/commands list.',
    }, {
        name: 'Pub Docs Commands',
        value: '!pubdocs \n `!pubdocs help` - for documentation of pub packages/plugins.',
    }).setTimestamp();

module.exports = {
    name: 'mention',
    description: 'On mentioning the bot will give you usage of commands embed message.',
    execute(message) {
        // Watching the user message content whether bot is tagged or not.
        return message.channel.send(taggedBotReply);
    },
};