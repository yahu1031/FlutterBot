import 'package:nyxx_lavalink/lavalink.dart';

import './../src/services/load_env.util.dart';
import './../src/notifiers/login.notifier.dart';
import './../src/notifiers/on_ready.notifier.dart';
import './../src/notifiers/on_msg.notifier.dart';
import './../src/services/logs.dart';
import './../src/events/music.event.dart';
import 'package:nyxx/nyxx.dart';
import 'package:riverpod/riverpod.dart';

Future<void> main() async {
  ProviderContainer container = ProviderContainer();
  // await AtBotEnv.loadEnv(container);
  AtBotEnv env = container.read(atBotEnvProvider);
  Snowflake clientID = env.clientID!;
  Nyxx? client = await container.read(clientProvider.future);
  Cluster cluster = Cluster(client!, clientID);
  try {
    await cluster.addNode(NodeOptions(
      host: 'lavalink.yahu1031.repl.co',
      port: 443,
      ssl: true,
    ));
  } on Exception catch (e) {
    BotLogger.log(LogType.error, e.toString());
  }
  await MusicEvent.onMusicEvent(cluster, container);
  await ClientReady.onReadyEvent(client, container);
  await MessageNotifier.onMsgEvent(client, container, cluster: cluster);
}
