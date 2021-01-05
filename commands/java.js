const Discord = require('discord.js');

const jreLink = 'https://www.oracle.com/java/technologies/javase-jre8-downloads.html';
const jdkLink = 'https://www.oracle.com/in/java/technologies/javase/javase-jdk8-downloads.html';
const javaLogo = 'https://cdn.discordapp.com/attachments/756903745241088011/775823134929715220/java.png';

module.exports = {
    name: 'java',
    description: 'This will give you information about java installations.',
    args: true,
    execute(client, message, args) {
        if (args[0] === 'help') {
            return message.channel.send('**__Usage of java command__** \n \n Use this command for java8 download links. \n > `!java <argument>` \n \n **__Eg__:** `!java jre`\n\nFollowing arguments can be passed `jre`, `jdk`, `install`');
        }
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
                    name: 'JDK 8u271',
                    value: `[**Download from here**](${jdkLink} "Download JDK now")`,
                }, {
                    name: 'JRE 8u271',
                    value: `[**Download from here**](${jreLink} "Download JRE now")\n `,
                }).setFooter('You must need an oracle account to download these.')
                .setTimestamp());
        }
    },
};