import 'dart:typed_data';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:software_grad_project/core/classes/status_request.dart';
import 'package:software_grad_project/core/constants/routes_names.dart';
import 'package:software_grad_project/core/functions/handling_data_function.dart';
import 'package:software_grad_project/core/functions/convert_data_to_file.dart';
import 'package:software_grad_project/core/services/service.dart';
import 'package:software_grad_project/data/datasource/remote/business-page/business_datasource.dart';
import 'package:software_grad_project/data/model/businesses_name_image_model.dart';

abstract class HomePageController extends GetxController {
  nextPageSlider();
  previousPageSlider();
  goToBusinessPage(String businessName, Uint8List businessImage);
  getBusinessesByCategory(String category);
  setCatagory(String cat);
  getTotalNotificationsCount();
}

class HomePageControllerImp extends HomePageController {
  //controllers
  late PageController pageController;
  //myServices to get accessToken
  final myServices = Get.find<MyServices>();
  //datasource
  BusinessDataSource businessDatasource = BusinessDataSource(Get.find());
  //variables
  String? category;
  late List<BusinessViewModel>? businessesList = [];
  //request variables
  StatusRequest? statusRequest;

  @override
  void onInit() {
    super.onInit();
    pageController = PageController(initialPage: 0);
    category = "gym";
    getBusinessesByCategory(category!);
  }

  @override
  nextPageSlider() {
    pageController.nextPage(
        duration: const Duration(milliseconds: 300), curve: Curves.ease);
  }

  @override
  previousPageSlider() {
    pageController.previousPage(
        duration: const Duration(milliseconds: 300), curve: Curves.ease);
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
  setCatagory(String cat) {
    category = cat;
    getBusinessesByCategory(category!);
    update();
  }

  @override
  getBusinessesByCategory(String category) async {
    statusRequest = StatusRequest.loading;
    String? accessToken = myServices.sharedPreferences.getString("accessToken");

    var response =
        await businessDatasource.getDataWithParams(accessToken!, category);

    statusRequest = handlingData(response);

    if (StatusRequest.success == statusRequest) {
      if (response['statusCode'] == "200") {
        List<dynamic> businesses = response['businesses'];

        businessesList = businesses.map((business) {
          return BusinessViewModel(
            business['name'],
            convertDataToFile(business['picture']),
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

  @override
  getTotalNotificationsCount() {
    MyServices myServices = Get.find();
    return myServices.sharedPreferences.getInt("totalNotifications");
  }
}
