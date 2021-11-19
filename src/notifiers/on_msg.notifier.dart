import 'dart:async';

import '../commands/commands.dart';
import './../services/logs.dart';
import './../utils/constants.util.dart';
import 'package:nyxx/nyxx.dart';
import 'package:nyxx_lavalink/lavalink.dart';
import 'package:riverpod/riverpod.dart';

class MessageNotifier {
  /// Listening to every message in the guild.
  static Future<StreamSubscription<MessageReceivedEvent>> onMsgEvent(Nyxx? client, ProviderContainer container,
      {Cluster? cluster}) async {
    try {
      /// Check if [client] is null.
      if (client == null) throw NullThrownError();

      /// Listening on message recived.
      return client.onMessageReceived.listen((MessageReceivedEvent event) async {
        /// This makes your bot ignore other bots and itself
        /// and not get into a spam loop (we call that "botception").
        if (event.message.author.bot) return;

        /// Check if the message is a command.
        if (event.message.content.startsWith('!')) {
          /// Splitting the command to get the command name and the arguments.
          List<String>? commandList = event.message.content.split(' ');

          /// Getting the command name.
          String? command = commandList[0].substring(1);

          /// Getting the arguments.
          List<String>? arguments = commandList.sublist(1);

          /// Getting the command name.

          /// Check if the message is GuildMessage, if not, return null.
          /// else return the member.
          Member? member = event.message is GuildMessage ? (event.message as GuildMessage).member : null;

          /// Get the user permissions.
          Permissions? permissions = await member?.effectivePermissions;
          if (arguments.isEmpty) {
            await event.message.channel.sendMessage(
              MessageContent.custom(
                'Missing widget name.\nTry `!allpub widget_name`.',
              ),
            );
            return;
          }
          switch (command.toLowerCase()) {
            case 'widget':
              print(arguments);
              print(permissions!.administrator);
              Map<dynamic, dynamic>? wtf = await Flutter.getWidget(arguments, container);
              await event.message.channel.sendMessage(
                MessageContent.custom(
                  BotConstants.flutterBaseUrl + wtf!['href'].toString(),
                ),
              );
              break;
            case 'prop':
              Map<dynamic, dynamic>? wtf = await Flutter.getWidgetProperty(arguments, container);
              await event.message.channel.sendMessage(
                MessageContent.custom(
                  BotConstants.flutterBaseUrl + wtf!['href'].toString(),
                ),
              );
              break;
            case 'allprop':
              List<dynamic>? allProperties = await Flutter.getAllWidgetProperties(arguments, container);

              for (Map<String, dynamic> links in allProperties) {
                // await event.message.channel.sendMessage(MessageContent.custom(
                //   // BotConstants.baseUrl + links.toString(),
                //   links['href'].toString(),
                // ));
                print(BotConstants.flutterBaseUrl + links['href']);
              }
              break;
            case 'allwidgets':
              List<dynamic>? allWidgets = await Flutter.getSimilarWidgets(arguments, container);
              for (Map<String, dynamic> links in allWidgets) {
                // await event.message.channel.sendMessage(MessageContent.custom(
                //   // BotConstants.baseUrl + links.toString(),
                //   links['href'].toString(),
                // ));
                print(BotConstants.flutterBaseUrl + links['href']);
              }
              break;
            case 'pub':
              Map<dynamic, dynamic>? packageData = await Flutter.getPubPackage(arguments[0].toLowerCase(), container);
              if (packageData!['name'].toString() == 'null') {
                await event.message.channel.sendMessage(
                  MessageContent.custom(
                    'No package found.',
                  ),
                );
                return;
              }
              await event.message.channel.sendMessage(
                MessageContent.custom(
                  BotConstants.pubBaseUrl + packageData['name'].toString(),
                ),
              );
              break;
            case 'allpub':
              List<Map<String, dynamic>>? allPub =
                  await Flutter.getAllPubPackages(arguments[0].toLowerCase(), container);
              for (Map<String, dynamic> links in allPub) {
                // await event.message.channel.sendMessage(MessageContent.custom(
                //   // BotConstants.baseUrl + links.toString(),
                //   links['href'].toString(),
                // ));
                print(BotConstants.pubBaseUrl + links['package']!);
              }
              break;
            case 'pubdocs':
              // List<Map<String, dynamic>>? packageData =
              //     await Flutter.getPubPackageDocs(arguments[0].split('.')[0].toLowerCase(), container);
              // if (arguments[0].split('.').length > 1) {
              //   if (packageData != null) {
              //     for (Map<String, dynamic> links in packageData) {
              //       if (links['name'].toString() == arguments[0].split('.')[1] &&
              //           links['qualifiedName'].toString().toLowerCase().contains(arguments[0].toLowerCase())) {
              await event.message.channel.sendMessage(
                MessageContent.custom(
                  BotConstants.pubDocsBaseUrl(arguments[0]),
                ),
              );
              break;
            //       }
            //     }
            //   }
            // }
            // break;
            default:
          }
        }
      });
    } catch (e) {
      BotLogger.logln(LogType.error, e.toString());
      throw Exception(e.toString());
    }
  }
}
