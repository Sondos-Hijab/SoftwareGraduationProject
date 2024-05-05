import 'dart:typed_data';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:get/get_rx/get_rx.dart';
import 'package:software_grad_project/core/classes/status_request.dart';
import 'package:software_grad_project/core/constants/routes_names.dart';
import 'package:software_grad_project/core/functions/convert_data_to_file.dart';
import 'package:software_grad_project/core/functions/handling_data_function.dart';
import 'package:software_grad_project/core/services/service.dart';
import 'package:software_grad_project/data/datasource/remote/business-page/business_datasource.dart';
import 'package:software_grad_project/data/datasource/static/static.dart';
import 'package:software_grad_project/data/model/businesses_name_image_model.dart';

abstract class SearchPageController extends GetxController {
  onSearch();
  checkSearch(value);
  goToBusinessPage(String businessName, Uint8List businessImage);
  setSelectedCity(String city);
  setSelectedCountry(String country);
  setSelectedCategory(String category);
  setChosenCities(String country);
}

class SearchPageControllerImp extends SearchPageController {
  //myServices to get accessToken
  final myServices = Get.find<MyServices>();

  //datasource
  BusinessDataSource businessDatasource = BusinessDataSource(Get.find());

  //variables
  late TextEditingController searchText;
  RxBool isSearch = false.obs;
  RxList<BusinessViewModel>? businessesList = <BusinessViewModel>[].obs;
  RxString selectedCity = ''.obs;
  RxString selectedCountry = ''.obs;
  RxString selectedCategory = ''.obs;
  RxList<String> chosenCities = <String>[].obs;
  RxBool showFilter = false.obs;

  //request variables
  StatusRequest? statusRequest;

  @override
  void onInit() {
    searchText = TextEditingController();
    selectedCategory.value = 'gym';
    selectedCountry.value = 'Algeria';
    selectedCity.value = 'Algiers';
    chosenCities.value = cities[selectedCountry.value]!;
    super.onInit();
  }

  @override
  void checkSearch(value) {
    if (value == "") {
      isSearch.value = false;
      businessesList!.clear();
    }
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
  Future<void> onSearch() async {
    isSearch.value = true;

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

    if (statusRequest == StatusRequest.success) {
      if (response['statusCode'] == "200") {
        List<dynamic> businesses = response['businesses'];

        businessesList!.assignAll(businesses.map((business) {
          return BusinessViewModel(
            business['name'],
            convertDataToFile(business['picture']),
          );
        }));
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

  @override
  void setSelectedCategory(String category) {
    selectedCategory.value = category;
  }

  @override
  void setSelectedCity(String city) {
    selectedCity.value = city;
  }

  @override
  void setSelectedCountry(String country) {
    selectedCountry.value = country;
    // Update chosenCities with cities of the selected country
    chosenCities.assignAll(cities[country]!);

    // Select the first city as default
    selectedCity.value = chosenCities[0];
  }

  @override
  setChosenCities(String country) {
    chosenCities.assignAll(cities[country]!);
  }
}
