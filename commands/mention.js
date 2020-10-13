const Discord = require('discord.js')
const flutterIcon = 'https://flutter.dev/images/flutter-mono-81x100.png';
const taggedBotReply = new Discord.MessageEmbed()
    .setColor('#2ECC71')
    .setTitle('ℹ️ Help')
    .setDescription('⚠️ These commands can\'t be within a message, and there can\'t be multiple per messages')
    .addFields({
        name: 'Mention me for this help.',
        value: 'Tagging me will show up you this message.'
    }, {
        name: 'top! Widget/Object',
        value: 'This command will show the top Package/Object you are searching for.'
    }, {
        name: 'all! Widget/Object',
        value: 'This command will show you the all Packages/Objects related to your search.'
    }, {
        name: 'prop! Widget/Object.property',
        value: 'This command will show the property of a Package/Object you are searching for.'
    }, {
        name: 'allprop! Widget/Object',
        value: 'This command will show all the properties of a Package/Object you are searching for.'
    }, {
        name: 'pub! Package',
        value: 'This command will show top 10 Packages result you are searching for.'
    }, )
    .setFooter('Source Code: https://github.com/yahu1031/').setTimestamp().setAuthor('Flutter Bot', flutterIcon, 'https://github.com/yahu1031/');


module.exports = {
    name: "mention",
    description: 'On help command, the bot will send message that asking the user to wait for 10 minutes.',
    execute(message) {
        if (message.author.bot) return;
        // Watching the user message content whether bot is tagged or not.
        message.channel.send(taggedBotReply);
    }
}