const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'pub',
    args: true,
    description: 'This command will give you the top search of the packages if given command matches with the package.',
    execute(client, message, args) {
        const widget = args[0].toLowerCase();
        const pubAPIurl = client.pubApi + widget;
        // Todo - Getting Data from API.
        const get_data = async () => {
            try {
                const pubData = await fetch(pubAPIurl).then(response => response.json());
                const packageName = pubData.packages[0].package;
                if (pubData.packages.length === 0) return message.channel.send(client.notFoundMsg);
                if (widget === packageName.toLowerCase()) {
                    return message.channel.send(new Discord.MessageEmbed()
                        .setColor('#2ECC71')
                        .setTitle(`Pub packages for search ${args[0]}`)
                        .addFields({
                            name: packageName,
                            value: `https://pub.dev/packages/${packageName}`,
                        }));
                }
                else {
                    return message.channel.send(client.notFoundMsg);
                }
            }
            catch (err) {
                return console.log('❌️ ' + err.message);
            }
        };
        get_data(pubAPIurl);
        return;
    },
};