import 'dart:async';
import 'dart:typed_data';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:software_grad_project/core/classes/status_request.dart';
import 'package:software_grad_project/core/constants/routes_names.dart';
import 'package:software_grad_project/core/functions/convert_data_to_file.dart';
import 'package:software_grad_project/core/functions/extract_coordinates.dart';
import 'package:software_grad_project/core/functions/handling_data_function.dart';
import 'package:software_grad_project/core/services/service.dart';
import 'package:software_grad_project/data/datasource/remote/business-page/business_feedback_datasource.dart';
import 'package:software_grad_project/data/datasource/remote/business-page/business_follow_datasource.dart';
import 'package:software_grad_project/data/datasource/remote/business-page/business_info_datasource.dart';
import 'package:software_grad_project/data/datasource/remote/business-page/posts_datasource.dart';
import 'package:software_grad_project/data/model/business_info_model.dart';
import 'package:software_grad_project/data/model/fetched_feedback_model.dart';
import 'package:software_grad_project/data/model/fetched_post_model.dart';
import 'package:software_grad_project/data/model/followers_model.dart';

abstract class BusinessPagesController extends GetxController {
  getPosts(String businessName);
  getFeedback(String businessName);
  getBusinessInfo(String businessName);
  pressFollowUnfollow();
  goToAddFeedbackPage();
  goToUserPage(String username);
  follow();
  unfollow();
  getNumberOfFollowers(String businessName);
  getFollowers(String businessName);
  setFeedbackSortType(String sortType);
  setPostsSortType(String sortType);
  getAverageRates(String businessName, String rateType);
  filterFeedback();
  filterFeedbackBasedOnTone(String tone);
  resetFeedback();
}

class BusinessPagesControllerImp extends BusinessPagesController {
  //keys and controllers
  GlobalKey<ScaffoldState>? scaffoldKey;
  final Completer<GoogleMapController> gmController =
      Completer<GoogleMapController>();

  //myServices
  final myServices = Get.find<MyServices>();

  //datasources
  BusinessPostsDataSource businessPostsDatasource =
      BusinessPostsDataSource(Get.find());
  BusinessFeedbackDataSource businessFeedbackDatasource =
      BusinessFeedbackDataSource(Get.find());
  BusinessInfoDataSource businessInfoDatasource =
      BusinessInfoDataSource(Get.find());
  BusinessFollowDataSource businessFollowDataSource =
      BusinessFollowDataSource(Get.find());

  //variables
  bool isFollowing = false;
  int followersNumber = 0;
  String? businessName;
  Uint8List? businessImage;
  BusinessInfoModel? fetchedBusinessInfo =
      BusinessInfoModel(0, "", "", "", [], 0, "", "", null);
  List<FetchedPostModel>? businessesPosts = [];
  List<FetchedFeedbackModel>? businessFeedback = [];
  List<FetchedFeedbackModel>? allFeedback = [];
  List<FollowerModel>? businessFollowers = [];
  String? feedbackSortType = "Newest to oldest";
  String? feedbackFilterTone = "All Feedback";
  String? postsSortType = "Newest to oldest";
  double rate1 = 0.0;
  double rate2 = 0.0;
  double rate3 = 0.0;
  late TextEditingController search;

  @override
  void onInit() {
    scaffoldKey = GlobalKey();
    var arguments = Get.arguments;
    businessName = arguments['businessName'];
    businessImage = arguments['businessImage'];
    search = TextEditingController();
    getBusinessInfo(businessName!);
    getFollowers(businessName!);
    getAverageRates(businessName!, "rate1");
    getAverageRates(businessName!, "rate2");
    getAverageRates(businessName!, "rate3");

    super.onInit();
  }

  @override
  goToAddFeedbackPage() {
    Get.toNamed(AppRoutes.feedbackFormPage, arguments: {
      'businessName': businessName,
    });
  }

  @override
  setPostsSortType(String sortType) {
    postsSortType = sortType;
    if (postsSortType == "Newest to oldest") {
      businessesPosts!.sort((a, b) =>
          DateTime.parse(b.createdAt!).compareTo(DateTime.parse(a.createdAt!)));
    } else {
      businessesPosts!.sort((a, b) =>
          DateTime.parse(a.createdAt!).compareTo(DateTime.parse(b.createdAt!)));
    }
    update();
  }

  @override
  setFeedbackSortType(String sortType) {
    feedbackSortType = sortType;
    if (feedbackSortType == "Newest to oldest") {
      businessFeedback!.sort((a, b) =>
          DateTime.parse(b.createdAt!).compareTo(DateTime.parse(a.createdAt!)));
    } else {
      businessFeedback!.sort((a, b) =>
          DateTime.parse(a.createdAt!).compareTo(DateTime.parse(b.createdAt!)));
    }
    update();
  }

  @override
  getAverageRates(String businessName, String rateType) async {
    StatusRequest? statusRequest = StatusRequest.loading;
    String? accessToken = myServices.sharedPreferences.getString("accessToken");

    DateTime now = DateTime.now();
    String formattedDate = '${now.year}-${now.month}-${now.day}';

    var response = await businessInfoDatasource.getBusinessAverageRate(
        accessToken!, businessName, rateType, "2023-01-01", formattedDate);

    statusRequest = handlingData(response);
    if (StatusRequest.success == statusRequest) {
      if (response['statusCode'] == "200") {
        String inString = response['averageRate'].toStringAsFixed(2);
        double inDouble = double.parse(inString);
        if (rateType == "rate1") {
          rate1 = inDouble;
        } else if (rateType == "rate2") {
          rate2 = inDouble;
        } else {
          rate3 = inDouble;
        }
      } else {
        Get.defaultDialog(
            title: "Error", middleText: "We are sorry, something went wrong");
      }
      update();
    }
  }

  @override
  getPosts(String businessName) async {
    StatusRequest? statusRequest = StatusRequest.loading;
    String? accessToken = myServices.sharedPreferences.getString("accessToken");

    var response = await businessPostsDatasource.getDataWithAuthorization(
        accessToken!, businessName);

    statusRequest = handlingData(response);
    if (StatusRequest.success == statusRequest) {
      if (response['statusCode'] == "200") {
        List<dynamic> posts = response['posts'];

        businessesPosts = posts.map((post) {
          return FetchedPostModel(
            post['postID'],
            post['admin_id'],
            post['name'],
            post['description'],
            convertDataToFile(post['picture']),
            post['created_at'],
          );
        }).toList();
        if (feedbackSortType == "Newest to oldest") {
          businessesPosts!.sort((a, b) => DateTime.parse(b.createdAt!)
              .compareTo(DateTime.parse(a.createdAt!)));
        } else {
          businessesPosts!.sort((a, b) => DateTime.parse(a.createdAt!)
              .compareTo(DateTime.parse(b.createdAt!)));
        }
      } else {
        Get.defaultDialog(
            title: "Error", middleText: "We are sorry, something went wrong");
      }
      update();
    }
  }

  @override
  filterFeedbackBasedOnTone(String tone) async {
    feedbackFilterTone = tone;
    if (feedbackFilterTone == "All Feedback") {
      resetFeedback();
    } else {
      String tone = "";
      if (feedbackFilterTone == 'Positive Feedback') {
        tone = "Positive";
      } else if (feedbackFilterTone == 'Neutral Feedback') {
        tone = "Neutral";
      } else if (feedbackFilterTone == 'Negative Feedback') {
        tone = "Negative";
      }
      StatusRequest? statusRequest = StatusRequest.loading;
      String? accessToken =
          myServices.sharedPreferences.getString("accessToken");

      var response = await businessFeedbackDatasource.filterFeedbackBasedOnTone(
          accessToken!, businessName!, tone);
      statusRequest = handlingData(response);

      if (StatusRequest.success == statusRequest) {
        if (response['statusCode'] == "200") {
          List<dynamic> feedback = response['feedback'];
          businessFeedback = feedback.map((feed) {
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

          businessFeedback!.sort((a, b) => DateTime.parse(b.createdAt!)
              .compareTo(DateTime.parse(a.createdAt!)));
        } else {
          Get.defaultDialog(
              title: "Error", middleText: "We are sorry, something went wrong");
        }
        update();
      }
    }

    update();
  }

  @override
  resetFeedback() {
    businessFeedback = List.from(allFeedback!);
    if (feedbackSortType == "Newest to oldest") {
      businessFeedback!.sort((a, b) =>
          DateTime.parse(b.createdAt!).compareTo(DateTime.parse(a.createdAt!)));
    } else {
      businessFeedback!.sort((a, b) =>
          DateTime.parse(a.createdAt!).compareTo(DateTime.parse(b.createdAt!)));
    }
    update();
  }

  @override
  filterFeedback() async {
    StatusRequest? statusRequest = StatusRequest.loading;
    String? accessToken = myServices.sharedPreferences.getString("accessToken");

    var response = await businessFeedbackDatasource.filterFeedback(
        accessToken!, businessName!, search.text);
    statusRequest = handlingData(response);

    if (StatusRequest.success == statusRequest) {
      if (response['statusCode'] == "200") {
        List<dynamic> feedback = response['feedback'];
        businessFeedback = feedback.map((feed) {
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

        businessFeedback!.sort((a, b) => DateTime.parse(b.createdAt!)
            .compareTo(DateTime.parse(a.createdAt!)));
      } else {
        Get.defaultDialog(
            title: "Error", middleText: "We are sorry, something went wrong");
      }
      update();
    }
  }

  @override
  getFeedback(String businessName) async {
    StatusRequest? statusRequest = StatusRequest.loading;
    String? accessToken = myServices.sharedPreferences.getString("accessToken");

    var response = await businessFeedbackDatasource.getDataWithAuthorization(
        accessToken!, businessName);

    statusRequest = handlingData(response);
    if (StatusRequest.success == statusRequest) {
      if (response['statusCode'] == "200") {
        List<dynamic> feedback = response['feedback'];
        businessFeedback = feedback.map((feed) {
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

        allFeedback = List.from(businessFeedback!);
        businessFeedback!.sort((a, b) => DateTime.parse(b.createdAt!)
            .compareTo(DateTime.parse(a.createdAt!)));
      } else {
        Get.defaultDialog(
            title: "Error", middleText: "We are sorry, something went wrong");
      }
      update();
    }
  }

  @override
  getBusinessInfo(String businessName) async {
    StatusRequest? statusRequest = StatusRequest.loading;
    String? accessToken = myServices.sharedPreferences.getString("accessToken");

    var response = await businessInfoDatasource.getDataWithAuthorization(
        accessToken!, businessName);

    statusRequest = handlingData(response);
    if (StatusRequest.success == statusRequest) {
      if (response['statusCode'] == "200") {
        var info = response['business'];

        List<double> coordinates = extractCoordinates(info['location']);
        double lat = coordinates[0];
        double lng = coordinates[1];

        Marker marker = Marker(
          markerId: const MarkerId("1"),
          position: LatLng(lat, lng),
        );

        List<Marker> markers = [marker];

        fetchedBusinessInfo = BusinessInfoModel(
            info['adminID'],
            info['adminName'],
            info['email'],
            info['name'],
            markers,
            info['phoneNumber'],
            info['category'],
            info['description'],
            convertDataToFile(info['picture']));
      } else {
        Get.defaultDialog(
            title: "Error", middleText: "We are sorry, something went wrong");
      }
      update();
    }
  }

  @override
  goToUserPage(String username) {
    String? myUsername = myServices.sharedPreferences.getString("username");

    if (myUsername == username) {
      Get.offAndToNamed(AppRoutes.profilePage);
    } else {
      Get.offAndToNamed(AppRoutes.otherUserProfilePage,
          arguments: {'username': username});
    }
  }

  @override
  pressFollowUnfollow() {
    if (isFollowing == false) {
      //follow request
      follow();
    } else {
      // unfollow request
      unfollow();
    }
    update();
  }

  @override
  follow() async {
    StatusRequest? statusRequest = StatusRequest.loading;
    String? accessToken = myServices.sharedPreferences.getString("accessToken");
    var response =
        await businessFollowDataSource.follow(accessToken!, businessName!);

    statusRequest = handlingData(response);
    if (StatusRequest.success == statusRequest) {
      if (response['statusCode'] == "200") {
        isFollowing = true;
      } else {
        Get.defaultDialog(
            title: "Error", middleText: "We are sorry, something went wrong");
      }
      update();
    }
  }

  @override
  unfollow() async {
    StatusRequest? statusRequest = StatusRequest.loading;
    String? accessToken = myServices.sharedPreferences.getString("accessToken");
    var response =
        await businessFollowDataSource.unfollow(accessToken!, businessName!);

    statusRequest = handlingData(response);
    if (StatusRequest.success == statusRequest) {
      if (response['statusCode'] == "200") {
        isFollowing = false;
      } else {
        Get.defaultDialog(
            title: "Error", middleText: "We are sorry, something went wrong");
      }
      update();
    }
  }

  @override
  getNumberOfFollowers(String businessName) async {
    StatusRequest? statusRequest = StatusRequest.loading;
    String? accessToken = myServices.sharedPreferences.getString("accessToken");

    var response = await businessFollowDataSource.getFollowersNumber(
        accessToken!, businessName);

    statusRequest = handlingData(response);
    if (StatusRequest.success == statusRequest) {
      if (response['statusCode'] == "200") {
        followersNumber = response['followerCount'];
      } else {
        Get.defaultDialog(
            title: "Error", middleText: "We are sorry, something went wrong");
      }
      update();
    }
  }

  @override
  getFollowers(String businessName) async {
    StatusRequest? statusRequest = StatusRequest.loading;
    String? accessToken = myServices.sharedPreferences.getString("accessToken");

    var response =
        await businessFollowDataSource.getFollowers(accessToken!, businessName);

    statusRequest = handlingData(response);
    if (StatusRequest.success == statusRequest) {
      if (response['statusCode'] == "200") {
        var followers = response['followers'];

        businessFollowers = followers.map<FollowerModel>((follower) {
          return FollowerModel(
            follower['userName'],
            follower['user_id'],
            convertDataToFile(follower['picture']),
          );
        }).toList();
        String? myUsername = myServices.sharedPreferences.getString("username");
        isFollowing =
            isUsernameInBusinessFollowers(myUsername!, businessFollowers!);
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

bool isUsernameInBusinessFollowers(
    String username, List<FollowerModel> businessFollowers) {
  for (var follower in businessFollowers) {
    if (follower.followerName == username) {
      return true; // Username found
    }
  }
  return false; // Username not found
}
