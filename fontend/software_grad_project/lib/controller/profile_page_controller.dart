import 'dart:io';

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:image_picker/image_picker.dart';
import 'package:software_grad_project/core/classes/status_request.dart';
import 'package:software_grad_project/core/constants/routesnames.dart';
import 'package:software_grad_project/core/functions/handling_data_function.dart';
import 'package:software_grad_project/core/services/service.dart';
import 'package:software_grad_project/data/datasource/remote/authentication/logout_datasource.dart';

abstract class ProfilePageController extends GetxController {
  editMode();
  getBio();
  goToFeedbackPage();
  goToBusinessesPage();
  logout();
  goToChangePassword();
  Future uploadImage();
}

class ProfilePageControllerImp extends ProfilePageController {
  bool isEditingBio = false;
  TextEditingController? bioController;
  File? selectedImage;
  final myServices = Get.find<MyServices>();

  StatusRequest? statusRequest;
  LogoutDataSource logoutDataSource = LogoutDataSource(Get.find());
  @override
  editMode() {
    isEditingBio = !isEditingBio;
    if (isEditingBio == false) {
      //i should make a post request here to edit the bio in the databse for this user
    }
    update();
  }

  @override
  void onInit() {
    bioController = TextEditingController();
    getBio();
    super.onInit();
  }

  @override
  void dispose() {
    bioController!.dispose();
    super.dispose();
  }

  @override
  getBio() {
    //here i should make a get request to get the bio for this user from databse
    bioController!.text =
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
  }

  @override
  goToBusinessesPage() {}

  @override
  goToFeedbackPage() {}

  @override
  goToChangePassword() {
    Get.toNamed(AppRoutes.changePassword);
  }

  @override
  logout() async {
    String? accessToken = myServices.sharedPreferences.getString("accessToken");
    String? refreshToken =
        myServices.sharedPreferences.getString("refreshToken");

    statusRequest = StatusRequest.loading;
    var response = await logoutDataSource.deleteDataWithAuthorization(
        accessToken!, refreshToken!);
    statusRequest = handlingData(response);

    if (StatusRequest.success == statusRequest) {
      if (response['statusCode'] == "200") {
        await myServices.sharedPreferences.remove('tempAccessToken');
        Get.offNamed(AppRoutes.login);
      } else {
        Get.defaultDialog(
            title: "Error",
            middleText: "We are sorry, something went wrong, try again later.");
      }
      update();
    }
  }

  @override
  Future uploadImage() async {
    final pickedImage =
        await ImagePicker().pickImage(source: ImageSource.gallery);
    if (pickedImage != null) {
      selectedImage = File(pickedImage.path);
      update(); // Trigger UI update to reflect the new image
    }
  }
}
