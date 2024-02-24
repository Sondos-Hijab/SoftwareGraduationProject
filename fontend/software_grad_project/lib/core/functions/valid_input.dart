import 'package:get/get.dart';

validInput(String value, int min, int max, String type) {
  if (type == "username") {
    if (!GetUtils.isUsername(value)) {
      return "Not valid username";
    }
  }
  if (type == "email") {
    if (!GetUtils.isEmail(value)) {
      return "Not valid email";
    }
  }
  if (value.isEmpty) {
    return "Value couldn't be empty";
  }
  if (value.length < min) {
    return "Value couldn't be less than $min";
  }
  if (value.length > max) {
    return "Value couldn't be more than $max";
  }
}
