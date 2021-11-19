import 'package:nyxx/nyxx.dart';

class Colors {
  static Map<String, DiscordColor> colors = <String, DiscordColor>{
    /// Represents no color, or integer 0.
    'none': DiscordColor.none,

    /// A near-black color.
    /// Due to API limitations, the color is #010101,
    /// rather than #000000, as the latter is treated as no color.
    'black': DiscordColor.black,

    /// White, or #FFFFFF.
    'white': DiscordColor.white,

    /// Gray, or #808080.
    'gray': DiscordColor.gray,

    /// Dark gray, or #A9A9A9.
    'darkGray': DiscordColor.darkGray,

    /// Light gray, or #808080.
    'lightGray': DiscordColor.lightGray,

    /// Very dark gray, or #666666.
    'veryDarkGray': DiscordColor.veryDarkGray,

    /// Flutter blue, or #02569B
    'flutterBlue': DiscordColor.flutterBlue,

    /// Dart's primary blue color, or #0175C2
    'dartBlue': DiscordColor.dartBlue,

    ///  Dart's secondary blue color, or #13B9FD
    'dartSecondary': DiscordColor.dartSecondary,

    /// Discord Blurple, or #7289DA.
    'blurple': DiscordColor.blurple,

    /// Discord Grayple, or #99AAB5.
    'grayple': DiscordColor.grayple,

    /// Discord Dark, But Not Black, or #2C2F33.
    'darkButNotBlack': DiscordColor.darkButNotBlack,

    /// Discord Not QuiteBlack, or #23272A.
    'notQuiteBlack': DiscordColor.notQuiteBlack,

    /// Red, or #FF0000.
    'red': DiscordColor.red,

    /// Dark red, or #7F0000.
    'darkRed': DiscordColor.darkRed,

    /// Green, or #00FF00.
    'green': DiscordColor.green,

    /// Dark green, or #007F00.
    'darkGreen': DiscordColor.darkGreen,

    /// Blue, or #0000FF.
    'blue': DiscordColor.blue,

    /// Dark blue, or #00007F.
    'darkBlue': DiscordColor.darkBlue,

    /// Yellow, or #FFFF00.
    'yellow': DiscordColor.yellow,

    /// Cyan, or #00FFFF.
    'cyan': DiscordColor.cyan,

    /// Magenta, or #FF00FF.
    'magenta': DiscordColor.magenta,

    /// Teal, or #008080.
    'teal': DiscordColor.teal,

    /// Aquamarine, or #00FFBF.
    'aquamarine': DiscordColor.aquamarine,

    /// Gold, or #FFD700.
    'gold': DiscordColor.gold,

    /// Goldenrod, or #DAA520
    'goldenrod': DiscordColor.goldenrod,

    /// Azure, or #007FFF.
    'azure': DiscordColor.azure,

    /// Rose, or #FF007F.
    'rose': DiscordColor.rose,

    /// Spring green, or #00FF7F.
    'springGreen': DiscordColor.springGreen,

    /// Chartreuse, or #7FFF00.
    'chartreuse': DiscordColor.chartreuse,

    /// Orange, or #FFA500.
    'orange': DiscordColor.orange,

    /// Purple, or #800080.
    'purple': DiscordColor.purple,

    /// Violet, or #EE82EE.
    'violet': DiscordColor.violet,

    /// Brown, or #A52A2A.
    'brown': DiscordColor.brown,

    /// Hot pink, or #FF69B4
    'hotPink': DiscordColor.hotPink,

    /// Lilac, or #C8A2C8.
    'lilac': DiscordColor.lilac,

    /// Cornflower blue, or #6495ED.
    'cornflowerBlue': DiscordColor.cornflowerBlue,

    /// Midnight blue, or #191970.
    'midnightBlue': DiscordColor.midnightBlue,

    /// Wheat, or #F5DEB3.
    'wheat': DiscordColor.wheat,

    /// Indian red, or #CD5C5C.
    'indianRed': DiscordColor.indianRed,

    /// Turquoise, or #30D5C8.
    'turquoise': DiscordColor.turquoise,

    /// Sap green, or #507D2A.
    'sapGreen': DiscordColor.sapGreen,

    /// Phthalo blue, or #000F89.
    'phthaloBlue': DiscordColor.phthaloBlue,

    /// Phthalo green, or #123524.
    'phthaloGreen': DiscordColor.phthaloGreen,

    /// Sienna, or #882D17.
    'sienna': DiscordColor.sienna,
  };
}
