import 'dart:typed_data';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:software_grad_project/core/classes/status_request.dart';
import 'package:software_grad_project/core/constants/routes_names.dart';
import 'package:software_grad_project/core/functions/convert_data_to_file.dart';
import 'package:software_grad_project/core/functions/handling_data_function.dart';
import 'package:software_grad_project/core/services/service.dart';
import 'package:software_grad_project/data/datasource/remote/business-page/business_datasource.dart';
import 'package:software_grad_project/data/model/businesses_name_image_model.dart';

abstract class SearchPageController extends GetxController {
  onSearch();
  checkSearch(value);
  goToBusinessPage(String businessName, Uint8List businessImage);
}

class SearchPageControllerImp extends SearchPageController {
  //myServices to get accessToken
  final myServices = Get.find<MyServices>();

  //datasource
  BusinessDataSource businessDatasource = BusinessDataSource(Get.find());

  //variables
  late TextEditingController searchText;
  bool? isSearch = false;
  late List<BusinessViewModel>? businessesList = [];

  //request variables
  StatusRequest? statusRequest;

  @override
  void onInit() {
    searchText = TextEditingController();
    super.onInit();
  }

  @override
  checkSearch(value) {
    if (value == "") {
      isSearch = false;
      businessesList = [];
    }
    update();
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
  onSearch() async {
    isSearch = true;

    if (searchText.text == "") {
      Get.defaultDialog(
          title: "Alert",
          middleText: "You should write a business name to search for");
      return;
    }

    statusRequest = StatusRequest.loading;
    String? accessToken = myServices.sharedPreferences.getString("accessToken");

    var response = await businessDatasource.searchDataWithParams(
        accessToken!, searchText.text);

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
      } else if (response['statusCode'] == "404") {
        Get.defaultDialog(title: "Error", middleText: response["error"]);
      } else {
        Get.defaultDialog(
            title: "Error", middleText: "We are sorry, something went wrong");
      }
      update();
    }
  }

  @override
  void dispose() {
    searchText.dispose();
    super.dispose();
  }
}
