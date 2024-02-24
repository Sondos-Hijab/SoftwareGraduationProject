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
        if (response['statusCode'] == "200") {
          await myServices.sharedPreferences
              .setString("username", username.text);
          await myServices.sharedPreferences
              .setString("password", password.text);
          await myServices.sharedPreferences
              .setString("accessToken", response['accessToken']);
          await myServices.sharedPreferences
              .setString("refreshToken", response['refreshToken']);
          Get.offNamed(AppRoutes.homePage);
        } else if (response['statusCode'] == "404") {
          Get.defaultDialog(title: "Warning", middleText: response['error']);
        } else if (response['statusCode'] == "401") {
          Get.defaultDialog(title: "Warning", middleText: response['error']);
        } else {
          Get.defaultDialog(
              title: "Error",
              middleText:
                  "We are sorry, something went wrong, try again later.");
        }
      }
      update();
    } else {
      Get.defaultDialog(
          title: "Error",
          middleText: "We are sorry, something went wrong, try again later.");
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
