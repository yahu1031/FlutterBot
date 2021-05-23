<h1 align="center">Contribute to flutter-bot 🤖</h1>

<p>
  <img alt="Version" src="https://img.shields.io/badge/version-2.4.4--stable.1-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/yahu1031/FlutterBot#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/yahu1031/FlutterBot/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/yahu1031/FlutterBot/blob/main/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/github/license/yahu1031/flutterbot" />
  </a>
</p>

### 🏠 [Homepage](https://github.com/yahu1031/FlutterBot#readme) ###

> Steps to contribute something to this bot as follows

1) [Learn Node.js :joy:](https://github.com/yahu1031/FlutterBot/blob/main/CONTRIBUTING.md#learn-nodejs-joy).
2) [Fork the project :fork_and_knife:](https://github.com/yahu1031/FlutterBot/blob/main/CONTRIBUTING.md#fork-the-project-fork_and_knife).
3) [Development Environment :hammer:](https://github.com/yahu1031/FlutterBot/blob/main/CONTRIBUTING.md#development-environment-hammer).
4) [Test server and bot account :zap:](https://github.com/yahu1031/FlutterBot/blob/main/CONTRIBUTING.md#test-server-and-bot-account-zap).
5) [Configure the bot :wrench:](https://github.com/yahu1031/FlutterBot/blob/main/CONTRIBUTING.md#configure-the-bot-wrench).
6) [Run the project :running:](https://github.com/yahu1031/FlutterBot/blob/main/CONTRIBUTING.md#run-the-project-running).
7) [Working with Git :man_technologist:](https://github.com/yahu1031/FlutterBot/blob/main/CONTRIBUTING.md#working-with-git-man_technologist).

## Get Started ##

### Learn Node.JS :joy: ###

Node.js is an open-source server environment, runs on various platforms (Windows, Linux, Unix, Mac OS X, etc.), uses JavaScript on the server. Read about them here [Node.js](https://nodejs.org/en/docs/).

### Fork the project :fork_and_knife: ###

Fork us to your repo and help us developing more better. Create a branch in the forked repo and work on the branch. Make [PR(Pull Request)](https://github.com/yahu1031/FlutterBot/pull) on what ever you worked on. PRs are most welcome.

### Development Environment :hammer: ###

1) Clone your forked repository.

    ```sh
    git clone "your repo link"
    ```

2) Install required packages.

    ```sh
    npm i
    ```

3) Be ready to develop it :wink:.

### Test server and bot account :zap: ###

You will be needed your own test server and bot account on Discord to test the bot with your changes.

1) [Create a Discord server](https://support.discord.com/hc/en-us/articles/204849977-How-do-I-create-a-server-).
2) [Create a Discord developer account](https://discordapp.com/developers/applications/).

Invite the FlutterBot to the server you have created. If you are not aware of adding a bot to the server, Here is the [Documentation](https://discord.com/developers/docs/topics/oauth2#bots) to do it.

### Configure the bot :wrench: ###

To configure the bot you must need to add some **variables**.

In the root dir create a file called `.env` and add the variables in the file.

  ```txt
    BOT_TOKEN=your bot token

    PREFIX=!

    MAINTAINERID=ID of the bot maintainer
  ```

  > **Note:**
  >
  > 1) Prefix variable is recommended to be `!`.
  >
  > 2) The links in the environment variables must not be disturbed.

### Run the project :running: ###

You are almost done with the setup and start running the bot

  ```sh
  npm run start
  ```

If your output in the console seems like this

  ```log
  > flutter-bot@2.4.4-stable.1 start C:\Users\Admin\Documents\Projects\FlutterBot
  > node ./main.js

  Data fetched from API.....✔️
  Flutter Bot#2970 has been logged in.....🌐
  ```

then, Congrats you made it.

### Working with Git :man_technologist: ###

1) We are on the final step now :satisfied:. After developing the code you can make a PR. All PRs are welcome.
2) If any issues were found please make use a note by raising [issues](https://github.com/yahu1031/FlutterBot/issues/new).

## Show your support ##

Give one ⭐️ if this project helped you!

Fork <svg class="octicon octicon-repo-forked" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"></path></svg> this repository and develop.

## 📝 License ##

Copyright © 2020 [minnu](https://github.com/yahu1031).<br />
This project is [MIT](https://github.com/yahu1031/FlutterBot/blob/main/LICENSE) licensed.

***

<p align="center"> Made with 💚, From Minnu. </p> <br />
<p align="center">All assets used in this project related to flutter are taken directly from <a href="https://flutter.dev">Flutter.dev</a></p>