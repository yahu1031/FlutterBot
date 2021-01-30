const Discord = require('discord.js');

const licenseimg = 'https://cdn.discordapp.com/attachments/756903745241088011/795996485179015198/file_type_license_1_1.png';
const sdkimg = 'https://cdn.discordapp.com/attachments/756903745241088011/796080023227334666/th-removebg-preview.png';
const pluginimg = 'https://cdn.discordapp.com/attachments/756903745241088011/796082433496973322/Group_40.png';

module.exports = {
    name: 'error',
    description: 'This will give you information about error you will find during installation.',
    args: true,
    execute(client, message, args) {
        if (args[0] === 'help') {
           return message.channel.send('**__Usage of adb command__** \n \n Use this command for adb download link for windows. \n > **__Eg__:** `!adb install`\n \nPlease do read the note of this command\'s result');
        }
        else if (args[0] === 'license') {
            return message.reply(new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setAuthor('Android license error')
                .setThumbnail(licenseimg)
                // .setDescription('**Android Debug Bridge**(adb) is a versatile command-line tool that lets you communicate with a device. This is recommended version to download.')
                .addFields({
                    name: '\n__Solution 1__\n',
                    value: '\nAfter installing Flutter in the system, run `flutter doctor --android-license` this command in terminal/cmd. ' +
                        'Now you will be asked to accept few conditions/policies. Enter `y` on every question. And now you are ready to go.',
                }).setTimestamp());
        }
        else if (args[0] === 'sdk') {
            return message.reply(new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setAuthor('Android SDK error')
                .setThumbnail(sdkimg)
                // .setDescription('**Android Debug Bridge**(adb) is a versatile command-line tool that lets you communicate with a device. This is recommended version to download.')
                .addFields({
                    name: '\n__Solution 1__\n',
                    value: '\nAfter installing Flutter in the system, run `flutter doctor --android-license` this command in terminal/cmd. ' +
                        'Now you will be asked to accept few conditions/policies. Enter `y` on every question. And now you are ready to go.',
                }).setTimestamp());
        }
        else if (args[0] === 'plugin') {
            return message.reply(new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setAuthor('Plugins not Installed')
                .setThumbnail(pluginimg)
                // .setDescription('**Android Debug Bridge**(adb) is a versatile command-line tool that lets you communicate with a device. This is recommended version to download.')
                .addFields({
                    name: 'Installed but issue?',
                    value: 'Currently we don\'t have any fix for this issue. Hope in future we will get a working solution for this. You can ignore it if you have already installed them.',
                },
                    {
                        name: 'Not Installed',
                        value: 'If you haven\'t installed them yet then follow the steps.\n\n' +
                            '**1.** Open settings(preferences)',
                    }).setTimestamp());
        }
    },
};