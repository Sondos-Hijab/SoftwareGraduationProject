import 'dart:convert';
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:image_picker/image_picker.dart';
import 'package:path_provider/path_provider.dart';
import 'package:software_grad_project/core/classes/status_request.dart';
import 'package:software_grad_project/core/constants/routes_names.dart';
import 'package:software_grad_project/core/functions/handling_data_function.dart';
import 'package:software_grad_project/core/services/service.dart';
import 'package:software_grad_project/data/datasource/remote/authentication/logout_datasource.dart';
import 'package:software_grad_project/data/datasource/remote/profile-page/bio_datasource.dart';
import 'package:software_grad_project/data/datasource/remote/profile-page/profile_image_datasource.dart';
import 'package:software_grad_project/data/datasource/remote/authentication/check_authentication_datasource.dart';

abstract class ProfilePageController extends GetxController {
  editMode();
  getBio();
  goToFeedbackPage();
  goToBusinessesPage();
  logout();
  goToChangePassword();
  Future uploadImage();
  getProfileImage();
  checkAuthentication();
}

class ProfilePageControllerImp extends ProfilePageController {
  bool isEditingBio = false;
  TextEditingController? bioController;
  File? selectedImage;
  final myServices = Get.find<MyServices>();

  String? accessToken;
  String? refreshToken;

  StatusRequest? statusRequest;
  LogoutDataSource logoutDataSource = LogoutDataSource(Get.find());
  BioDataSource bioDataSource = BioDataSource(Get.find());
  ProfileImageDataSource profileImageDataSource =
      ProfileImageDataSource(Get.find());

  CheckAuthenticationDataSource checkAuthenticationDataSource =
      CheckAuthenticationDataSource(Get.find());
  @override
  editMode() async {
    isEditingBio = !isEditingBio;
    if (isEditingBio == false) {
      statusRequest = StatusRequest.loading;
      var response = await bioDataSource.putDataWithAuthorization(
          bioController!.text, accessToken!);
      statusRequest = handlingData(response);

      if (StatusRequest.success == statusRequest) {
        if (response['statusCode'] == "200") {
          Get.defaultDialog(
              title: "Success", middleText: "Bio changed successfully!");
        } else if (response['statusCode'] == "403") {
          Get.defaultDialog(
              title: "Session expired",
              middleText:
                  "We are sorry, your session expired, you need to login again.");
          await myServices.sharedPreferences.remove('accessToken');
          await myServices.sharedPreferences.remove('refreshToken');
          Get.offAllNamed(AppRoutes.login);
        } else {
          Get.defaultDialog(
              title: "Error",
              middleText:
                  "We are sorry, something went wrong, try again later.");
        }
      }
    }
    update();
  }

  @override
  void onInit() {
    super.onInit();
    accessToken = myServices.sharedPreferences.getString("accessToken");
    refreshToken = myServices.sharedPreferences.getString("refreshToken");
    bioController = TextEditingController();
    getBio();
    getProfileImage();
  }

  @override
  void dispose() {
    bioController!.dispose();
    selectedImage!.delete();
    super.dispose();
  }

  @override
  getBio() async {
    statusRequest = StatusRequest.loading;
    var response =
        await bioDataSource.getDataWithOnlyAuthorization(accessToken!);
    statusRequest = handlingData(response);

    if (StatusRequest.success == statusRequest) {
      if (response['statusCode'] == "200") {
        if (response['Bio'] == null) {
          bioController!.text = "Press edit bio to add your bio here.";
        } else {
          bioController!.text = response['Bio'];
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
  getProfileImage() async {
    statusRequest = StatusRequest.loading;
    var response =
        await profileImageDataSource.getDataWithOnlyAuthorization(accessToken!);
    statusRequest = handlingData(response);

    if (StatusRequest.success == statusRequest) {
      if (response['statusCode'] == "200") {
        if (response['UserProfilePicture'] != null) {
          List<int> bytes = base64Decode(response['UserProfilePicture']);

          await myServices.sharedPreferences
              .setString("profileImage", response['UserProfilePicture']);

          // Get the directory for saving images (you may need to import 'package:path_provider/path_provider.dart')
          Directory appDocDir = await getApplicationDocumentsDirectory();
          String appDocPath = appDocDir.path;

          // Ensure that the directory exists, if not create it
          Directory directory = Directory('$appDocPath/images');

          if (!directory.existsSync()) {
            directory.createSync(recursive: true);
          }

          // Generate a unique filename for the image
          String fileName = 'user_image'; // No file extension

          // Construct the full file path
          String filePath = '${directory.path}/$fileName';

          // Remove existing image file if it exists
          if (await File(filePath).exists()) {
            await File(filePath).delete();
          }
          // Write the image data to the file
          await File(filePath).writeAsBytes(bytes);

          selectedImage = File(filePath);
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
  goToBusinessesPage() {
    Get.toNamed(AppRoutes.followedBusinessesPage);
  }

  @override
  goToFeedbackPage() {
    Get.toNamed(AppRoutes.userFeedbackPage);
  }

  @override
  goToChangePassword() {
    Get.toNamed(AppRoutes.changePassword);
  }

  @override
  logout() async {
    await removeProfileImage();

    statusRequest = StatusRequest.loading;
    var response = await logoutDataSource.deleteDataWithAuthorization(
        accessToken!, refreshToken!);
    statusRequest = handlingData(response);

    if (StatusRequest.success == statusRequest) {
      if (response['statusCode'] == "200") {
        await myServices.sharedPreferences.remove('accessToken');
        await myServices.sharedPreferences.remove('refreshToken');

        myServices.sharedPreferences.setString("step", "1");
        Get.offAllNamed(AppRoutes.login);
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
      statusRequest = StatusRequest.loading;

      var response = await profileImageDataSource.putPhotoDataWithAuthorization(
          selectedImage!, accessToken!);
      statusRequest = handlingData(response);

      if (StatusRequest.success == statusRequest) {
        if (response['statusCode'] == "200") {
          update();
          Get.defaultDialog(title: "Success", middleText: response['message']);
        } else if (response['statusCode'] == "400") {
          Get.defaultDialog(title: "Error", middleText: response['error']);
        } else {
          Get.defaultDialog(
              title: "Error",
              middleText:
                  "We are sorry, something went wrong, try again later.");
        }
      }
    }
  }

  // Function to remove the profile image file
  removeProfileImage() async {
    Directory appDocDir = await getApplicationDocumentsDirectory();
    String appDocPath = appDocDir.path;
    String filePath = '$appDocPath/images/user_image';

    // Check if the file exists
    if (await File(filePath).exists()) {
      // Delete the file
      await File(filePath).delete();
    }
  }

  @override
  checkAuthentication() async {
    statusRequest = StatusRequest.loading;
    accessToken = myServices.sharedPreferences.getString("accessToken");
    var response = await checkAuthenticationDataSource
        .getDataWithOnlyAuthorization(accessToken!);
    statusRequest = handlingData(response);

    if (StatusRequest.success == statusRequest) {
      if (response['statusCode'] == "200") {
        myServices.sharedPreferences.setBool("isLoggedIn", true);
      } else {
        myServices.sharedPreferences.setBool("isLoggedIn", false);
      }
    }
  }
}
