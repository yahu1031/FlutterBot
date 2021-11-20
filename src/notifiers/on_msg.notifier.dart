import 'dart:async';
import 'package:nyxx_interactions/interactions.dart';

import '../commands/commands.dart';
import '../utils/colors.util.dart';
import './../services/logs.dart';
import './../utils/constants.util.dart';
import 'package:nyxx/nyxx.dart';
import 'package:nyxx_lavalink/lavalink.dart';
import 'package:riverpod/riverpod.dart';

class MessageNotifier {
  /// Listening to every message in the guild.
  static Future<StreamSubscription<MessageReceivedEvent>> onMsgEvent(Nyxx? client, ProviderContainer container,
      {Cluster? cluster}) async {
    Map<String, String> imageUrl = <String, String>{
      'flutter': 'https://cdn.discordapp.com/attachments/756903745241088011/911709547373154384/flutter.png',
      'dart': 'https://cdn.discordapp.com/attachments/756903745241088011/775823137312210974/dart.png',
    };
    List<String> flex = <String>['column', 'row', 'expanded', 'flexible', 'spacer'];
    EmbedAuthorBuilder author = EmbedAuthorBuilder()
      ..name = 'Author not provided'
      ..iconUrl = imageUrl['flutter'];
    EmbedBuilder embed = EmbedBuilder()
      ..addFooter((EmbedFooterBuilder footer) {
        footer.text = 'Source code : https://github.com/yahu1031/FlutterBot';
        footer.iconUrl = 'https://avatars.githubusercontent.com/u/35523357?v=4';
      })
      ..author = author
      ..timestamp = DateTime.now();
    ComponentMessageBuilder componentMessageBuilder = ComponentMessageBuilder();
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
          // Member? member = event.message is GuildMessage ? (event.message as GuildMessage).member : null;

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
              Map<dynamic, dynamic>? wtf = await Flutter.getWidget(arguments, container);
              embed.color = Colors.custom(0x46D1FD);
              embed.title = 'Top results of ${arguments[0]}';
              embed.fields.add(
                EmbedFieldBuilder(
                  wtf!['name'],
                  BotConstants.flutterBaseUrl + wtf['href'].toString(),
                  true,
                ),
              );
              embed.thumbnailUrl = imageUrl['flutter'];
              await event.message.channel.sendMessage(
                componentMessageBuilder..embeds = <EmbedBuilder>[embed],
              );
              break;
            case 'prop':
              String? widget = arguments[0].toString().split('.')[0].toLowerCase();
              if (flex.contains(widget)) {
                widget = 'flex';
              }
              String? property = arguments[0].toString().split('.')[1];
              Map<dynamic, dynamic>? wtf = await Flutter.getWidgetProperty(widget, property, container);
              embed.color = Colors.custom(0x46D1FD);
              embed.title = 'Top results of $property in ${arguments[0].toString().split('.')[0]}';
              embed.fields.add(
                EmbedFieldBuilder(
                  wtf!['name'],
                  BotConstants.flutterBaseUrl + wtf['href'].toString(),
                  true,
                ),
              );
              embed.thumbnailUrl = imageUrl['flutter'];
              await event.message.channel.sendMessage(
                componentMessageBuilder..embeds = <EmbedBuilder>[embed],
              );
              break;
            case 'allprop':
              String widget = arguments[0];
              if (flex.contains(arguments[0])) {
                widget = 'flex';
              }
              List<dynamic>? allProperties = await Flutter.getAllWidgetProperties(widget, container);
              embed.color = Colors.custom(0x46D1FD);
              embed.title = 'All properties of ${allProperties[0]['name']}';
              embed.url = BotConstants.flutterBaseUrl + allProperties[0]['href'].toString();
              embed.thumbnailUrl = imageUrl['flutter'];
              for (Map<String, dynamic> links in allProperties) {
                if (links['enclosedBy']['name'] != links['name']) {
                  embed.fields.add(
                    EmbedFieldBuilder(
                      links['name'],
                      BotConstants.flutterBaseUrl + links['href'].toString(),
                      false,
                    ),
                  );
                }
              }
              await event.message.channel.sendMessage(
                componentMessageBuilder..embeds = <EmbedBuilder>[embed],
              );

              break;
            case 'allwidgets':
              List<dynamic>? allWidgets = await Flutter.getSimilarWidgets(arguments, container);
              if (allWidgets.length > 10) {
                StringBuffer buffer = StringBuffer();
                for (Map<String, dynamic> links in allWidgets) {
                  buffer.write('${links['name']}\n');
                }
                if (buffer.length > 2000) {
                  buffer.clear();
                  embed.title = 'Too many results';
                  buffer.write('Please use `!allwidgets` with a more specific query.');
                  embed.description = buffer.toString();
                } else {
                  embed.description = buffer.toString();
                }
              } else {
                for (Map<String, dynamic> links in allWidgets) {
                  embed.fields.add(
                    EmbedFieldBuilder(
                      links['name'],
                      BotConstants.flutterBaseUrl + links['href'].toString(),
                      false,
                    ),
                  );
                  print(BotConstants.flutterBaseUrl + links['href']);
                }
              }
              await event.message.channel.sendMessage(
                componentMessageBuilder..embeds = <EmbedBuilder>[embed],
              );
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
              author.iconUrl = imageUrl['dart'];
              author.name = await Flutter.getAuthorName(packageData['name'], container);
              embed.color = Colors.custom(0x01579B);
              embed.title = packageData['name'] + ' - ' + packageData['latest']['version'];
              embed.description = packageData['latest']['pubspec']['description'];
              embed.url = BotConstants.pubBaseUrl + packageData['name'].toString();
              embed.thumbnailUrl = imageUrl['dart'];
              await event.message.channel.sendMessage(
                componentMessageBuilder..embeds = <EmbedBuilder>[embed],
              );
              break;
            case 'allpub':
              author.iconUrl = imageUrl['dart'];
              embed.thumbnailUrl = imageUrl['dart'];
              embed.color = Colors.custom(0x01579B);
              embed.title = 'Top 10 packages of ${arguments[0]}';
              List<Map<String, dynamic>>? allPub =
                  await Flutter.getAllPubPackages(arguments[0].toLowerCase(), container);
              author.name = 'Pub packages';
              for (Map<String, dynamic> links in allPub) {
                embed.fields.add(
                  EmbedFieldBuilder(
                    links['package'],
                    BotConstants.pubBaseUrl + links['package'].toString(),
                    false,
                  ),
                );
              }
              await event.message.channel.sendMessage(
                componentMessageBuilder..embeds = <EmbedBuilder>[embed],
              );
              break;
            case 'pubdocs':
              List<Map<String, dynamic>>? docs = await Flutter.getPubPackageDocs(arguments[0], container);
              Map<dynamic, dynamic>? packageData = await Flutter.getPubPackage(arguments[0].toLowerCase(), container);
              embed.title = 'Documentation of ${arguments[0]} - version ${packageData!['latest']['version']}';
              author.iconUrl = imageUrl['dart'];
              author.name = await Flutter.getAuthorName(packageData['name'], container);
              if (docs!.isEmpty) {
                embed.description = 'No documentation found.';
              } else {
                embed.description = packageData['latest']['pubspec']['description'];
                embed.url = BotConstants.pubDocsBaseUrl(arguments[0]);
                await event.message.channel.sendMessage(
                  componentMessageBuilder..embeds = <EmbedBuilder>[embed],
                );
              }
              break;
            default:
              await event.message.channel.sendMessage(
                MessageContent.custom('Wrong command'),
              );
              break;
          }
        }
      });
    } catch (e) {
      BotLogger.logln(LogType.error, e.toString());
      throw Exception(e.toString());
    }
  }
}
