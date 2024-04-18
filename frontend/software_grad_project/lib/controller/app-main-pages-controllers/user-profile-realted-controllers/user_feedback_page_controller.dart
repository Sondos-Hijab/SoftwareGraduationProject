import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:software_grad_project/core/classes/status_request.dart';
import 'package:software_grad_project/core/functions/convert_data_to_file.dart';
import 'package:software_grad_project/core/functions/handling_data_function.dart';
import 'package:software_grad_project/core/services/service.dart';
import 'package:software_grad_project/data/datasource/remote/profile-page/user_feedback_datasource.dart';
import 'package:software_grad_project/data/model/fetched_feedback_model.dart';

abstract class UserFeedbackPageController extends GetxController {
  getUserFeedback(String username);
  deleteUserFeedback(int feedbackID);
  goToUserPage(String username);
  setFeedbackSortType(String sortType);
  setSelectedCategory(String category);
  filterFeedbackBasedOnCategory(String category);
  filterFeedbackBasedOnBusinessName();
  resetFeedback();
}

class UserFeedbackPageControllerImp extends UserFeedbackPageController {
  //myServices to get accessToken
  final myServices = Get.find<MyServices>();

  //datasource
  UserFeedbackDataSource userFeedbackDataSource =
      UserFeedbackDataSource(Get.find());

  //variables
  List<FetchedFeedbackModel>? userFeedback = [];
  List<FetchedFeedbackModel>? allFeedback = [];
  String? username = "";
  String feedbackSortType = "Newest to oldest";
  String selectedCategory = "All Feedback";
  late TextEditingController search;

  @override
  void onInit() {
    username = Get.arguments['username'];
    getUserFeedback(username!);
    search = TextEditingController();
    super.onInit();
  }

  @override
  goToUserPage(String username) {
    Get.back();
  }

  @override
  resetFeedback() {
    userFeedback = List.from(allFeedback!);
    if (feedbackSortType == "Newest to oldest") {
      userFeedback!.sort((a, b) =>
          DateTime.parse(b.createdAt!).compareTo(DateTime.parse(a.createdAt!)));
    } else {
      userFeedback!.sort((a, b) =>
          DateTime.parse(a.createdAt!).compareTo(DateTime.parse(b.createdAt!)));
    }
    update();
  }

  @override
  setSelectedCategory(String category) {
    selectedCategory = category;
    if (selectedCategory == "All Feedback") {
      //show the full array
      getUserFeedback(username!);
    } else {
      //make a request and get the businesses from that category
      filterFeedbackBasedOnCategory(selectedCategory);
    }
    update();
  }

  @override
  setFeedbackSortType(String sortType) {
    feedbackSortType = sortType;
    if (feedbackSortType == "Newest to oldest") {
      userFeedback!.sort((a, b) =>
          DateTime.parse(b.createdAt!).compareTo(DateTime.parse(a.createdAt!)));
    } else {
      userFeedback!.sort((a, b) =>
          DateTime.parse(a.createdAt!).compareTo(DateTime.parse(b.createdAt!)));
    }
    update();
  }

  @override
  filterFeedbackBasedOnBusinessName() async {
    StatusRequest? statusRequest = StatusRequest.loading;
    String? accessToken = myServices.sharedPreferences.getString("accessToken");

    var response =
        await userFeedbackDataSource.filterFeedbackBasedOnBusinessName(
            accessToken!, search.text, username!);

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
  filterFeedbackBasedOnCategory(String category) async {
    StatusRequest? statusRequest = StatusRequest.loading;
    String? accessToken = myServices.sharedPreferences.getString("accessToken");

    var response = await userFeedbackDataSource.filterFeedbackBasedOnCategory(
        accessToken!, username!, category);

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

        allFeedback = List.from(userFeedback!);

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
  void dispose() {
    search.dispose();
    super.dispose();
  }
}
