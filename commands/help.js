require('dotenv').config();
module.exports = {
    name: 'help',
    description: 'On help command, the bot will send message that asking the user to wait for 10 minutes.',
    execute(message, args) {
        const waitingMsg = `Hey ${message.author}, Please wait for 10 minutes. Someone will get back to you.\nMean while please search you query in the Google.`
        if (message.channel.parentID === process.env.FREE_TO_HELP) {
            if (!args.length) {
                return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
            } else {
                message.author
                message.channel.setParent(process.env.NEEDED_HELP)
                let member = message.guild.member(message.author)
                let waitingRole = message.guild.roles.cache.find(role => role.name === 'waiting');
                let helpRole = message.guild.roles.cache.find(role => role.name === 'help');
                if (!waitingRole) return message.reply('Please wait for a while and try asking again');
                member.roles.add(waitingRole.id)
                message.channel.send(waitingMsg);
                return
            }
        } else return message.reply('Please do check where you are asking. Go to Rules section and know how to ask help.');
    }
};