import 'dart:async';

import 'package:nyxx/nyxx.dart';
import 'package:nyxx_interactions/interactions.dart';
import 'package:nyxx_lavalink/lavalink.dart';
import 'package:riverpod/riverpod.dart';

import '../notifiers/time.notifier.dart';
import '../services/logs.dart';
import '../utils/colors.util.dart';
import '../utils/constants.util.dart';

class MusicEvent {
  static Future<StreamSubscription<TrackStartEvent>> onMusicEvent(Cluster cluster, ProviderContainer container) async {
    return cluster.onTrackStart.listen((TrackStartEvent event) async {
      try {
        Provider<Time> _timeProvider = Provider<Time>((Ref ref) => Time());
        ProviderFamily<String, int> msToMinProvider =
            Provider.family<String, int>((Ref ref, int time) => ref.read(_timeProvider).msToMin(time) + ' Min');
        GuildPlayer? player = event.node.players[event.guildId];
        if (player == null) return;
        QueuedTrack? nowPlaying = player.nowPlaying;
        if (nowPlaying == null) return;
        TextGuildChannel channel = await event.client.fetchChannel<TextGuildChannel>(nowPlaying.channelId!);
        EmbedBuilder embed = EmbedBuilder();
        embed.title = 'Track started';
        embed.description = 'Playing ${nowPlaying.track.info?.title}';
        embed.color = Colors.colors['orange'];
        embed.fields
          ..add(EmbedFieldBuilder('By', nowPlaying.track.info!.author))
          ..add(EmbedFieldBuilder('Requested by', '<@${nowPlaying.requester}>'))
          ..add(
            EmbedFieldBuilder(
              'Duration',
              container.read(
                msToMinProvider(nowPlaying.track.info!.length),
              ),
            ),
          )
          ..add(EmbedFieldBuilder('Link', nowPlaying.track.info!.uri));

        ComponentMessageBuilder messageBuilder = ComponentMessageBuilder()
          ..embeds = <EmbedBuilder>[embed]
          ..components = <List<IComponentBuilder>>[BotConstants.musicComponents];
        try {
          if (messageBuilder.components!.isEmpty) {
            await channel.sendMessage(
              messageBuilder..components!.add(BotConstants.musicComponents),
            );
          }
        } on Exception catch (e) {
          BotLogger.log(LogType.error, e.toString());
        }
      } on Exception catch (e) {
        BotLogger.log(LogType.error, e.toString());
      }
    });
  }
}
