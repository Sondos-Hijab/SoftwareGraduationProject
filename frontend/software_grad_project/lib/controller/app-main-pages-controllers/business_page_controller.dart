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
import 'package:software_grad_project/data/datasource/remote/business-page/business_info_datasource.dart';
import 'package:software_grad_project/data/datasource/remote/business-page/posts_datasource.dart';
import 'package:software_grad_project/data/model/business_info_model.dart';
import 'package:software_grad_project/data/model/fetched_feedback_model.dart';
import 'package:software_grad_project/data/model/fetched_post_model.dart';

abstract class BusinessPagesController extends GetxController {
  getPosts(String businessName);
  getFeedback(String businessName);
  getBusinessInfo(String businessName);
  pressFollowUnfollow();
  goToAddFeedbackPage();
}

class BusinessPagesControllerImp extends BusinessPagesController {
  GlobalKey<ScaffoldState>? scaffoldKey;
  bool isFollowing = false;

  String? businessName;
  Uint8List? businessImage;

  final myServices = Get.find<MyServices>();

  BusinessPostsDataSource businessPostsDatasource =
      BusinessPostsDataSource(Get.find());
  BusinessFeedbackDataSource businessFeedbackDatasource =
      BusinessFeedbackDataSource(Get.find());
  BusinessInfoDataSource businessInfoDatasource =
      BusinessInfoDataSource(Get.find());

  List<FetchedPostModel>? businessesPosts = [];
  List<FetchedFeedbackModel>? businessFeedback = [];
  BusinessInfoModel? fetchedBusinessInfo =
      BusinessInfoModel(0, "", "", "", [], 0, "", "", null);

  final Completer<GoogleMapController> gmController =
      Completer<GoogleMapController>();

  @override
  void onInit() {
    scaffoldKey = GlobalKey();
    var arguments = Get.arguments;
    businessName = arguments['businessName'];
    businessImage = arguments['businessImage'];
    getBusinessInfo(businessName!);
    getPosts(businessName!);
    getFeedback(businessName!);
    super.onInit();
  }

  @override
  void dispose() {
    super.dispose();
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
  pressFollowUnfollow() {
    isFollowing = !isFollowing;
    update();
  }

  @override
  goToAddFeedbackPage() {
    Get.toNamed(AppRoutes.feedbackFormPage, arguments: businessName);
  }
}
