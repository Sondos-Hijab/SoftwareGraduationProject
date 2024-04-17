import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:software_grad_project/core/classes/status_request.dart';
import 'package:software_grad_project/core/constants/routes_names.dart';
import 'package:software_grad_project/core/functions/handling_data_function.dart';
import 'package:software_grad_project/data/datasource/remote/authentication/signup_datasource.dart';

abstract class SignUpController extends GetxController {
  signup();
  goToLogin();
  setSelectedGender(String gender);
}

class SignUpControllerImp extends SignUpController {
  //key
  GlobalKey<FormState> formState = GlobalKey<FormState>();

  //datasource
  SignUpDataSource signupData = SignUpDataSource(Get.find());

  //variables
  late TextEditingController username;
  late TextEditingController password;
  late TextEditingController email;
  late TextEditingController confirmPassword;
  late TextEditingController age;
  late StatusRequest statusRequest;
  String? selectedGender;
  List data = [];
  bool showPassword = true;
  bool showConfirmPassword = true;

  @override
  void onInit() {
    email = TextEditingController();
    password = TextEditingController();
    confirmPassword = TextEditingController();
    username = TextEditingController();
    age = TextEditingController();
    selectedGender = "Male";
    super.onInit();
  }

  @override
  setSelectedGender(String gender) {
    selectedGender = gender;
    update();
  }

  showPasswordFunction() {
    showPassword = (showPassword == true ? false : true);
    update();
  }

  showConfirmPasswordFunction() {
    showConfirmPassword = (showConfirmPassword == true ? false : true);
    update();
  }

  @override
  goToLogin() {
    Get.offNamed(AppRoutes.login);
  }

  @override
  signup() async {
    if (formState.currentState!.validate()) {
      statusRequest = StatusRequest.loading;
      var response = await signupData.postData(
          username.text,
          email.text,
          password.text,
          confirmPassword.text,
          int.parse(age.text),
          selectedGender == "Male" ? 0 : 1);

      statusRequest = handlingData(response);
      if (StatusRequest.success == statusRequest) {
        if (response['statusCode'] == "201") {
          data.add(response);
          Get.offNamed(AppRoutes.successPageAfterSignUp);
        } else if (response['statusCode'] == "409") {
          Get.defaultDialog(title: "Warning", middleText: response['error']);
        } else if (response['statusCode'] == "400") {
          Get.defaultDialog(title: "Warning", middleText: response['error']);
        }
      } else {
        Get.defaultDialog(
            title: "Error",
            middleText: "We are sorry, something went wrong, try again later.");
      }

      update();
    }
  }

  @override
  void dispose() {
    email.dispose();
    password.dispose();
    username.dispose();
    confirmPassword.dispose();
    age.dispose();
    super.dispose();
  }
}
