FROM google/dart:2.15.0-82.2.beta as builder

WORKDIR /app

ADD pubspec.* /app/
RUN pub get

ADD . /app/
RUN pub get --offline

RUN dart compile exe bin/flutter_bot.dart

FROM subfuzion/dart:slim

WORKDIR /app
COPY --from=builder /app/bin/flutter_bot.exe /app

CMD [ "./flutter_bot.exe" ]