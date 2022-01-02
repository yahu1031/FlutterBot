// import 'dart:async';

// import 'package:nyxx/nyxx.dart';
// import 'package:nyxx_interactions/nyxx_interactions.dart';
// import 'package:nyxx_interactions/src/builders/component_builder.dart';
// import 'package:nyxx_lavalink/nyxx_lavalink.dart';
// import 'package:riverpod/riverpod.dart';

// import '../notifiers/time.notifier.dart';
// import '../services/logs.dart';
// import '../utils/colors.util.dart';
// import '../utils/constants.util.dart';

// class MusicEvent {
//   static Future<StreamSubscription<ITrackStartEvent>> onMusicEvent(
//       ICluster cluster, ProviderContainer container) async {
//     return cluster.
//     onTrackStart.listen((ITrackStartEvent event) async {
//       try {
//         Provider<Time> _timeProvider = Provider<Time>((Ref ref) => Time());
//         ProviderFamily<String, int> msToMinProvider =
//             Provider.family<String, int>((Ref ref, int time) =>
//                 ref.read(_timeProvider).msToMin(time) + ' Min');
//         IGuildPlayer? player = event.node.players[event.guildId];
//         if (player == null) return;
//         IQueuedTrack? nowPlaying = player.nowPlaying;
//         if (nowPlaying == null) return;
//         ITextGuildChannel channel = await event.client
//             .fetchChannel<ITextGuildChannel>(nowPlaying.channelId!);
//         EmbedBuilder embed = EmbedBuilder();
//         embed.title = 'Track started';
//         embed.description = 'Playing ${nowPlaying.track.info?.title}';
//         embed.color = Colors.colors['orange'];
//         embed.fields
//           ..add(EmbedFieldBuilder('By', nowPlaying.track.info!.author))
//           ..add(EmbedFieldBuilder('Requested by', '<@${nowPlaying.requester}>'))
//           ..add(
//             EmbedFieldBuilder(
//               'Duration',
//               container.read(
//                 msToMinProvider(nowPlaying.track.info!.length),
//               ),
//             ),
//           )
//           ..add(EmbedFieldBuilder('Link', nowPlaying.track.info!.uri));

//         ComponentMessageBuilder messageBuilder = ComponentMessageBuilder()
//           ..embeds = <EmbedBuilder>[embed]
//           ..componentRows = <List<ComponentBuilderAbstract>>[
//             // BotConstants.musicComponents
//           ];
//         try {
//           if (messageBuilder.componentRows!.isEmpty) {
//             await channel.sendMessage(
//               messageBuilder
//               // ..componentRows!.add(
//                 // BotConstants.musicComponents
//                 // ),
//             );
//           }
//         } on Exception catch (e) {
//           BotLogger.log(LogType.error, e.toString());
//         }
//       } on Exception catch (e) {
//         BotLogger.log(LogType.error, e.toString());
//       }
//     });
//   }
// }
