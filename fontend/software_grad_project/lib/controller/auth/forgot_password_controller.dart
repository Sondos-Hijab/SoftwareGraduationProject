import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:software_grad_project/core/constants/routesnames.dart';

abstract class ForgotPasswordController extends GetxController {
  checkEmailandGoToResetPassword();
}

class ForgotPasswordControllerImp extends ForgotPasswordController {
  late TextEditingController email;
  GlobalKey<FormState> formState = GlobalKey<FormState>();

  @override
  checkEmailandGoToResetPassword() {
    var formData = formState.currentState;
    if (formData!.validate()) {
      print("Valid");
      Get.offNamed(AppRoutes.resetPassword);
    } else {
      print("Not valid");
    }
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
