import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:software_grad_project/core/constants/routes_names.dart';
import 'package:software_grad_project/data/datasource/static/static.dart';
import 'package:software_grad_project/data/model/businesses_info_model.dart';

abstract class SearchPageController extends GetxController {
  late TextEditingController searchText;
  onSearch();
  checkSearch(value);
  goToBusinessPage(String businessName);
}

class SearchPageControllerImp extends SearchPageController {
  bool? isSearch = false;
  late List<BusinessViewModel> businessesList;

  @override
  void onInit() {
    searchText = TextEditingController();
    super.onInit();
    businessesList = businessViewList;
  }

  @override
  void dispose() {
    searchText.dispose();
    super.dispose();
  }

  @override
  onSearch() {
    isSearch = true;
    update();
  }

  @override
  checkSearch(value) {
    if (value == "") {
      isSearch = false;
    }
    update();
  }

  @override
  goToBusinessPage(String businessName) {
    Get.toNamed(AppRoutes.businessPage, arguments: businessName);
  }
}
