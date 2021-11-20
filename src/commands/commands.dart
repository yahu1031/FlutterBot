import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:riverpod/riverpod.dart';

class Flutter {
  /// API data of flutter widgets, properties, methods, etc.
  static StateProvider<List<Map<String, dynamic>>?> apiData = StateProvider<List<Map<String, dynamic>>?>((_) => null);

  /// Pub API data of flutter and dart packages.
  static StateProvider<Map<String, dynamic>?> pubData = StateProvider<Map<String, dynamic>?>((_) => null);

  /// This function will fetch the data from the API
  static Future<void> getData(ProviderContainer ref) async {
    try {
      // make the request
      http.Response response = await http.get(Uri.parse('https://api.flutter.dev/flutter/index.json'));
      // conver the response to list
      List<Map<String, dynamic>> data = json.decode(response.body).cast<Map<String, dynamic>>();
      ref.read(apiData.notifier).state = data;
    } catch (e) {
      print(e);
    }
  }

  /// This function will return the Widget data.
  static Future<Map<String, dynamic>?> getWidget(List<String>? args, ProviderContainer ref) async {
    if (args == null || args.isEmpty) return null;
    List<Map<String, dynamic>>? data = ref.read(Flutter.apiData);
    for (Map<String, dynamic> widgetData in data!) {
      if (widgetData['name'].toLowerCase() == args[0].toLowerCase() &&
          (widgetData['enclosedBy']['name'].toLowerCase() == 'widgets' ||
              widgetData['enclosedBy']['name'].toString().toLowerCase() == args[0].toLowerCase())) {
        return widgetData;
      }
    }
    return null;
  }

  /// This function will return the Widget's property.
  static Future<Map<String, dynamic>?> getWidgetProperty(String widget, String property, ProviderContainer ref) async {
    List<Map<String, dynamic>>? data = ref.read(Flutter.apiData);
    for (Map<String, dynamic> propertyData in data!) {
      if (propertyData['name'].toLowerCase() == property &&
          propertyData['qualifiedName'].toString().toLowerCase().contains(widget.toLowerCase())) {
        return propertyData;
      }
    }
    return null;
  }

  /// This function will return the list of properties of the widget.
  static Future<List<Map<String, dynamic>>> getAllWidgetProperties(String widget, ProviderContainer ref) async {
    List<Map<String, dynamic>>? data = ref.read(Flutter.apiData);
    List<Map<String, dynamic>> properties = <Map<String, dynamic>>[];
    for (dynamic propertyData in data!) {
      if (propertyData['qualifiedName'].toString().toLowerCase().contains(widget.toLowerCase()) &&
          propertyData['enclosedBy']['name'].toString().toLowerCase() == widget.toLowerCase()) {
        properties.add(propertyData);
      }
    }
    return properties;
  }

  /// This function will return the similar widgets.
  static Future<List<Map<String, dynamic>>> getSimilarWidgets(List<String> args, ProviderContainer ref) async {
    List<Map<String, dynamic>>? data = ref.read(Flutter.apiData);
    List<Map<String, dynamic>> similarWidgets = <Map<String, dynamic>>[];
    for (dynamic widgetData in data!) {
      if (widgetData['name'].toLowerCase().contains(args[0].toLowerCase()) &&
          widgetData['type'].toLowerCase() == 'class') {
        similarWidgets.add(widgetData);
      }
    }
    return similarWidgets;
  }

  /// This function will return the pub package.
  static Future<Map<String, dynamic>?> getPubPackage(String packageName, ProviderContainer ref) async {
    try {
      // make the request
      http.Response response = await http.get(Uri.parse('https://pub.dev/api/packages/$packageName'));
      // conver the response to list
      Map<String, dynamic> data = json.decode(response.body);
      return data;
    } catch (e) {
      print(e);
    }
  }

  /// This function will return the all pub packages.
  static Future<List<Map<String, dynamic>>> getAllPubPackages(String package, ProviderContainer ref) async {
    try {
      // make the request
      http.Response response = await http.get(Uri.parse('https://pub.dev/api/search?q=$package'));
      // conver the response to list
      Map<String, dynamic> data = json.decode(response.body);
      List<Map<String, dynamic>> pubList = await data['packages'].cast<Map<String, dynamic>>();
      return pubList;
    } catch (e) {
      print(e);
      return <Map<String, dynamic>>[];
    }
  }

  /// This function will return the pub package's API docs.
  static Future<List<Map<String, dynamic>>?> getPubPackageDocs(String packageName, ProviderContainer ref) async {
    try {
      // make the request
      http.Response response =
          await http.get(Uri.parse('https://pub.dev/documentation/$packageName/latest/index.json'));
      if (response.body.contains('404 Not Found')) return <Map<String, dynamic>>[];
      // conver the response to list
      List<Map<String, dynamic>> data = await json.decode(response.body).cast<Map<String, dynamic>>();
      return data;
    } catch (e) {
      print(e);
    }
  }

  /// This package will return the pub package's API data.
  static Future<Map<String, dynamic>?> getPubPackageDocsData(String packageName, ProviderContainer ref) async {
    try {
      // make the request
      http.Response response =
          await http.get(Uri.parse('https://pub.dev/documentation/$packageName/latest/index.json'));
      // conver the response to list
      Map<String, dynamic> data = json.decode(response.body);
      return data;
    } catch (e) {
      print(e);
    }
  }

  /// This function returns the author name.
  static Future<String?> getAuthorName(String package, ProviderContainer ref) async {
    Map<String, dynamic>? packageData = await getPubPackage(package, ref);
    String? author = packageData!['latest']['pubspec']['author'];
    if (author == null) {
      if (packageData['latest']['pubspec']['repository'] == null) {
        return packageData['latest']['pubspec']['homepage'].toString().split('/')[3];
      } else {
        return packageData['latest']['pubspec']['repository'].toString().split('/')[3];
      }
    }
    return author;
  }
}
