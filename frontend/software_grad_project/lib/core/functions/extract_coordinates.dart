import 'dart:convert';

List<double> extractCoordinates(String input) {
  List<double> coordinates = [];
  Map<String, dynamic> location = jsonDecode(input);

  if (location.containsKey('lat') && location.containsKey('lng')) {
    double lat = location['lat'];
    double lng = location['lng'];
    coordinates.add(lat);
    coordinates.add(lng);
  }

  return coordinates;
}
