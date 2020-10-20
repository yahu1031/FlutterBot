module.exports = {
    name: 'ask',
    description: 'On ask command, the bot will send message that asking the user to ask the question instead of empty help.',
    execute(message) {
        // Delete the user's message and send the bot's message.
        // message.delete();
        return message.channel.send(`${message.mentions.users.first()}, Stop asking for help without a question. Ask for help with your question included and tag helpers for a quicker reply.`);
    },
};