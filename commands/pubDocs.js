const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'pubdocs',
    args: true,
    description: 'This command will give you the API Docs of the package you have been searching for.',
    execute(client, message, args) {
        const package = args[0].toLowerCase();
        const pubDocsAPI = client.pubDocs + package + '/latest/index.json';
        const get_data = async () => {
            try {
                const pubData = await fetch(pubDocsAPI).then(response => response.json());
                if (pubData.length === 0) return message.channel.send(client.notFoundMsg);
                for (let i = 0; i < pubData.length; i++) {
                    const packageName = pubData[i].name;
                    const packageHref = pubData[i].href;
                    if (package === packageName) {
                        const link = client.pubDocs + packageName + '/latest/';
                        return message.channel.send(new Discord.MessageEmbed()
                            .setColor('#01579B')
                            .setThumbnail('https://cdn.discordapp.com/attachments/756903745241088011/775823137312210974/dart.png')
                            .setTitle(`Documentation for ${args[0]}.`)
                            .addFields({
                                name: packageName,
                                value: link + packageHref,
                            }));
                    }
                }
                console.log(pubData);
                return message.channel.send(client.noDocsFound);
            }
            catch (err) {
                console.log('❌️' + err.message);
                return message.channel.send(client.noDocsFound);
            }
        };
        if (package === 'help') {
            return message.channel.send('**__Usage of pubDocs command__** \n \n Use this command only if you know what package Docs you want to check on. \n > `!pubDocs <package you want>` \n \n **__Eg__:** `!pubDocs google_fonts`');
        }
        else {
            return get_data(pubDocsAPI);
        }
    },
};