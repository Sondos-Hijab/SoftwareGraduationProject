convertToFixedDouble(d) {
  String inString = d.toStringAsFixed(3);
  double inDouble = double.parse(inString);
  return inDouble;
}
