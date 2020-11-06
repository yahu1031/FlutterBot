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
            .setColor('#ffca28')
            .setAuthor('Flutterfire Docs')
            .setThumbnail('https://firebase.flutter.dev/img/flutterfire_300x.png')
            .setDescription('The official Firebase plugins for Flutter which really helps you and makes your learning easy.')
            .addField(`${args[0].charAt(0).toUpperCase() + args[0].slice(1)}  Docs`, `${flutterfire + args[0]}/overview`);
        if (arg === 'help') {
            message.channel.send('May be you are searching for `!flutter list`, Try that.');
         }
        else if (arg === 'list') {
            return message.channel.send(
                new Discord.MessageEmbed()
                    .setColor('#ffca28')
                    .setTitle('__Flutterfire Docs commands__')
                    .setThumbnail('https://firebase.flutter.dev/img/flutterfire_300x.png')
                    .setDescription('Here are the list of commands for **Flutterfire Docs**')
                    .addFields({
                        name: 'docs',
                        value: 'FlutterFire is a set of Flutter plugins which connect your Flutter application to Firebase.',
                    }, {
                        name: 'analytics',
                        value: 'Google Analytics is a free app measurement solution that provides insight on app usage and user engagement.',
                    }, {
                        name: 'auth',
                        value: 'Firebase Authentication provides backend services & easy-to-use SDKs to authenticate users to your app.',
                    }, {
                        name: 'firestore',
                        value: 'Firestore is a flexible, scalable NoSQL cloud database to store and sync data.',
                    }, {
                        name: 'functions',
                        value: 'Cloud Functions for Firebase let you automatically run backend code in response to events triggered by Firebase features and HTTPS requests.',
                    }, {
                        name: 'messaging',
                        value: 'Firebase Cloud Messaging (FCM) is a cross-platform messaging solution that lets you reliably send messages at no cost.',
                    }, {
                        name: 'storage',
                        value: 'Cloud Storage is designed to help you quickly and easily store and serve user-generated content, such as photos and videos.',
                    }, {
                        name: 'core',
                        value: 'The firebase_core plugin is responsible for connecting your Flutter app to your Firebase project.',
                    }, {
                        name: 'crashlytics',
                        value: 'Crashlytics helps you to collect analytics and details about crashes and errors that occur in your app.',
                    }, {
                        name: 'database',
                        value: 'The Firebase Realtime Database is a cloud-hosted database. Data is stored as JSON and synchronized in realtime to every connected client.',
                    }, {
                        name: 'remote-config',
                        value: 'Firebase Remote Config is a cloud service that lets you change the behavior and appearance of your app without requiring users to download an app update.',
                    }, {
                        name: 'performance',
                        value: 'Firebase Performance Monitoring is a service that helps you to gain insight into the performance characteristics of your iOS, Android, and web apps.',
                    }),
            );
        }
        else if (docs.includes(arg)) {
            return message.channel.send(flutterfireEmbed);
        }
        else if (arg === 'core') {
            return message.channel.send(new Discord.MessageEmbed()
                .setColor('#ffca28')
                .setAuthor('Flutterfire Docs')
                .setThumbnail('https://firebase.flutter.dev/img/flutterfire_300x.png')
                .setDescription('The firebase_core plugin is responsible for connecting your Flutter app to your Firebase project.')
                .addField('Core Docs', `${flutterfire}core/usage`, false));
        }
        else if (arg === 'docs') {
            return message.channel.send(new Discord.MessageEmbed()
                .setColor('#ffca28')
                .setAuthor('Flutterfire Docs')
                .setThumbnail('https://firebase.flutter.dev/img/flutterfire_300x.png')
                .setDescription('FlutterFire is a set of Flutter plugins which connect your Flutter application to Firebase.')
                .addField('FlutterFire Docs', `${flutterfire}overview`));
        }
        else {
            return message.channel.send('Check the name of the document you are searching for.');
        }
    },
};