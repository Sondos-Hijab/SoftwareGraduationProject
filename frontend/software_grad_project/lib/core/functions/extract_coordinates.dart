List<double> extractCoordinates(String input) {
  List<double> coordinates = [];
  RegExp regex = RegExp(r'[-+]?\d*\.\d+');
  Iterable<RegExpMatch> matches = regex.allMatches(input);

  for (RegExpMatch match in matches) {
    double value = double.parse(match.group(0)!);
    coordinates.add(value);
  }

  return coordinates;
}
