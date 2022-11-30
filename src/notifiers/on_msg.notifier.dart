import 'dart:async';

import 'package:nyxx/nyxx.dart';
import 'package:nyxx_interactions/nyxx_interactions.dart';
import 'package:riverpod/riverpod.dart';

import './../services/logs.dart';
import './../utils/constants.util.dart';
import '../commands/commands.dart';
import '../services/load_env.util.dart';
import '../utils/colors.util.dart';

class MessageNotifier {
  static List<List<dynamic>> chunks = <List<dynamic>>[];

  /// Listening to every message in the guild.
  static Future<StreamSubscription<IMessageReceivedEvent>> onMsgEvent(
    INyxxWebsocket? client,
    ProviderContainer container,
  ) async {
    Map<String, String> imageUrl = <String, String>{
      'flutter':
          'https://cdn.discordapp.com/attachments/756903745241088011/911709547373154384/flutter.png',
      'dart':
          'https://cdn.discordapp.com/attachments/756903745241088011/775823137312210974/dart.png',
    };
    List<String> flex = <String>[
      'column',
      'row',
      'expanded',
      'flexible',
      'spacer'
    ];
    try {
      /// Check if [client] is null.
      if (client == null) throw NullThrownError();

      /// Listening on message recived.
      return client.eventsWs.onMessageReceived
          .listen((IMessageReceivedEvent event) async {
        // if (event.message.guild == null) {

        // }
        EmbedAuthorBuilder author = EmbedAuthorBuilder()
          ..name = 'Author not provided'
          ..iconUrl = imageUrl['flutter'];
        EmbedBuilder embed = EmbedBuilder()
          ..addFooter((EmbedFooterBuilder footer) {
            footer.text =
                'Source code : https://github.com/yahu1031/FlutterBot';
            footer.iconUrl =
                'https://avatars.githubusercontent.com/u/35523357?v=4';
          })
          ..author = author
          ..timestamp = DateTime.now();
        ComponentMessageBuilder componentMessageBuilder =
            ComponentMessageBuilder();

        /// This makes your bot ignore other bots and itself
        /// and not get into a spam loop (we call that "botception").
        if (event.message.author.bot) return;

        /// Check if the message is a command.
        if (event.message.content
            .startsWith(container.read(atBotEnvProvider).prefix!)) {
          /// Splitting the command to get the command name and the arguments.
          List<String>? commandList = event.message.content.split(' ');

          /// Getting the command name.
          String? command = commandList[0].substring(2).trim();

          /// Getting the arguments.
          List<String>? arguments = commandList.sublist(1);

          /// Regex to find if the command has arguments with A-Za-z1-9._
          RegExp regex = RegExp(r'^[A-Za-z1-9._@]+$');
          if (arguments.isEmpty || !regex.hasMatch(arguments[0])) {
            if (command.toLowerCase() == 'help') {
              List<EmbedFieldBuilder> helpFields = <EmbedFieldBuilder>[
                EmbedFieldBuilder(
                  'Flutter Commands',
                  'f!widget, f!allwidgets, f!prop, f!allprop\nEG:\n`f!widget Container`\n`f!allwidgets container`\n`f!prop hero.tag`\n`f!allprop container`',
                ),
                EmbedFieldBuilder(
                  'Pub Commands',
                  'f!pub, f!allpub, f!pubdocs\nEG:\n`f!pub int`\n`f!allpub intl`\n`f!pubdocs intl`',
                ),
              ];
              embed.title = 'Hey, I\'m FlutterBot!';
              embed.fields.addAll(helpFields);
              embed.color = Colors.colors['basic'];
              embed.author = EmbedAuthorBuilder()
                ..iconUrl = imageUrl['flutter']
                ..name = 'help';
              embed.timestamp = DateTime.now();
              await event.message.channel.sendMessage(
                componentMessageBuilder..embeds = <EmbedBuilder>[embed],
              );
              return;
            }
            await event.message.channel.sendMessage(
              MessageContent.custom(
                'Missing arguments name.\nTry `f!widget widget_name`.',
              ),
            );
            return;
          } else {
            switch (command.toLowerCase()) {
              case 'widget':
                BotLogger.logln(LogType.info,
                    '${event.message.author.username} searched for widget : $arguments');
                Map<dynamic, dynamic>? wtf =
                    await Flutter.getWidget(arguments, container);
                embed.color = Colors.colors['basic'];
                if (wtf == null) {
                  author.name = 'Top results of ${arguments[0]}';
                  embed.description = 'Widget not found.';
                  embed.color = Colors.colors['red'];
                } else {
                  author.name = 'Top results of ${wtf['name']}';
                  embed.fields.add(
                    EmbedFieldBuilder(
                      wtf['name'],
                      BotConstants.flutterBaseUrl + wtf['href'].toString(),
                      false,
                    ),
                  );
                }
                await event.message.channel.sendMessage(
                  componentMessageBuilder..embeds = <EmbedBuilder>[embed],
                );
                return;
              case 'prop':
                BotLogger.logln(LogType.info,
                    '${event.message.author.username} searched for prop : $arguments');
                String? widget =
                    arguments[0].toString().split('.')[0].toLowerCase();
                if (flex.contains(widget)) {
                  widget = 'flex';
                }
                String? property = arguments[0].toString().split('.')[1];
                Map<dynamic, dynamic>? wtf = await Flutter.getWidgetProperty(
                    widget, property, container);
                author.name = 'Top results of $property in $widget';
                if (wtf == null) {
                  embed.description = 'Property not found.';
                  embed.color = Colors.colors['red'];
                } else {
                  embed.color = Colors.colors['basic'];
                  embed.fields.add(
                    EmbedFieldBuilder(
                      wtf['name'],
                      BotConstants.flutterBaseUrl + wtf['href'].toString(),
                      false,
                    ),
                  );
                }
                await event.message.channel.sendMessage(
                  componentMessageBuilder..embeds = <EmbedBuilder>[embed],
                );
                return;
              case 'allprop':
                BotLogger.logln(LogType.info,
                    '${event.message.author.username} searched for allprop : $arguments');
                String widget = arguments[0].trim();
                if (flex.contains(widget)) {
                  widget = 'flex';
                }
                List<dynamic> allProperties =
                    await Flutter.getAllWidgetProperties(widget, container);
                if (allProperties.isNotEmpty) {
                  embed.color = Colors.colors['basic'];
                  author.name = 'All properties of ${allProperties[0]['name']}';
                  embed.url = BotConstants.flutterBaseUrl +
                      allProperties[0]['href'].toString();
                  if (allProperties.length >= 25) {
                    // split the list into chunks of less than 25 items
                    int chunkSize = 24;
                    chunks.clear();
                    for (int i = 0; i < allProperties.length; i += chunkSize) {
                      chunks.add(allProperties.sublist(
                          i,
                          i + chunkSize > allProperties.length
                              ? allProperties.length
                              : i + chunkSize));
                    }
                    List<dynamic> firstChunk = chunks[0];
                    firstChunk.removeLast();
                    for (Map<String, dynamic> chunkData in firstChunk) {
                      if (chunkData['enclosedBy']['name'] !=
                          chunkData['name']) {
                        embed.fields.add(
                          EmbedFieldBuilder(
                            chunkData['name'],
                            BotConstants.flutterBaseUrl +
                                chunkData['href'].toString(),
                            false,
                          ),
                        );
                      }
                    }
                  } else {
                    for (Map<String, dynamic> links in allProperties) {
                      if (links['enclosedBy']['name'] != links['name']) {
                        embed.fields.add(
                          EmbedFieldBuilder(
                            links['name'],
                            BotConstants.flutterBaseUrl +
                                links['href'].toString(),
                            false,
                          ),
                        );
                      }
                    }
                  }
                } else {
                  author.name = 'All properties of ${arguments[0]}';
                  embed.description = 'Widget not found.';
                  embed.color = Colors.colors['red'];
                }
                if (allProperties.length >= 25) {
                  IMessage allPropMessage = event.message;
                  allPropMessage.components.clear();
                  await allPropMessage.dispose();
                  EmbedFieldBuilder moreField = EmbedFieldBuilder(
                    'More properties of ${arguments[0]}',
                    'Looks like we have more than 25 properties. So please head to ${BotConstants.flutterBaseUrl} ${allProperties[0]['href']}',
                    false,
                  );
                  embed.fields.add(moreField);
                  allPropMessage = await event.message.channel.sendMessage(
                      componentMessageBuilder..embeds = <EmbedBuilder>[embed]);
                } else {
                  await event.message.channel.sendMessage(
                    componentMessageBuilder..embeds = <EmbedBuilder>[embed],
                  );
                }
                return;
              case 'allwidgets':
                BotLogger.logln(LogType.info,
                    '${event.message.author.username} searched for allwidgets : $arguments');
                List<dynamic>? allWidgets =
                    await Flutter.getSimilarWidgets(arguments, container);
                author.name = 'All widgets similar to ${arguments[0]}';
                if (allWidgets != null) {
                  if (allWidgets.length > 10) {
                    StringBuffer nameBuffer = StringBuffer();
                    for (Map<String, dynamic> widg in allWidgets) {
                      embed.fields.add(
                        EmbedFieldBuilder(
                          widg['name'],
                          BotConstants.flutterBaseUrl + widg['href'].toString(),
                          false,
                        ),
                      );
                    }
                    if (nameBuffer.length > 2000) {
                      nameBuffer.clear();
                      embed.title = 'Too many results';
                      embed.color = Colors.colors['red'];
                      nameBuffer.write(
                          'Please use `f!allwidgets` with a more specific query.');
                      embed.description = nameBuffer.toString();
                    } else {
                      embed.color = Colors.colors['basic'];
                    }
                  } else {
                    for (Map<String, dynamic> links in allWidgets) {
                      embed.fields.add(
                        EmbedFieldBuilder(
                          links['name'],
                          BotConstants.flutterBaseUrl +
                              links['href'].toString(),
                          false,
                        ),
                      );
                    }
                  }
                } else {
                  embed.description = 'Widget similar not found.';
                  embed.color = Colors.colors['red'];
                }
                await event.message.channel.sendMessage(
                  componentMessageBuilder..embeds = <EmbedBuilder>[embed],
                );
                return;
              case 'pub':
                BotLogger.logln(LogType.info,
                    '${event.message.author.username} searched for pub : $arguments');
                Map<dynamic, dynamic>? packageData =
                    await Flutter.getPubPackage(
                        arguments[0].toLowerCase(), container);
                if (packageData == null || packageData['code'] == 'NotFound') {
                  embed.title = 'Not found';
                  embed.description = 'Package not found.';
                  embed.color = Colors.colors['red'];
                  await event.message.channel.sendMessage(
                    componentMessageBuilder..embeds = <EmbedBuilder>[embed],
                  );
                  return;
                } else {
                  author.iconUrl = imageUrl['dart'];
                  author.name = await Flutter.getAuthorName(
                      packageData['name'], container);
                  embed.color = Colors.custom(0x01579B);
                  embed.title = packageData['name'] +
                      ' - ' +
                      packageData['latest']['version'];
                  embed.description =
                      packageData['latest']['pubspec']['description'];
                  embed.url =
                      'https://${BotConstants.pubAuthority}${BotConstants.pubPackagesPath}${packageData['name']}';
                }
                await event.message.channel.sendMessage(
                  componentMessageBuilder..embeds = <EmbedBuilder>[embed],
                );
                return;
              case 'allpub':
                BotLogger.logln(LogType.info,
                    '${event.message.author.username} searched for allpub : $arguments');
                author.iconUrl = imageUrl['dart'];
                embed.color = Colors.custom(0x01579B);
                author.name = 'Top 10 packages of ${arguments[0]}';
                List<Map<String, dynamic>>? allPub =
                    await Flutter.getAllPubPackages(
                        arguments[0].toLowerCase(), container);
                if (allPub == null) {
                  embed.title = 'Not found';
                  embed.description = 'Package not found.';
                  embed.color = Colors.colors['red'];
                  await event.message.channel.sendMessage(
                    componentMessageBuilder..embeds = <EmbedBuilder>[embed],
                  );
                } else {
                  for (Map<String, dynamic> links in allPub) {
                    embed.fields.add(
                      EmbedFieldBuilder(
                        links['package'],
                        'https://${BotConstants.pubAuthority}${BotConstants.pubPackagesPath}${links['package']}',
                        false,
                      ),
                    );
                  }
                }
                await event.message.channel.sendMessage(
                  componentMessageBuilder..embeds = <EmbedBuilder>[embed],
                );
                return;
              case 'pubdocs':
                BotLogger.logln(LogType.info,
                    '${event.message.author.username} searched for pubdocs : $arguments');
                List<Map<String, dynamic>>? docs =
                    await Flutter.getPubPackageDocs(arguments[0], container);
                Map<dynamic, dynamic>? packageData =
                    await Flutter.getPubPackage(
                        arguments[0].toLowerCase(), container);
                if (packageData == null || docs == null) {
                  embed.title = 'Not found';
                  embed.description = 'Package not found.';
                  embed.color = Colors.colors['red'];
                  await event.message.channel.sendMessage(
                    componentMessageBuilder..embeds = <EmbedBuilder>[embed],
                  );
                  return;
                } else {
                  embed.title =
                      'Documentation of ${arguments[0]} - ${packageData['latest']['version']}';
                  author.iconUrl = imageUrl['dart'];
                  author.name = await Flutter.getAuthorName(
                      packageData['name'], container);
                  if (docs.isEmpty) {
                    embed.description = 'No documentation found.';
                  } else {
                    embed.description =
                        packageData['latest']['pubspec']['description'];
                    embed.url = BotConstants.pubDocsBaseUrl(arguments[0]);
                    await event.message.channel.sendMessage(
                      componentMessageBuilder..embeds = <EmbedBuilder>[embed],
                    );
                  }
                }
                return;
              default:
                await event.message.channel.sendMessage(
                  MessageContent.custom(
                    'Invalid command.\nUse `f!help` to see all commands.',
                  ),
                );
                break;
            }
          }
        }
      });
    } catch (e) {
      BotLogger.logln(LogType.error, e.toString());
      throw Exception(e.toString());
    }
  }
}
