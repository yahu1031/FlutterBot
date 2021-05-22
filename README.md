<h1 align="center">Welcome to flutter-bot 🤖</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-2.4.3-blue.svg?cacheSeconds=2592000" />
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

This is a [**Flutter**](https://flutter.dev) Discord bot created with [Discord.js](https://discord.js.org/). This bot provides useful resources like docs, pub plugins/packages and API docs, flutterfire docs.

# Usage #

## Commands and Examples ##

* **`@Bot Name`**

  On mentioning the bot will give you the usage of commands embed message.

  <img src='https://cdn.discordapp.com/attachments/756903745241088011/775829104875405332/unknown.png' height = 200>

* **`!\<Flutter Command\> help`**

  We have a few [Flutter](https://flutter.dev/) commands and they are listed below

    * `!topwidget`  - This command will show the top Package/Object you are searching for.
        * Eg: `!topwidget hero`

          <img src='https://cdn.discordapp.com/attachments/756903745241088011/775831579897364490/unknown.png' width = 300/>

    * `!allwidgets` - This command will show you all Packages/Objects related to your search.
        * Eg: `!allwidgets hero`

          <img src = 'https://cdn.discordapp.com/attachments/756903745241088011/775832540006055946/unknown.png' height = 200/>

    * `!prop` - This will help you with the property you are searching for a particular widget.
        * Eg: `!prop hero.tag`

          <img src = 'https://cdn.discordapp.com/attachments/756903745241088011/775833039426551808/unknown.png' width = 300/>

    * `!allprop` - This command will show all the properties of a Package/Object you are searching for.
        * Eg: `!allprop hero`

          <img src =  'https://cdn.discordapp.com/attachments/756903745241088011/775833480466399272/unknown.png' height = 200/>

* **`!\<Pub Command\> help`**

  We have few [pub](https://pub.dev/) commands and they are listed below

    * `!pub` - This command will give you the top search of the packages if the given command matches with the package.

        * Eg: `!pub google_fonts`

          <img src='https://cdn.discordapp.com/attachments/756903745241088011/775836241933369364/unknown.png' width=300/>

    * `!allpub` - This command will show the top 10 Packages results you are searching for.

        * Eg: `!allpub google_fonts`

          <img src='https://cdn.discordapp.com/attachments/756903745241088011/775837021570072576/unknown.png' height=200/>

    We also have the `Pubdocs` command that which provides you the [`Pub package's/plugin's`](https://pub.dev) API documentation.

    * Eg: `!pubdocs google_fonts`

      <img src = 'https://cdn.discordapp.com/attachments/756903745241088011/775838126416723978/unknown.png' width = 300/>

* **`!\<Flutterfire Command\> list`**
  
  We have a few [Flutterfire](https://firebase.flutter.dev/) commands and they are listed below

    * `!flutterfire list` - This command will give you the docs link about flutter firebase.

        * Eg: `!flutterfire list`

          <img src='https://cdn.discordapp.com/attachments/756903745241088011/775839137839710218/unknown.png' height=300/>

    * `!flutterfire <your required docs>`

        * docs
        * analytics
        * auth
        * firestore
        * functions
        * messaging
        * storage
        * core
        * crashlytics
        * database
        * remote-config
        * performance

* **There are some other commands you can explaore by using `@Bot Name support`**

## Running the Bot ##

1) Clone the repository.

    ```sh
    git clone https://github.com/yahu1031/FlutterBot.git
    ```

2) Create a `.env` file in the project root directory and paste this code given below.

    ```env
    BOT_TOKEN=your bot token

    PREFIX=!

    MAINTAINERID=ID of the bot maintainer
    ```

    > **Note:**
    >
    > 1) Prefix variable is recommended to be `!`.
    >
    > 2) The links in the environment variables must not be disturbed.

3) Get the dependency modules.

    ```sh
    npm i
    ```

4) Run the bot.

    ```sh
    npm run start
    ```

> **NOTE:** If you want to follow eslint and markdownlint please do install plugins for them.

## 👤 Author ##

**Minnu**

* Github: [@yahu1031](https://github.com/yahu1031)
* Twitter: [@minnu6931](https://twitter.com/minnu6931)
* Instagram: [@\_son_of_raghava.rao\_](https://instagram.com/_son_of_raghava.rao_/)

## 🤝 Contributing ##

Contributions, Issues, and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/yahu1031/FlutterBot/issues). You can also take a look at the [contributing guide](https://github.com/yahu1031/FlutterBot/blob/main/CONTRIBUTING.md). Please don't forget to check [Code of Conduct](https://github.com/yahu1031/FlutterBot/blob/main/CODE_OF_CONDUCT.md).

## 💪 Show your support ##

Give one ⭐️ if this project helped you!

## 📝 License ##

Copyright © 2020 [minnu](https://github.com/yahu1031).<br />
This project is [MIT](https://github.com/yahu1031/FlutterBot/blob/main/LICENSE) licensed.

## New Changes ➕ ##

***Major changes***

* Removed API links from `.env` file and added to Code.

* Git URLs and information was modified.

* ADB files has been modified.

***Minor Changes***

corrected some logics.

## Hidden Commands ##

Three commands have been hidden from the commands available.

* `!ask <USER_ID>`
* `!code`

## Fixes ##

* Modified major links that are not propriate.

* Fixed [#37](https://github.com/yahu1031/FlutterBot/issues/37)🚨.

### Add this bot to your guild ###

Click on the bot to add this to your guild. [🤖](https://discord.com/api/oauth2/authorize?client_id=756127435065655336&permissions=8&scope=bot)

**NOTE:** By default this bot has Administrator rights. Please do change the rights as you wish after adding it to your guild or use this [Permissions Calculator](https://discordapi.com/permissions.html) to calculate permissions and add your bot ID to generate an invite link.

## What's-up on the next update ##

* Error command to get a solution for the common errors during flutter installation.

***

<p align="center"> Made with 💚, From Minnu. </p> <br />
<p align="center">All assets used in this project related to flutter are taken directly from <a href="https://flutter.dev">Flutter.dev</a></p>
