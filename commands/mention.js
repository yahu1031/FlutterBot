const Discord = require('discord.js');

const taggedBotReply = new Discord.MessageEmbed()
    .setThumbnail('https://cdn.discordapp.com/attachments/756903745241088011/775823132375515156/flutter.webp')
    .setColor('#46D1FD')
    .setTitle('**__Flutter Help__**')
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

    const supportReply = new Discord.MessageEmbed()
    .setThumbnail('https://cdn.discordapp.com/attachments/756903745241088011/795775578086572113/Group_1.png')
    .setColor('#46D1FD')
    .setTitle('**__Other Help__**')
    .addFields({
        name: 'ADB Command',
        value: '!adb <Your OS> \n `!adb help` - for command usage.',
    }, {
        name: 'java Commands',
        value: '!java\n `!java help` - for command usage.',
    }, {
        name: 'Git Commands',
        value: '!git \n `!git help` - for command usage.',
    }).setTimestamp();

module.exports = {
    name: 'mention',
    description: 'On mentioning the bot will give you usage of commands embed message.',
    execute(message) {
        // Watching the user message content whether bot is tagged or not.
       if (message.content.includes('support'.toLowerCase())) {
            return message.channel.send(supportReply);
       }
            return message.channel.send(taggedBotReply);
    },
};