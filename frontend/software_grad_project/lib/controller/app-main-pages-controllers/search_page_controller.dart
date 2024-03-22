import 'dart:typed_data';

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:software_grad_project/core/classes/status_request.dart';
import 'package:software_grad_project/core/constants/routes_names.dart';
import 'package:software_grad_project/core/functions/convert_data_to_file.dart';
import 'package:software_grad_project/core/functions/handling_data_function.dart';
import 'package:software_grad_project/core/services/service.dart';
import 'package:software_grad_project/data/datasource/remote/business-page/business_datasource.dart';
import 'package:software_grad_project/data/model/businesses_info_model.dart';

abstract class SearchPageController extends GetxController {
  late TextEditingController searchText;
  onSearch();
  checkSearch(value);
  goToBusinessPage(String businessName, Uint8List businessImage);
}

class SearchPageControllerImp extends SearchPageController {
  bool? isSearch = false;

  late List<BusinessViewModel>? businessesList = [];
  StatusRequest? statusRequest;
  final myServices = Get.find<MyServices>();
  BusinessDataSource businessDatasource = BusinessDataSource(Get.find());

  @override
  void onInit() {
    searchText = TextEditingController();
    super.onInit();
  }

  @override
  void dispose() {
    searchText.dispose();
    super.dispose();
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
        print("200");

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
}
