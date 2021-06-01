const Discord = require('discord.js');

const licenseimg = 'https://cdn.discordapp.com/attachments/756903745241088011/795996485179015198/file_type_license_1_1.png';
const sdkimg = 'https://cdn.discordapp.com/attachments/756903745241088011/796080023227334666/th-removebg-preview.png';
const pluginimg = 'https://cdn.discordapp.com/attachments/756903745241088011/796082433496973322/Group_40.png';
const adbImg = 'https://cdn.discordapp.com/attachments/756903745241088011/821089644699320330/Android_operating_system-Robot-Logo.wine_1.png';
const studioImg = 'https://cdn.discordapp.com/attachments/756903745241088011/849151619941531648/Group_51.png';

module.exports = {
    name: 'error',
    description: 'This will give you information about error you will find during installation.',
    args: true,
    execute(_client, message, args) {
        if (args[0] === 'help') {
            return message.channel.send('**__Usage of adb command__** \n \n Use this command for adb download link for windows. \n > **__Eg__:** `!adb install`\n \nPlease do read the note of this command\'s result');
        }
        else if (args[0] === 'license') {
            return message.reply(new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setAuthor('Android license error')
                .setThumbnail(licenseimg)
                .addFields({
                    name: '\n__Solution__\n',
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
                    name: '\n__Solution__\n',
                    value: 'If your Android studios was installed already, then\n' +
                        '\n1. Open Android studios and go to settings.\n' +
                        '\n2. In **Appearance & Behaviour > System Settings > Android SDK** choose one SDK platform(API 30/29 are recommended).\n' +
                        '\n3. In the next tab **SDK Tools**, Check the box of *Android SDK Build-Tools, Android SDK Command-Line Tools, Android SDK Platform-Tools*.',
                }).setTimestamp());
        }
        else if (args[0] === 'plugin') {
            return message.reply(new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setAuthor('Plugins not Installed')
                .setThumbnail(pluginimg)
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
        else if (args[0] === 'adb') {
            return message.reply(new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setAuthor('ADB not found')
                .setThumbnail(adbImg)
                .setDescription('**Android Debug Bridge**(adb) is a versatile command-line tool that lets you communicate with a device. This is recommended version to download.')
                .addFields(
                    {
                        name: 'ADB files exist but issue?',
                        value: 'In this case, you just copy paste `paltform-tools`(found in Android SDK) path in your env path.',
                    }).setTimestamp());
        }
        else if (args[0] === 'studio-path') {
            return message.reply(new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setAuthor('Android studio not found')
                .setThumbnail(studioImg)
                .setDescription('Shows **Android studio  not found**, If you have already installed it please use the following command to fix it up. Else please download Android Studio.')
                .addFields(
                    {
                        name: 'Command to fix the issue(Android studio)',
                        value: '`flutter config --android-studio-dir="YOUR_STUDIO_DIR_PATH"`.',
                    }).setFooter('NOTE : Make sure the path you choose must have `jre` folder in it.').setTimestamp());
        }
        else if (args[0] === 'sdk-path') {
            return message.reply(new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setAuthor('SDK path not found')
                .setThumbnail(studioImg)
                .setDescription('Shows **SDK was not found**, If you have already installed it please use the following command to fix it up. Else please download Android Studio.')
                .addFields(
                    {
                        name: 'Command to fix the issue',
                        value: '`flutter config --android-sdk="YOUR_SDK_DIR_PATH"`.',
                    }).setTimestamp());
        }
    },
};