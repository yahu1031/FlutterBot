module.exports = {
    name: 'code',
    description: 'This will check the message content length and checks if it is a code or not and tells the user to use temp bin sites to share code.',
    args: false,
    execute(client, message) {
        // Delete the user's message in 5mins, inform it by the bot's message.
        // message.delete({ timeout: 5 * 60 * 1000 });
        //  ! Check for ``` exists in the message
        if (message.content.includes('```')) {
            message.reply('Hey bud, We found some multiline code blocks in your message which is crossing more than 1300 chars.\n We would request you to kindly share your code in following bin sites.');
            return message.channel.send(client.binSites);
        }
        else {
            message.reply('We are finding more than 1300 charecters in your message. We always suggest you to make smaller messages with good content/information.');
            if (client.count(client.codeContent) > 3) return message.channel.send('And also we assume this as code. Better you can use these links to share code.', client.binSites);
            return;
        }
    },
};