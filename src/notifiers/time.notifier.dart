class Time {
  String msToMin(int millis) {
    int minutes = (millis / 60000).floor();
    int seconds = ((millis % 60000) / 1000).floor();
    return '$minutes : $seconds';
  }
}
