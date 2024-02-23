import 'dart:io';

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:software_grad_project/core/classes/status_request.dart';
import 'package:software_grad_project/core/constants/routesnames.dart';
import 'package:software_grad_project/core/functions/handling_data_function.dart';
import 'package:software_grad_project/data/datasource/remote/authentication/signup_datasource.dart';

abstract class SignUpController extends GetxController {
  signup();
  goToLogin();
}

class SignUpControllerImp extends SignUpController {
  late TextEditingController username;
  late TextEditingController password;
  late TextEditingController email;
  late TextEditingController confirmPassword;
  late StatusRequest statusRequest;
  SignUpDataSource signupData = SignUpDataSource(Get.find());

  List data = [];

  GlobalKey<FormState> formState = GlobalKey<FormState>();

  @override
  signup() async {
    if (formState.currentState!.validate()) {
      statusRequest = StatusRequest.loading;
      var response = await signupData.postData(
          username.text, email.text, password.text, confirmPassword.text);
      statusRequest = handlingData(response);

      if (StatusRequest.success == statusRequest) {
        if (response['status'] == "success") {
          data.add(response);
          Get.offNamed(AppRoutes.successPageAfterSignUp);
        } else {
          Get.defaultDialog(
              title: "Warning", middleText: "Email already exists");
        }
      }
      update();
    } else {}
  }

  bool showPassword = true;
  showPasswordFunction() {
    showPassword = (showPassword == true ? false : true);
    update();
  }

  bool showConfirmPassword = true;
  showConfirmPasswordFunction() {
    showConfirmPassword = (showConfirmPassword == true ? false : true);
    update();
  }

  @override
  goToLogin() {
    Get.offNamed(AppRoutes.login);
  }

  @override
  void onInit() {
    email = TextEditingController();
    password = TextEditingController();
    confirmPassword = TextEditingController();
    username = TextEditingController();
    super.onInit();
  }

  @override
  void dispose() {
    email.dispose();
    password.dispose();
    username.dispose();
    confirmPassword.dispose();
    super.dispose();
  }
}
