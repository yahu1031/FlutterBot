import 'package:nyxx_interactions/nyxx_interactions.dart';

import '../../services/logs.dart';

Future<void> buttonInteraction(IButtonInteractionEvent event) async {
  try {
    /// Get the interaction ID
    // String id = event.interaction.customId;

    /// Get the Guild ID
    // IGuild? guild = event.interaction.message!.client.guilds.;

  } catch (e) {
    BotLogger.logln(LogType.error, e.toString());
  }
}
