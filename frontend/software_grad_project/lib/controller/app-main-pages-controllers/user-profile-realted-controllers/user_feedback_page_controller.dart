import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:software_grad_project/core/classes/status_request.dart';
import 'package:software_grad_project/core/constants/routes_names.dart';
import 'package:software_grad_project/core/functions/convert_data_to_file.dart';
import 'package:software_grad_project/core/functions/handling_data_function.dart';
import 'package:software_grad_project/core/services/service.dart';
import 'package:software_grad_project/data/datasource/remote/profile-page/user_feedback_datasource.dart';
import 'package:software_grad_project/data/model/fetched_feedback_model.dart';

abstract class UserFeedbackPageController extends GetxController {
  getUserFeedback(String username);
  deleteUserFeedback(int feedbackID);
  goToUserPage(String username);
}

class UserFeedbackPageControllerImp extends UserFeedbackPageController {
  final myServices = Get.find<MyServices>();
  String? username = "";

  UserFeedbackDataSource userFeedbackDataSource =
      UserFeedbackDataSource(Get.find());

  List<FetchedFeedbackModel>? userFeedback = [];

  @override
  void onInit() {
    username = Get.arguments['username'];
    getUserFeedback(username!);
    super.onInit();
  }

  @override
  void dispose() {
    super.dispose();
  }

  @override
  getUserFeedback(String username) async {
    StatusRequest? statusRequest = StatusRequest.loading;
    String? accessToken = myServices.sharedPreferences.getString("accessToken");

    var response = await userFeedbackDataSource.getFeedbackWithAuthorization(
        accessToken!, username);

    statusRequest = handlingData(response);

    if (StatusRequest.success == statusRequest) {
      if (response['statusCode'] == "200") {
        List<dynamic> feedback = response['feedback'];
        userFeedback = feedback.map((feed) {
          return FetchedFeedbackModel(
            feed['feedbackID'],
            feed['user_id'],
            feed['admin_id'],
            feed['businessName'],
            feed['userName'],
            feed['text'],
            convertDataToFile(feed['picture']),
            feed['rate1'].toDouble(),
            feed['rate2'].toDouble(),
            feed['rate3'].toDouble(),
            feed['created_at'],
            convertDataToFile(feed['userProfilePicture']),
          );
        }).toList();
        userFeedback!.sort((a, b) => DateTime.parse(b.createdAt!)
            .compareTo(DateTime.parse(a.createdAt!)));
      } else {
        Get.defaultDialog(
            title: "Error", middleText: "We are sorry, something went wrong");
      }
      update();
    }
  }

  @override
  deleteUserFeedback(int feedbackID) async {
    StatusRequest? statusRequest = StatusRequest.loading;
    String? accessToken = myServices.sharedPreferences.getString("accessToken");

    // Show confirmation dialog
    bool confirmDelete = await Get.defaultDialog(
      title: "Confirmation",
      middleText: "Are you sure you want to delete this feedback?",
      confirm: TextButton(
        onPressed: () => Get.back(result: true), // Return true if confirmed
        child: const Text('Yes'),
      ),
      cancel: TextButton(
        onPressed: () => Get.back(result: false), // Return false if canceled
        child: const Text('No'),
      ),
    );

    if (confirmDelete == true) {
      var response = await userFeedbackDataSource.deleteDataWithAuthorization(
          accessToken!, feedbackID);

      statusRequest = handlingData(response);

      if (StatusRequest.success == statusRequest) {
        if (response['statusCode'] == "200") {
          Get.defaultDialog(
              title: "Success!", middleText: "Feedback deleted successfully!");
          getUserFeedback(username!);
        } else {
          Get.defaultDialog(
              title: "Error", middleText: "We are sorry, something went wrong");
        }
        update();
      }
    }
  }

  @override
  goToUserPage(String username) {
    Get.back();
  }
}
