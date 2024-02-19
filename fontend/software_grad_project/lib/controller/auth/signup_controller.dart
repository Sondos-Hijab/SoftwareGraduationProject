import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:software_grad_project/core/constants/routesnames.dart';

abstract class SignUpController extends GetxController {
  signup();
  goToLogin();
}

class SignUpControllerImp extends SignUpController {
  late TextEditingController username;
  late TextEditingController password;
  late TextEditingController email;
  late TextEditingController confirmPassword;

  GlobalKey<FormState> formState = GlobalKey<FormState>();

  @override
  signup() {
    var formData = formState.currentState;
    if (formData!.validate()) {
      print("Valid");
      Get.offNamed(AppRoutes.successPageAfterSignUp);
    } else {
      print("Not valid");
    }
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
