import 'dart:async';
import 'dart:io';
import 'dart:typed_data';

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:software_grad_project/core/classes/status_request.dart';
import 'package:software_grad_project/core/functions/handling_data_function.dart';
import 'package:software_grad_project/core/services/service.dart';
import 'package:software_grad_project/data/datasource/remote/business-page/posts_datasource.dart';
import 'package:software_grad_project/data/model/fetched_post_model.dart';

abstract class BusinessPagesController extends GetxController {
  getPosts(String businessName);
  pressFollowUnfollow();
}

class BusinessPagesControllerImp extends BusinessPagesController {
  GlobalKey<ScaffoldState>? scaffoldKey;
  bool isFollowing = false;

  File? businessImage;
  final Completer<GoogleMapController> gmController =
      Completer<GoogleMapController>();

  StatusRequest? statusRequest;

  final myServices = Get.find<MyServices>();

  BusinessPostsDataSource businessPostsDatasource =
      BusinessPostsDataSource(Get.find());

  List<FetchedPostModel>? businessesPosts = [];

  List<Marker> markers = [
    const Marker(
      markerId: MarkerId("1"),
      position: LatLng(37.42796133580664, -122.085749655962),
    ),
  ];
  final CameraPosition businessLocation = const CameraPosition(
    target: LatLng(37.42796133580664, -122.085749655962),
    zoom: 14.4746,
  );

  @override
  void onInit() {
    scaffoldKey = GlobalKey();
    final String businessName = Get.arguments;
    getPosts(businessName);
    super.onInit();
  }

  @override
  void dispose() {
    super.dispose();
  }

  @override
  getPosts(String businessName) async {
    statusRequest = StatusRequest.loading;
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
            _convertDataToFile(post['picture']),
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
  pressFollowUnfollow() {
    isFollowing = !isFollowing;
    update();
  }
}

Uint8List? _convertDataToFile(Map<String, dynamic>? pictureData) {
  if (pictureData != null && pictureData.containsKey('data')) {
    var data = pictureData['data'];
    if (data is List<dynamic>) {
      try {
        Uint8List bytes = Uint8List.fromList(data.cast<int>());
        // print(bytes);
        return bytes;
      } catch (e) {
        print("Error creating file: $e");
        return null;
      }
    } else {
      print('Error: Picture data is not a list of integers');
      return null;
    }
  }
  return null;
}
