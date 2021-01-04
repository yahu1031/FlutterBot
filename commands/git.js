const Discord = require('discord.js');
const fetch = require('node-fetch');

const macgitlink = 'https://sourceforge.net/rest/p/git-osx-installer/activity?limit=1';
const wingitlink = 'https://sourceforge.net/rest/mirror/git-for-windows/activity?limit=1';

module.exports = {
    name: 'git',
    description: 'This will give you information about git installtion.',
    args: true,
    execute(client, message, args) {
        if (args[0] === 'help') {
            return message.channel.send('**__Usage of git command__** \n \n Use this command for git download links for your prefered OS. \n > `!git <your OS>` \n \n **__Eg__:** `!git windows`\n \navaliable OS are windows, mac, linux');
        }
        if (args[0] === 'windows') {
            const get_data = async () => {
                const data = await fetch(wingitlink).then(response => response.json());
                const downloadLink = data.timeline[0].obj.activity_url;
                console.log(downloadLink);
                return message.reply(new Discord.MessageEmbed()
                    .setColor('#f54d27')
                    .setAuthor('Download Git installer')
                    .setThumbnail('https://git-scm.com/images/logo@2x.png')
                    .setDescription('Git is a free and open source distributed version control system designed to handle everything from small to very large projects with speed and efficiency.')
                    .addFields({
                        name: 'Git Installer',
                        value: `[**Download for windows**](${downloadLink} "Download Git now")\n `,
                    }).setTimestamp());
            };
            get_data(wingitlink);
        }
        else if (args[0] === 'mac') {
            const get_data = async () => {
                const data = await fetch(macgitlink).then(response => response.json());
                const downloadLink = data.timeline[0].obj.activity_url;
                console.log(downloadLink);
                return message.reply(new Discord.MessageEmbed()
                    .setColor('#f54d27')
                    .setAuthor('Download Git installer')
                    .setThumbnail('https://git-scm.com/images/logo@2x.png')
                    .setDescription('Git is a free and open source distributed version control system designed to handle everything from small to very large projects with speed and efficiency.')
                    .addFields({
                        name: 'Git Installer',
                        value: `[**Download for Mac**](${downloadLink} "Download Git now")\n `,
                    }).setTimestamp());
            };
            get_data(macgitlink);
        }
        else if (args[0] === 'linux') {
            return message.reply(new Discord.MessageEmbed()
                .setColor('#f54d27')
                .setAuthor('Download Git installer')
                .setThumbnail('https://git-scm.com/images/logo@2x.png')
                .setDescription('Git is a free and open source distributed version control system designed to handle everything from small to very large projects with speed and efficiency.').addFields({
                    name: 'Debian/Ubuntu',
                    value: 'For the latest stable version for your release of Debian/Ubuntu\n' +
                        '`apt-get install git`' +
                        'For Ubuntu, this PPA provides the latest stable upstream Git version' +
                        '`add-apt-repository ppa:git-core/ppa`\n `apt update && apt install git`',
                    },
                    {
                        name: 'Fedora',
                        value: '`yum install git` (up to Fedora 21)\n`dnf install git` (Fedora 22 and later)',
                    },
                    {
                        name: 'Gentoo',
                        value: '`emerge --ask --verbose dev-vcs/git`',
                    },
                    {
                        name: 'Arch Linux',
                        value: '`pacman -S git`',
                    },
                    {
                        name: 'openSUSE',
                        value: '`zypper install git`',
                    },
                    {
                        name: 'Mageia',
                        value: '`urpmi git`',
                    },
                    {
                        name: 'Nix/NixOS',
                        value: '`nix-env -i git`',
                    },
                    {
                        name: 'FreeBSD',
                        value: '`pkg install git`',
                    },
                    {
                        name: 'Solaris 9/10/11 (OpenCSW)',
                        value: '`pkgutil -i git`',
                    },
                    {
                        name: 'Solaris 11 Express',
                        value: '`pkg install developer/versioning/git`',
                    },
                    {
                        name: 'OpenBSD',
                        value: '`pkg_add git`',
                    },
                    {
                        name: 'Alpine',
                        value: '`apk add git`',
                    },
                    {
                        name: 'Slitaz',
                        value: '`tazpkg get-install git`',
                    }).setTimestamp());
        }
    },
};