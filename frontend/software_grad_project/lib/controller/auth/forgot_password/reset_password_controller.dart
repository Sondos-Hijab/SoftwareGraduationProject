import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:software_grad_project/core/classes/status_request.dart';
import 'package:software_grad_project/core/constants/routes_names.dart';
import 'package:software_grad_project/core/functions/handling_data_function.dart';
import 'package:software_grad_project/core/services/service.dart';
import 'package:software_grad_project/data/datasource/remote/authentication/forgotPassword/reset_password_datasource.dart';

abstract class ResetPasswordController extends GetxController {
  resetPassword();
}

class ResetPasswordControllerImp extends ResetPasswordController {
  //key
  GlobalKey<FormState> formState = GlobalKey<FormState>();

  // myServices to get acceessToken
  final myServices = Get.find<MyServices>();

  //variables
  late TextEditingController password;
  late TextEditingController confirmPassword;

  //request variables
  StatusRequest? statusRequest;

  //datasource
  ResetPasswordDataSource resetPasswordData =
      ResetPasswordDataSource(Get.find());

  @override
  void onInit() {
    password = TextEditingController();
    confirmPassword = TextEditingController();
    super.onInit();
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
  resetPassword() async {
    String? tempAccessToken =
        myServices.sharedPreferences.getString("tempAccessToken");

    if (formState.currentState!.validate()) {
      statusRequest = StatusRequest.loading;
      var response = await resetPasswordData.putDataWithAuthorization(
          tempAccessToken!, password.text, confirmPassword.text);
      statusRequest = handlingData(response);
      if (StatusRequest.success == statusRequest) {
        if (response['statusCode'] == "200") {
          await myServices.sharedPreferences.remove('tempAccessToken');
          Get.offNamed(AppRoutes.successPageAfterReset);
        } else if (response['statusCode'] == "403") {
          Get.defaultDialog(
              title: "Warning",
              middleText:
                  "The time specefied for you to reset your password is over.");
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

  @override
  void dispose() {
    password.dispose();
    confirmPassword.dispose();
    super.dispose();
  }
}
