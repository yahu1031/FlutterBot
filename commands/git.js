const Discord = require('discord.js');
const fetch = require('node-fetch');

const gitAPIlink = 'https://api.github.com/repos/git-for-windows/git/releases/latest';
const description = 'Git is a free and open source distributed version control system designed to handle everything from small to very large projects with speed and efficiency.';
const color = '#f54d27';

module.exports = {
    name: 'git',
    description: 'This will give you information about git installtion.',
    args: true,
    async execute(client, message, args) {
        let downloadLink, avatarUrl;
        const data = await fetch(gitAPIlink).then((response) => response.json());
        for (let i = 0; i < data.assets.length; i++) {
            if (
                data.assets[i].browser_download_url.endsWith('.exe') &&
                data.assets[i].browser_download_url.toLowerCase().includes('/git-') &&
                !data.assets[i].browser_download_url.toLowerCase().includes('-busybox-') &&
                !data.assets[i].browser_download_url.toLowerCase().includes('pdbs') &&
                data.assets[i].browser_download_url.includes('64-bit')
            ) {
                downloadLink = data.assets[i].browser_download_url;
                avatarUrl = data.assets[i].uploader.avatar_url;
            }
        }
        switch (args[0]) {
            case 'help':
                return message.channel.send('**__Usage of git command__** \n \n Use this command for git download links for your prefered OS. \n > `!git <your OS>` \n \n **__Eg__:** `!git win`\n \navaliable OS are win, mac, linux');
            case 'win':
                return message.reply(new Discord.MessageEmbed()
                    .setColor(color)
                    .setAuthor('Download Git installer')
                    .setThumbnail(avatarUrl)
                    .setDescription(description)
                    .addFields({
                        name: 'Git Installer',
                        value: `[**Download for windows**](${downloadLink} "Download Git now")\n `,
                    }).setTimestamp());
            case 'mac':
                return message.reply(new Discord.MessageEmbed()
                    .setColor(color)
                    .setAuthor('Git Installation in MacOS')
                    .setThumbnail(avatarUrl)
                    .setDescription(description)
                    .addFields({
                        name: '**Install Git in MacOS**',
                        value: '`brew install git`',
                    }).setTimestamp());
            case 'linux':
                return message.reply(new Discord.MessageEmbed()
                    .setColor(color)
                    .setAuthor('Git Installation in Linux')
                    .setThumbnail(avatarUrl)
                    .setDescription(description)
                    .addFields({
                        name: 'Debian/Ubuntu',
                        value: 'For the latest stable version for your release of Debian/Ubuntu\n' +
                            '`apt-get install git`\nFor Ubuntu, this PPA provides the latest stable upstream Git version\n' +
                            '`add-apt-repository ppa:git-core/ppa`\n`apt update && apt install git`',
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