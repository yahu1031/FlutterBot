const Discord = require('discord.js');
const flutterfire = process.env.FLUTTERFIRE;
const docs = ['analytics', 'auth', 'firestore', 'functions', 'messaging', 'storage', 'crashlytics', 'database', 'remote-config', 'performance'];

module.exports = {
    name: 'flutterfire',
    description: 'This command will give you the docs link about flutter firebase.',
    args: true,
    execute(client, message, args) {
        const arg = args[0].toLowerCase();
        const flutterfireEmbed = new Discord.MessageEmbed()
            .setAuthor('Flutterfire Docs')
            .setThumbnail('https://firebase.flutter.dev/img/flutterfire_300x.png')
            .setDescription('The official Firebase plugins for Flutter which really helps you and makes your learning easy.')
            .addField(`${args[0].charAt(0).toUpperCase() + args[0].slice(1)}  Docs`, `${flutterfire + args[0]}/overview`);
        if (docs.includes(arg)) {
            return message.channel.send(flutterfireEmbed);
        }
        else if (arg === 'core') {
            return message.channel.send(new Discord.MessageEmbed()
                .setAuthor('Flutterfire Docs')
                .setThumbnail('https://firebase.flutter.dev/img/flutterfire_300x.png')
                .setDescription('The Flutterfire docs which really helps you and makes your learning easy.')
                .addField('Core Docs', `${flutterfire}core/usage`));
        }
        else if(arg === 'docs') {
            return message.channel.send(new Discord.MessageEmbed()
                .setAuthor('Flutterfire Docs')
                .setThumbnail('https://firebase.flutter.dev/img/flutterfire_300x.png')
                .setDescription('The Flutterfire docs which really helps you and makes your learning easy.')
                .addField('FlutterFire Docs', `${flutterfire}overview`));
        }
    },
};

