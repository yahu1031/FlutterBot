import 'dart:io';

/// Prints the given message to the console with a new line.
// ignore_for_file: avoid_print

void println(String text) {
  stdout.writeln(text);
}

/// Prints the given message to the console as ***`Warning`***.
void log(String text) {
  stdout.write('\x1B[33m$text\x1B[0m');
}

/// Prints the given message to the console as ***`Warning`*** with the new line.
void logln(String text) {
  println(text);
}

/// Prints the given message to the console as ***`Error`***.
void error(String text) {
  stderr.write('\x1B[31m$text\x1B[0m');
}

/// Prints the given message to the console as ***`Error`*** with the new line.
void errorln(String text) {
  stderr.writeln(text);
}

/// Prints the given message to the console as ***`Information`***.
void info(String text) {
  stdout.write('\x1B[36m$text\x1B[0m');
}

/// Prints the given message to the console as ***`Information`*** with the new line.
void infoln(String text) {
  println(text);
}

/// Prints the given message to the console as ***`Information`***.
void success(String text) {
  stdout.write('\x1B[32m$text\x1B[0m');
}

/// Prints the given message to the console as ***`Information`*** with the new line.
void successln(String text) {
  println('\x1B[32m$text\x1B[0m');
}
