import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:software_grad_project/core/classes/status_request.dart';
import 'package:software_grad_project/core/constants/routes_names.dart';
import 'package:software_grad_project/core/functions/convert_data_to_file.dart';
import 'package:software_grad_project/core/functions/handling_data_function.dart';
import 'package:software_grad_project/core/services/service.dart';
import 'package:software_grad_project/data/datasource/remote/other-user-profile/other_user_info_datasource.dart';
import 'package:software_grad_project/data/model/fetched_feedback_model.dart';

abstract class OtherUserFeedbackPageController extends GetxController {
  getUserFeedback(String username);
  goToUserPage(String username);
  setFeedbackSortType(String sortType);
  setSelectedCategory(String category);
  filterFeedbackBasedOnCategory(String category);
  filterFeedbackBasedOnBusinessName();
  resetFeedback();
}

class OtherUserFeedbackPageControllerImp
    extends OtherUserFeedbackPageController {
  //myServices for getting accessToken
  final myServices = Get.find<MyServices>();
  //datasource
  OtherUserInfoDataSource otherUserInfoDataSource =
      OtherUserInfoDataSource(Get.find());
  //variables
  String? username = "";
  List<FetchedFeedbackModel>? userFeedback = [];
  List<FetchedFeedbackModel>? allFeedback = [];
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
  filterFeedbackBasedOnBusinessName() async {
    StatusRequest? statusRequest = StatusRequest.loading;
    String? accessToken = myServices.sharedPreferences.getString("accessToken");

    var response =
        await otherUserInfoDataSource.filterFeedbackBasedOnBusinessName(
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

    var response = await otherUserInfoDataSource.filterFeedbackBasedOnCategory(
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
  goToUserPage(String username) {
    Get.toNamed(AppRoutes.otherUserProfilePage,
        arguments: {'username': username});
  }

  @override
  getUserFeedback(String username) async {
    StatusRequest? statusRequest = StatusRequest.loading;
    String? accessToken = myServices.sharedPreferences.getString("accessToken");

    var response = await otherUserInfoDataSource.getFeedbackWithAuthorization(
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
  void dispose() {
    search.dispose();
    super.dispose();
  }
}
