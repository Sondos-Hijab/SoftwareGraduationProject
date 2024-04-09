import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:software_grad_project/core/classes/status_request.dart';
import 'package:software_grad_project/core/constants/routes_names.dart';
import 'package:software_grad_project/core/functions/date_check.dart';
import 'package:software_grad_project/core/functions/handling_data_function.dart';
import 'package:software_grad_project/core/services/service.dart';
import 'package:software_grad_project/data/datasource/remote/authentication/login_datasource.dart';

abstract class LoginController extends GetxController {
  login();
  goToSignUp();
  goToForgotPassword();
}

class LoginControllerImp extends LoginController {
  //key
  GlobalKey<FormState> formState = GlobalKey<FormState>();

  //myServices to get access Token
  final myServices = Get.find<MyServices>();

  //datasources
  LoginDataSource loginData = LoginDataSource(Get.find());

  //variables
  late TextEditingController username;
  late TextEditingController password;
  bool showPassword = true;

  //request variables
  late StatusRequest statusRequest;

  @override
  void onInit() {
    username = TextEditingController();
    password = TextEditingController();
    super.onInit();
  }

  @override
  goToSignUp() {
    Get.offNamed(AppRoutes.signup);
  }

  @override
  goToForgotPassword() {
    Get.toNamed(AppRoutes.forgotPassword);
  }

  showPasswordFunction() {
    showPassword = (showPassword == true ? false : true);
    update();
  }

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

          //will put step in shared preferences to 2 + adding the expiration date to shared preferences
          myServices.sharedPreferences.setString("step", "2");
          DateTime expirationDate = getExpirationDate();
          myServices.sharedPreferences
              .setString("expires", expirationDate.toString());

          Get.offAllNamed(AppRoutes.homeScreen);
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
    }
  }

  @override
  void dispose() {
    username.dispose();
    password.dispose();
    super.dispose();
  }
}
