import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:software_grad_project/core/classes/status_request.dart';
import 'package:software_grad_project/core/constants/routesnames.dart';
import 'package:software_grad_project/core/functions/handling_data_function.dart';
import 'package:software_grad_project/data/datasource/remote/authentication/forgotPassword/reset_password_datasource.dart';

abstract class ResetPasswordController extends GetxController {
  resetPassword();
  goToSuccessPage();
}

class ResetPasswordControllerImp extends ResetPasswordController {
  late TextEditingController password;
  late TextEditingController confirmPassword;

  StatusRequest? statusRequest;
  ResetPasswordDataSource resetPasswordData =
      ResetPasswordDataSource(Get.find());
  List data = [];
  String? email;

  GlobalKey<FormState> formState = GlobalKey<FormState>();

  @override
  resetPassword() async {
    if (formState.currentState!.validate()) {
      statusRequest = StatusRequest.loading;
      var response = await resetPasswordData.postData(
          email!, password.text, confirmPassword.text);
      statusRequest = handlingData(response);
      if (StatusRequest.success == statusRequest) {
        data.add(response);
        Get.offNamed(AppRoutes.successPageAfterReset);
      } else if (StatusRequest.failure == statusRequest) {
        Get.defaultDialog(
            title: "Warning",
            middleText: "Can't reset password! Try Agian Later.");
      }
      update();
    } else {
      print("Not valid");
    }
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
  goToSuccessPage() {
    Get.offNamed(AppRoutes.successPageAfterReset);
  }

  @override
  void onInit() {
    email = Get.arguments['email'];
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
