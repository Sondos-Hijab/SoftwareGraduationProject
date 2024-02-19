import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:software_grad_project/core/constants/routesnames.dart';

abstract class ResetPasswordController extends GetxController {
  resetPassword();
  goToSuccessPage();
}

class ResetPasswordControllerImp extends ResetPasswordController {
  late TextEditingController password;

  late TextEditingController confirmPassword;

  @override
  resetPassword() {}

  @override
  goToSuccessPage() {
    Get.offNamed(AppRoutes.successPageAfterReset);
  }

  @override
  void onInit() {
    password = TextEditingController();
    confirmPassword = TextEditingController();
    super.onInit();
  }

  @override
  void dispose() {
    password.dispose();
    confirmPassword.dispose();
    super.dispose();
  }
}
