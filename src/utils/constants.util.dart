import 'package:nyxx/nyxx.dart';
import 'package:nyxx_interactions/interactions.dart';

/// Bot general constants
class BotConstants {
  /// Enviroment variables file name
  static const String envFile = '.bot.env';

  /// Reg for finding role in user nickname
  static final RegExp _regExp = RegExp(r'\[\S*\] ');

  /// Base URL for flutter docs
  static String flutterBaseUrl = 'https://api.flutter.dev/flutter/';

  /// Base URL for pub packages
  static String pubBaseUrl = 'https://pub.dev/packages/';

  /// Base URL for pub docs
  static String pubDocsBaseUrl(String packageName) => 'https://pub.dev/documentation/$packageName/latest/';

  static String pubPoster =
      'https://pub.dev/static/img/pub-dev-icon-cover-image.png?hash=vg86r2r3mbs62hiv4ldop0ife5um2g5g';

  /// Remove that role from user nickname
  static String? removeStuff(String input) => input.replaceAll(_regExp, '');

  /// Bot music buttons
  static List<IComponentBuilder> musicComponents = <IComponentBuilder>[
    ButtonBuilder('⏮️', 'seek', ComponentStyle.secondary),
    ButtonBuilder('▶️', 'resume', ComponentStyle.secondary),
    ButtonBuilder('⏸️', 'pause', ComponentStyle.secondary),
    ButtonBuilder('⏭️', 'skip', ComponentStyle.secondary),
  ];
}

/// Bot Message content constants
class MessageContent {
  /// Private function returns message content builder.
  static MessageBuilder _messgaeContent(String message) {
    return MessageBuilder.content(message);
  }

  /// User need to be admin.
  static MessageBuilder get needToBeAdmin => _messgaeContent('You need to be an admin to use this command');

  /// Don't DM commands please.
  static MessageBuilder get noDMs => _messgaeContent('Sorry you can\'t use this command in DMs.');

  /// Don't use element ID in commands please.
  static MessageBuilder get noIdPlease => _messgaeContent('Sorry, I don\'t support ID.');

  /// Exception message.
  static MessageBuilder exception(Object? e) => _messgaeContent('Something went wrong. \nException : ${e.toString()}');

  /// Renaming done.
  static MessageBuilder renameDone() => _messgaeContent('Renamed all the nick names.');

  /// Waiting message for long interactions.
  static MessageBuilder get waiting => _messgaeContent('waiting...');

  /// Custom message.
  static MessageBuilder custom(String message) => _messgaeContent(message);
}
