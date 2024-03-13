import 'package:get/get.dart';
import 'package:software_grad_project/core/services/service.dart';

DateTime getExpirationDate() {
  DateTime now = DateTime.now();
  return now.add(Duration(hours: 24));
}

bool isDateExpired() {
  MyServices myServices = Get.find();

  DateTime date =
      DateTime.parse(myServices.sharedPreferences.getString("expires")!);
      
  DateTime now = DateTime.now();
  return date.isBefore(now);
}
