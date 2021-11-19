import 'dart:io';

import 'package:dotenv/dotenv.dart';
import 'package:nyxx/nyxx.dart';
import 'package:riverpod/riverpod.dart';

import '../utils/constants.util.dart';
import 'logs.dart';

// class AtBotEnv {
//   AtBotEnv._();

//   /// Prefix provider
//   static StateProvider<String?> prefix = StateProvider<String?>((_) => null);

//   /// Token provider
//   static StateProvider<String?> token = StateProvider<String?>((_) => null);

//   /// Bot ID provider
//   static StateProvider<Snowflake?> clientID = StateProvider<Snowflake?>((_) => null);

//   /// Load all the env variables from `.bot.env` file.
//   /// If the file is not found, it will throw an exception.
//   static Future<void> loadEnv(ProviderContainer ref) async {
//     try {
//       /// Check if file exist in the current working directory.
//       if (File(BotConstants.envFile).existsSync()) {
//         /// Load the env variables from the file.
//         load(BotConstants.envFile);

//         /// Set the prefix
//         if (env['prefix'] == null || env['prefix']!.isEmpty) {
//           BotLogger.logln(LogType.error, 'Missing token in `.bot.env` file');
//           exit(-1);
//         } else {
//           ref.read(prefix.notifier).state = env['prefix'];
//         }

//         /// Set the token
//         if (env['token'] == null || env['token']!.isEmpty) {
//           BotLogger.logln(LogType.error, 'Missing token in `.bot.env` file');
//           exit(-1);
//         } else {
//           ref.read(token.notifier).state = env['token'];
//         }

//         /// Set the Bot ID
//         if (env['botID'] == null || env['botID']!.isEmpty) {
//           BotLogger.logln(LogType.error, 'Missing Bot ID in `.bot.env` file');
//           exit(-1);
//         } else {
//           ref.read(clientID.notifier).state = env['botID']!.toSnowflake();
//         }
//       } else {
//         /// If the file is not found, throw FileSystemException.
//         throw const FileSystemException();
//       }
//     } on FileSystemException catch (_) {
//       /// Throw an exception if the file is not found.
//       throw FileSystemException(
//         'File `${BotConstants.envFile}` not found.',
//         Directory.current.path,
//       );
//     } catch (e) {
//       throw Exception('Exception : ' + e.toString());
//     }
//   }
// }

final Provider<AtBotEnv> atBotEnvProvider = Provider<AtBotEnv>((_) => AtBotEnv().._loadEnv());

class AtBotEnv {
  String? _prefix;
  String? get prefix => _prefix;

  /// Prefix provider
  String? _token;
  String? get token => _token;

  /// Bot ID private variable
  Snowflake? _clientID;
  Snowflake? get clientID => _clientID;

  /// Load all the env variables from `.bot.env` file.
  /// If the file is not found, it will throw an exception.
  Future<void> _loadEnv() async {
    try {
      /// Check if file exist in the current working directory.
      if (File(BotConstants.envFile).existsSync()) {
        /// Load the env variables from the file.
        load(BotConstants.envFile);

        /// Set the prefix
        if (env['prefix'] == null || env['prefix']!.isEmpty) {
          BotLogger.logln(LogType.error, 'Missing token in `.bot.env` file');
          exit(-1);
        } else {
          _prefix = env['prefix'];
        }

        /// Set the token
        if (env['token'] == null || env['token']!.isEmpty) {
          BotLogger.logln(LogType.error, 'Missing token in `.bot.env` file');
          exit(-1);
        } else {
          _token = env['token'];
        }

        /// Set the Bot ID
        if (env['botID'] == null || env['botID']!.isEmpty) {
          BotLogger.logln(LogType.error, 'Missing Bot ID in `.bot.env` file');
          exit(-1);
        } else {
          _clientID = env['botID']!.toSnowflake();
        }
      } else {
        /// If the file is not found, throw FileSystemException.
        throw const FileSystemException();
      }
    } on FileSystemException catch (_) {
      /// Throw an exception if the file is not found.
      throw FileSystemException(
        'File `${BotConstants.envFile}` not found.',
        Directory.current.path,
      );
    } catch (e) {
      throw Exception('Exception : ' + e.toString());
    }
  }
}
