import 'dart:async';

import 'package:nyxx_interactions/nyxx_interactions.dart';

import '../src/events/interations/button.interation.dart';
import './../src/services/load_env.util.dart';
import './../src/notifiers/login.notifier.dart';
import './../src/notifiers/on_ready.notifier.dart';
import './../src/notifiers/on_msg.notifier.dart';
import 'package:nyxx/nyxx.dart';
import 'package:riverpod/riverpod.dart';

Future<void> main() async {
  try {
    ProviderContainer container = ProviderContainer();
    container.read(atBotEnvProvider);
    INyxxWebsocket? client = await container.read(clientProvider.future);
    await client?.connect();
    // await Flutter.getData(container);
    await ClientReady.onReadyEvent(client, container);
    await MessageNotifier.onMsgEvent(client, container);

    /// User interaction.
    IInteractions.create(WebsocketInteractionBackend(client!))
      ..events.onButtonEvent.listen(buttonInteraction)
      ..syncOnReady();
  } on Exception catch (e) {
    print(e.toString());
  }
}
