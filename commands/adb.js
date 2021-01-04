const Discord = require('discord.js');

const adblink = 'https://download2032.mediafire.com/stdvudx807sg/hvevxm4zmocjnhd/15_Second_ADB_Installer_v1.5.3.zip';
const androidimg = 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Android_robot_2014.svg/151px-Android_robot_2014.svg.png';

module.exports = {
    name: 'adb',
    description: 'This will give you information about ADB installations.',
    args: true,
    execute(client, message, args) {
        if (args[0] === 'download') {
            return message.reply(new Discord.MessageEmbed()
                .setColor('#78c259')
                .setAuthor('Download ADB installer')
                .setThumbnail(androidimg)
                .setDescription('**Android Debug Bridge**(adb) is a versatile command-line tool that lets you communicate with a device. This is recommended version to download.')
                .addFields({
                    name: 'ADB Installer',
                    value: `[**Download from here**](${adblink} "Download ADB now")\n `,
                }).setTimestamp());
        }
    },
};