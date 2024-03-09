import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:software_grad_project/core/classes/status_request.dart';
import 'package:software_grad_project/core/constants/routes_names.dart';
import 'package:software_grad_project/core/functions/handling_data_function.dart';
import 'package:software_grad_project/core/services/service.dart';
import 'package:software_grad_project/data/datasource/remote/authentication/forgotPassword/reset_password_datasource.dart';

abstract class ChangePasswordController extends GetxController {
  resetPassword();
}

class ChangePasswordControllerImp extends ChangePasswordController {
  late TextEditingController password;
  late TextEditingController confirmPassword;

  StatusRequest? statusRequest;
  ResetPasswordDataSource resetPasswordData =
      ResetPasswordDataSource(Get.find());

  final myServices = Get.find<MyServices>();

  GlobalKey<FormState> formState = GlobalKey<FormState>();

  @override
  resetPassword() async {
    String? accessToken = myServices.sharedPreferences.getString("accessToken");

    if (formState.currentState!.validate()) {
      statusRequest = StatusRequest.loading;
      var response = await resetPasswordData.putDataWithAuthorization(
          accessToken!, password.text, confirmPassword.text);
      statusRequest = handlingData(response);
      if (StatusRequest.success == statusRequest) {
        if (response['statusCode'] == "200") {
          Get.offNamed(AppRoutes.successAfterChangePassword);
        } else if (response['statusCode'] == "400") {
          Get.defaultDialog(title: "Warning", middleText: response['error']);
        } else {
          Get.defaultDialog(
              title: "Error",
              middleText:
                  "We are sorry, something went wrong, try again later.");
        }
        update();
      }
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
