const Discord = require('discord.js');

const flutterIcon = 'https://flutter.dev/images/flutter-mono-81x100.png';

const taggedBotReply = new Discord.MessageEmbed()
    .setAuthor('Flutter Bot', flutterIcon, 'https://github.com/yahu1031/FlutterBot.git')
    .setColor('#2ECC71')
    .setTitle('**__Help__**')
    .setDescription('These commands can\'t be within a message, and there can\'t be multiple per messages')
    .addFields({
        name: '**1)**    Mention me for this help.',
        value: 'Tagging me will show up you this message.',
    }, {
        name: '**2)**    !top Widget/Object',
        value: 'This command will show the top Package/Object you are searching for.',
    }, {
        name: '**3)**    !all Widget/Object',
        value: 'This command will show you the all Packages/Objects related to your search.',
    }, {
        name: '**4)**    !prop Widget/Object.property',
        value: 'This command will show the property of a Package/Object you are searching for.',
    }, {
        name: '**5)**    !allprop Widget/Object',
        value: 'This command will show all the properties of a Package/Object you are searching for.',
    }, {
        name: '**6)**    !pub Package',
        value: 'This command will give you the top search of the packages if given command matches with the package.',
    }, {
        name: '**7)**    !allpub Package',
        value: 'This command will show top 10 Packages result you are searching for.',
    }, {
        name: '***__Source Code__:***',
        value: 'https://github.com/yahu1031/FlutterBot.git',
    }).setTimestamp();


module.exports = {
    name: 'mention',
    description: 'On help command, the bot will send message that asking the user to wait for 10 minutes.',
    execute(message) {
        // Watching the user message content whether bot is tagged or not.
        message.channel.send(taggedBotReply);
    },
};