const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'allpub',
    args: true,
    description: 'This command will show top 10 Packages result you are searching for.',
    execute(client, message, args) {
        const result = [];
        const widget = args[0].toLowerCase();
        const pubAPIurl = client.pubApi + widget;
        // Todo - Getting Data from API.
        const get_data = async () => {
            try {
                const pubData = await fetch(pubAPIurl).then(response => response.json());
                if (pubData.packages.length === 0) return message.channel.send(client.notFoundMsg);
                for (let i = 0; i < pubData.packages.length; i++) {
                    const packageName = pubData.packages[i].package;
                    const embededLinks = {
                        name: packageName,
                        value: `https://pub.dev/packages/${packageName}`,
                    };
                    result.push(embededLinks);
                }
                const resultMsg = new Discord.MessageEmbed()
                    .setColor('#2ECC71')
                    .setTitle(`Pub packages for search ${args[0]}`)
                    .addFields(result);
                return message.channel.send(resultMsg);
            }
            catch (err) {
                return console.log('❌️' + err.message);
            }
        };
        get_data(pubAPIurl);
        return;
    },
};