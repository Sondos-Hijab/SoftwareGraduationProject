import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:software_grad_project/core/classes/status_request.dart';
import 'package:software_grad_project/core/constants/routesnames.dart';
import 'package:software_grad_project/core/functions/handling_data_function.dart';
import 'package:software_grad_project/core/services/service.dart';
import 'package:software_grad_project/data/datasource/remote/authentication/login_datasource.dart';

abstract class LoginController extends GetxController {
  login();
  goToSignUp();
  goToForgotPassword();
}

class LoginControllerImp extends LoginController {
  late TextEditingController username;
  late TextEditingController password;

  late StatusRequest statusRequest;
  LoginDataSource loginData = LoginDataSource(Get.find());
  final myServices = Get.find<MyServices>();
  List data = [];

  bool showPassword = true;
  showPasswordFunction() {
    showPassword = (showPassword == true ? false : true);
    update();
  }

  GlobalKey<FormState> formState = GlobalKey<FormState>();

  @override
  login() async {
    if (formState.currentState!.validate()) {
      statusRequest = StatusRequest.loading;
      var response = await loginData.postData(username.text, password.text);
      statusRequest = handlingData(response);
      if (StatusRequest.success == statusRequest) {
        data.add(response);
        await myServices.sharedPreferences.setString("username", username.text);
        await myServices.sharedPreferences.setString("password", password.text);

        Get.offNamed(AppRoutes.homePage);
      } else if (StatusRequest.failure == statusRequest) {
        Get.defaultDialog(title: "Warning", middleText: "User not found");
      }
      update();
    }
  }

  @override
  goToSignUp() {
    Get.offNamed(AppRoutes.signup);
  }

  @override
  goToForgotPassword() {
    Get.toNamed(AppRoutes.forgotPassword);
  }

  @override
  void onInit() {
    username = TextEditingController();
    password = TextEditingController();
    super.onInit();
  }

  @override
  void dispose() {
    username.dispose();
    password.dispose();
    super.dispose();
  }
}
