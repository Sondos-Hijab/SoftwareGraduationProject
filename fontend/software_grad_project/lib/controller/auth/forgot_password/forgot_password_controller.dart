import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:software_grad_project/core/classes/status_request.dart';
import 'package:software_grad_project/core/constants/routesnames.dart';
import 'package:software_grad_project/core/functions/handling_data_function.dart';
import 'package:software_grad_project/core/services/service.dart';
import 'package:software_grad_project/data/datasource/remote/authentication/forgotPassword/check_email_datasource.dart';

abstract class ForgotPasswordController extends GetxController {
  checkEmailandGoToVerifyCode();
}

class ForgotPasswordControllerImp extends ForgotPasswordController {
  CheckEmailDataSource checkEmailData = CheckEmailDataSource(Get.find());
  StatusRequest? statusRequest;

  late TextEditingController email;
  GlobalKey<FormState> formState = GlobalKey<FormState>();
  final myServices = Get.find<MyServices>();

  @override
  checkEmailandGoToVerifyCode() async {
    if (formState.currentState!.validate()) {
      statusRequest = StatusRequest.loading;
      var response = await checkEmailData.getData(email.text);
      statusRequest = handlingData(response);
      if (StatusRequest.success == statusRequest) {
        if (response['statusCode'] == "200") {
          await myServices.sharedPreferences
              .setString("tempAccessToken", response['tempAccessToken']);
          Get.offNamed(AppRoutes.verifyCode);
        } else if (response['statusCode'] == "404") {
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
