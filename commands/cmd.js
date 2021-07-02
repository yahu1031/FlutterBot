const process = require('child_process');

module.exports = {
    name: 'cmd',
    description: 'This command will mute the user.',
    args: true,
    execute(client, message, args) {
        if (message.author.bot) return;
        process.exec(args.join(' '), async (error, stdout) => {
            const response = (error || stdout);
            await message.channel.send('please wait...').then(async m => {
                await m.delete({ timeout: 5000 });
                await message.channel.send(response,
                    { code: 'asciidoc', split: '\n' })
                    .catch(err => message.channel.send(`💔 Error: ${err.message}`));
            });
        });
        return;
    },
};
