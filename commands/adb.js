const Discord = require('discord.js');


const adbLink = 'https://dl.google.com/android/repository/platform-tools-latest-';
const androidimg = 'https://download.logo.wine/logo/Android_(operating_system)/Android_(operating_system)-Robot-Logo.wine.png';

module.exports = {
    name: 'adb',
    description: 'This will give you information about ADB installations.',
    args: true,
    execute(client, message, args) {
        let platform;
        switch (args[0]) {
            case 'help' || '' || null:
                return message.channel.send('**__Usage of adb command__** \n \n Use this command for adb download link for your prefered platform. \n > **__Eg__:** `!adb win`\n \nPlatforms to be passed with this command are `win`, `mac`, `linux`');
            case 'win':
                platform = 'windows';
                break;
            case 'mac':
                platform = 'darwin';
                break;
            case 'linux':
                platform = 'linux';
                break;
            default:
                return message.channel.send('Sorry, No such command found. try `!adb help`');
        }
        if (platform != 'undefined') {
            return message.reply(new Discord.MessageEmbed()
                .setColor('#78c259')
                .setAuthor('Download ADB Files')
                .setThumbnail(androidimg)
                .setDescription('**Android Debug Bridge**(adb) is a versatile command-line tool that lets you communicate with a device. This is recommended version to download.')
                .addFields({
                    name: 'ADB Files',
                    value: `[**Download from here**](${adbLink + platform + '.zip'} "Download ADB for ${platform}")\n `,
                }).setTimestamp().setFooter('NOTE: After downloading this, please extract the ZIP file and copy the folder to your root directory and add the folder to path.\n'));
        }
        return;
    },
};