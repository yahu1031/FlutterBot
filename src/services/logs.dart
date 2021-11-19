// 📦 Package imports:
import 'package:intl/intl.dart';
import 'package:nyxx/nyxx.dart';

// 🌎 Project imports:
import 'custom_print.util.dart' as console;

/// LoggerType Enum
enum LogType { success, info, warning, error }

/// Logger class
class BotLogger {
  /// Logger method to log depending on [LogType]
  static void log(LogType? tag, String? message) {
    /// Get the current date and time
    String time = DateFormat.yMEd().add_jms().format(DateTime.now());
    switch (tag) {
      case LogType.success:
        console.success('SUCCESS [$time] - $message');
        break;
      case LogType.info:
        console.info('INFORMATION [$time] - $message');
        break;
      case LogType.warning:
        console.log('WARNING [$time] - $message');
        break;
      case LogType.error:
        console.error('ERROR [$time] - $message\n[StackTraces] - ${StackTrace.current}');
        break;
      default:
        // ignore: avoid_print
        print('LOG [$time] - $message');
    }
  }

  static void logln(LogType? tag, String? message) {
    /// Get the current date and time
    String time = DateFormat.yMEd().add_jms().format(DateTime.now());
    switch (tag) {
      case LogType.success:
        console.successln('SUCCESS [$time] - $message');
        break;
      case LogType.info:
        console.infoln('INFORMATION [$time] - $message');
        break;
      case LogType.warning:
        console.logln('WARNING [$time] - $message');
        break;
      case LogType.error:
        console.errorln('ERROR [$time] - $message\n[StackTraces] - ${StackTrace.current}');
        break;
      default:
        console.println('LOG [$time] - $message');
    }
  }
}

/// Sends the message to the channel and logs it.
Future<void> logAndSendMessage(
    MessageReceivedEvent event, MessageBuilder messageBuilder, LogType logType, String logMessage) async {
  await event.message.channel.sendMessage(messageBuilder);
  BotLogger.logln(logType, logMessage);
}
