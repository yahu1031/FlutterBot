module.exports = {
    name: 'ask',
    args: true,
    description: 'On ask command, the bot will send message that asking the user to ask the question instead of empty help.',
    execute(client, message, args) {
        if (args.length != 0) {
            // Checking the first argument is not a Not-A-Number.
            if (!isNaN(args[0])) {
                // Checking the length of first argument is 18.
                if (args[0].length === 18) {
                    // Delete the user's message and send the bot's message.
                    // ^ Uncomment this code if you give this bot a moderator/message manageable role
                    // message.delete();
                    return message.channel.send(`<@${args[0]}>, Don't ask to ask. Just ask your question and provide details, code, images, output and any error logs.`);
                }
            }
        }
    },
};