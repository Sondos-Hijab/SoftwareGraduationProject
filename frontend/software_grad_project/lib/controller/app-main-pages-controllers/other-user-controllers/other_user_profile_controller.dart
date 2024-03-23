import 'dart:typed_data';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:software_grad_project/core/classes/status_request.dart';
import 'package:software_grad_project/core/constants/routes_names.dart';
import 'package:software_grad_project/core/functions/convert_data_to_file.dart';
import 'package:software_grad_project/core/functions/handling_data_function.dart';
import 'package:software_grad_project/core/services/service.dart';
import 'package:software_grad_project/data/datasource/remote/other-user-profile/other_user_info_datasource.dart';
import 'package:software_grad_project/data/model/other_user_info_model.dart';

abstract class OtherUserProfilePageController extends GetxController {
  goToFeedbackPage();
  goToBusinessesPage();
  getOtherUserInfo(String username);
}

class OtherUserProfilePageControllerImp extends OtherUserProfilePageController {
  final myServices = Get.find<MyServices>();
  Uint8List? otherUserProfileImage;
  TextEditingController? bioController;
  String? username;

  OtherUserInfoDataSource otherUserInfoDataSource =
      OtherUserInfoDataSource(Get.find());

  OtherUserInfoModel fetchedOtherUserInfo =
      OtherUserInfoModel(0, 0, "", "", null);

  @override
  void onInit() {
    bioController = TextEditingController();
    otherUserProfileImage = null;
    username = "sondoshijab";
    getOtherUserInfo(username!);
    super.onInit();
  }

  @override
  void dispose() {
    bioController?.dispose();
    super.dispose();
  }

  @override
  goToBusinessesPage() {}

  @override
  goToFeedbackPage() {
    Get.toNamed(AppRoutes.otherUserFeedbackPage,
        arguments: {'username': username!});
  }

  @override
  getOtherUserInfo(String username) async {
    StatusRequest? statusRequest = StatusRequest.loading;
    String? accessToken = myServices.sharedPreferences.getString("accessToken");

    var response = await otherUserInfoDataSource.getDataWithAuthorization(
        accessToken!, username);

    statusRequest = handlingData(response);
    if (StatusRequest.success == statusRequest) {
      if (response['statusCode'] == "200") {
        var info = response['userProfile'];

        fetchedOtherUserInfo = OtherUserInfoModel(
            info['userProfileID'],
            info['user_id'],
            info['name'],
            info['bio'],
            convertDataToFile(info['picture']));

        bioController!.text = fetchedOtherUserInfo.bio!;
        otherUserProfileImage = fetchedOtherUserInfo.picture!;
      } else {
        Get.defaultDialog(
            title: "Error", middleText: "We are sorry, something went wrong");
      }
      update();
    }
  }
}
