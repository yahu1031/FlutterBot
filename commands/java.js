const Discord = require('discord.js');

const jreLink = 'https://www.oracle.com/java/technologies/javase-jre8-downloads.html';
const jdkLink = 'https://www.oracle.com/in/java/technologies/javase/javase-jdk8-downloads.html';
const javaLogo = 'https://download.logo.wine/logo/Java_(programming_language)/Java_(programming_language)-Logo.wine.png';

module.exports = {
    name: 'java',
    description: 'This will check the message content length and checks if it is a code or not and tells the user to use temp bin sites to share code.',
    args: true,
    execute(client, message, args) {
        if (args[0].toLowerCase() === 'jre') {
            return message.reply(new Discord.MessageEmbed()
                .setColor('#f89615')
                .setAuthor('Download JRE file')
                .setThumbnail(javaLogo)
                .setDescription('This is the recommended JRE version you can install to work with flutter.')
                .addFields({
                    name: 'JRE 8u271',
                    value: `[**Download**](${jreLink} "Download JRE now")`,
                })
                .setFooter('You must need an oracle account to download it.')
                .setTimestamp());
        }
        if (args[0].toLowerCase() === 'jdk') {
            return message.reply(new Discord.MessageEmbed()
                .setColor('#f89615')
                .setAuthor('Download JDK file')
                .setThumbnail(javaLogo)
                .setDescription('This is the recommended JDK version you can install to work with flutter.')
                .addFields({
                    name: 'JDK 8u271',
                    value: `[**Download**](${jdkLink} "Download JDK now")`,
                })
                .setFooter('You must need an oracle account to download it.')
                .setTimestamp());
        }
        else if (args[0] === 'install') {
            return message.reply(new Discord.MessageEmbed()
                .setColor('#f89615')
                .setAuthor('Download Java files')
                .setThumbnail(javaLogo)
                .setDescription('These are the recommended java versions you can install to work with flutter.')
                .addFields({
                    name: 'JRE 8u271',
                    value: `[**Download from here**](${jreLink} "Download JRE now")\n `,
                }, {
                    name: 'JDK 8u271',
                    value: `[**Download from here**](${jdkLink} "Download JDK now")`,
                }).setFooter('You must need an oracle account to download these.')
                .setTimestamp());
        }
    },
};