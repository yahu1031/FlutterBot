import 'dart:io';

import 'package:dotenv/dotenv.dart';
import 'package:nyxx/nyxx.dart';
import 'package:riverpod/riverpod.dart';

import '../utils/constants.util.dart';
import 'logs.dart';

final Provider<AtBotEnv> atBotEnvProvider =
    Provider<AtBotEnv>((_) => AtBotEnv().._loadEnv());

class AtBotEnv {
  String? _prefix;
  String? get prefix => _prefix;

  /// Prefix provider
  String? _token;
  String? get token => _token;

  /// Bot ID private variable
  Snowflake? _clientID;
  Snowflake? get clientID => _clientID;

  /// Load all the env variables from `.env` file.
  /// If the file is not found, it will throw an exception.
  Future<void> _loadEnv() async {
    try {
      /// Check if file exist in the current working directory.
      if (File(BotConstants.envFile).existsSync()) {
        /// Load the env variables from the file.
        DotEnv env = DotEnv(includePlatformEnvironment: true)
          ..load(<String>[BotConstants.envFile]);

        /// Set the prefix
        if (env['prefix'] == null || env['prefix']!.isEmpty) {
          BotLogger.logln(LogType.error, 'Missing token in `.env` file');
          exit(-1);
        } else {
          _prefix = env['prefix'];
        }

        /// Set the token
        if (env['token'] == null || env['token']!.isEmpty) {
          BotLogger.logln(LogType.error, 'Missing token in `.env` file');
          exit(-1);
        } else {
          _token = env['token'];
        }

        /// Set the Bot ID
        if (env['botID'] == null || env['botID']!.isEmpty) {
          BotLogger.logln(LogType.error, 'Missing Bot ID in `.env` file');
          exit(-1);
        } else {
          _clientID = env['botID']!.toSnowflake();
        }
      } else {
        //   /// If the file is not found, throw FileSystemException.
        //   // throw const FileSystemException();
        BotLogger.logln(
            LogType.error, 'Missing `.env` file | Fetching from env');
        _prefix = Platform.environment['prefix'];
        _token = Platform.environment['token'];
        _clientID = Platform.environment['botID']!.toSnowflake();
      }
    } on FileSystemException catch (_) {
      /// Throw an exception if the file is not found.
      BotLogger.logln(LogType.error, 'Missing `.env` file | Fetching from env');
      _prefix = Platform.environment['prefix'];
      _token = Platform.environment['token'];
      _clientID = Platform.environment['botID']!.toSnowflake();
    } catch (e) {
      throw Exception('Exception : $e');
    }
  }
}
