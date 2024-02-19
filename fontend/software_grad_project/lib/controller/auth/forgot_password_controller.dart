import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:software_grad_project/core/constants/routesnames.dart';

abstract class ForgotPasswordController extends GetxController {
  checkEmail();
  goToResetPassword();
}

class ForgotPasswordControllerImp extends ForgotPasswordController {
  late TextEditingController email;
  @override
  checkEmail() {}
  @override
  goToResetPassword() {
    Get.offNamed(AppRoutes.resetPassword);
  }

  @override
  void onInit() {
    email = TextEditingController();

    super.onInit();
  }

  @override
  void dispose() {
    email.dispose();

    super.dispose();
  }
}
