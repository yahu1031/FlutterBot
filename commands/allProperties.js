const Discord = require('discord.js');

module.exports = {
    name: 'allprop',
    args: true,
    description: 'This command will show all the properties of a Package/Object you are searching for.',
    execute(client, message, args) {
        let widget = args[0].toLowerCase();
        const result = [];
        const flex = ['column', 'row', 'expanded', 'flexible', 'spacer'];
        if (args[0] === 'help') {
            return message.channel.send('**__Usage of allprop command__** \n \n Use this command to know all propeties of a widget. \n > `!allprop <widget>` \n \n **__Eg__:** `!allprop hero`');
        }
        else {
            try {
                if (flex.includes(widget)) {
                    widget = 'flex';
                }
            const allProp = client.flutterData.filter(d => d.type == 'property' && d.qualifiedName.toLowerCase().includes(`widgets.${widget}.`));
            const [hrefs, types, names] = ['href', 'type', 'name'].map(p => allProp.map(td => td[p]));
            for (let i = 0; i < allProp.length; i++) {
                const embededLinks = {
                    name: `${names[i]} - ${types[i]}`,
                    value: client.docsLink + hrefs[i],
                };
                result.push(embededLinks);
            }
            const response = new Discord.MessageEmbed()
                .setColor('#46d1fd')
                .setThumbnail('https://cdn.discordapp.com/attachments/756903745241088011/775823132375515156/flutter.webp')
                .setTitle(`All properties of ${widget}`)
                .addFields(result);
            return message.channel.send(result.length != 0 ? response : client.notFoundMsg);
        }
        catch (err) {
                return (typeof allProp !== undefined) ?
                 message.channel.send(client.notFoundMsg) : console.log('❌️ ' + err.message);
            }
        }
    },
};