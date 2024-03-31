import 'dart:typed_data';
import 'package:get/get.dart';
import 'package:software_grad_project/core/classes/status_request.dart';
import 'package:software_grad_project/core/constants/routes_names.dart';
import 'package:software_grad_project/core/functions/convert_data_to_file.dart';
import 'package:software_grad_project/core/functions/handling_data_function.dart';
import 'package:software_grad_project/core/services/service.dart';
import 'package:software_grad_project/data/datasource/remote/business-page/business_follow_datasource.dart';
import 'package:software_grad_project/data/model/following_model.dart';

abstract class OtherUserFollowedbusinessesPageController
    extends GetxController {
  goToBusinessPage(String businessName, Uint8List businessImage);
  getFollowing(String username);
}

class OtherUserFollowedbusinessesPageControllerImp
    extends OtherUserFollowedbusinessesPageController {
  //myServices to get accessToken
  final myServices = Get.find<MyServices>();

  //datasource
  BusinessFollowDataSource businessFollowDataSource =
      BusinessFollowDataSource(Get.find());

  //variables
  List<FollowingModel>? followingBusinesses = [];
  String? username;

  @override
  void onInit() {
    super.onInit();
    username = Get.arguments['username'];
    getFollowing(username!);
  }

  @override
  goToBusinessPage(String businessName, Uint8List businessImage) {
    Get.toNamed(
      AppRoutes.businessPage,
      arguments: {
        'businessName': businessName,
        'businessImage': businessImage,
      },
    );
  }

  @override
  getFollowing(String username) async {
    StatusRequest? statusRequest = StatusRequest.loading;
    String? accessToken = myServices.sharedPreferences.getString("accessToken");

    var response =
        await businessFollowDataSource.getFollowing(accessToken!, username);

    statusRequest = handlingData(response);
    if (StatusRequest.success == statusRequest) {
      if (response['statusCode'] == "200") {
        var following = response['followers'];

        followingBusinesses = following.map<FollowingModel>((following) {
          return FollowingModel(
            following['businessName'],
            convertDataToFile(following['picture']),
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
  void dispose() {
    super.dispose();
  }
}
