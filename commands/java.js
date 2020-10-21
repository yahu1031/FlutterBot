const Discord = require('discord.js');

const jreLink = 'https://download.oracle.com/otn/java/jdk/8u271-b09/61ae65e088624f5aaa0b1d2d801acb16/jre-8u271-windows-x64.exe';
const jdkLink = 'https://download.oracle.com/otn/java/jdk/8u271-b09/61ae65e088624f5aaa0b1d2d801acb16/jdk-8u271-windows-x64.exe';
const javaLogo = 'https://download.logo.wine/logo/Java_(programming_language)/Java_(programming_language)-Logo.wine.png';

module.exports = {
    name: 'java',
    description: 'This will check the message content length and checks if it is a code or not and tells the user to use temp bin sites to share code.',
    args: true,
    execute(client, message, args) {
        if (args[0].toLowerCase() === 'jre') {
            // message.channel.send('Here is the link that you can download recommended JRE that supports **Flutter**. [Download Here](https://google.com)');
            return message.reply(new Discord.MessageEmbed()
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
                .setAuthor('Download JDK file')
                .setThumbnail(javaLogo)
                .setDescription('This is the recommended JDK version you can install to work with flutter.')
                .addFields({
                    name: 'JDK 8u271',
                    value: `[**Download**](${jdkLink} "Download JDK now")`,
                })
                .setTimestamp());
        }
        else if (args[0] === 'install') {
            return message.reply(new Discord.MessageEmbed()
                .setAuthor('Download Java files')
                .setThumbnail(javaLogo)
                .setDescription('These are the recommended java versions you can install to work with flutter.')
                .addFields({
                    name: 'JRE 8u271',
                    value: `[**Download from here**](${jdkLink} "Download JDK now")`,
                }, {
                    name: 'JDK 8u271',
                    value: `[**Download from here**](${jdkLink} "Download JDK now")`,
                })
                .setTimestamp());
        }
    },
};