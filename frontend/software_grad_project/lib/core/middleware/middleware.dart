import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:software_grad_project/core/constants/routes_names.dart';
import 'package:software_grad_project/core/functions/date_check.dart';
import 'package:software_grad_project/core/services/service.dart';

class MyMiddleWare extends GetMiddleware {
  @override
  int? get priority => 1;

  MyServices myServices = Get.find();

  @override
  RouteSettings? redirect(String? route) {
    if (myServices.sharedPreferences.getString("step") == "2" &&
        !isDateExpired()) {
      return const RouteSettings(name: AppRoutes.homeScreen);
    } else if (myServices.sharedPreferences.getString("step") == "2" &&
        isDateExpired()) {
      return const RouteSettings(name: AppRoutes.login);
    } else if (myServices.sharedPreferences.getString("step") == "1") {
      return const RouteSettings(name: AppRoutes.login);
    }
    return null;
  }
}
