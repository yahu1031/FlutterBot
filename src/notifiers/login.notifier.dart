import '../services/load_env.util.dart';
import './../services/logs.dart';
import 'package:nyxx/nyxx.dart';
import 'package:riverpod/riverpod.dart';

final Provider<Client> _clientProvider =
    Provider<Client>((Ref ref) => Client());
final FutureProvider<INyxxWebsocket?> clientProvider =
    FutureProvider<INyxxWebsocket?>((Ref ref) {
  Client client = ref.read(_clientProvider);
  AtBotEnv env = ref.read(atBotEnvProvider);
  String? token = env.token;
  return client.login(token, GatewayIntents.all);
});

class Client {
  /// Login the discord bot with the given token as parameter
  Future<INyxxWebsocket?> login(String? token, int? privilages) async {
    try {
      /// Check if [token] is null. If null, Throw [MissingTokenError].
      if (token == null) throw MissingTokenError();
      // return Nyxx(
      //   token,
      //   privilages!,
      //   cacheOptions: CacheOptions()
      //     ..memberCachePolicyLocation = CachePolicyLocation.all()
      //     ..userCachePolicyLocation = CachePolicyLocation.all(),
      //   ignoreExceptions: false,
      // );
      return NyxxFactory.createNyxxWebsocket(
        token,
        privilages!,
        cacheOptions: CacheOptions()
          ..memberCachePolicyLocation = CachePolicyLocation.all()
          ..userCachePolicyLocation = CachePolicyLocation.all(),
        ignoreExceptions: false,
      );
    } catch (e) {
      BotLogger.logln(LogType.error, 'Login Exception : ${e.toString()}');
      return null;
    }
  }
}
