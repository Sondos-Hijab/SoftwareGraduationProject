import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:software_grad_project/core/constants/routes_names.dart';

abstract class SearchPageController extends GetxController {
  late TextEditingController searchText;
  onSearch();
  checkSearch(value);
  goToBusinessPage();
}

class SearchPageControllerImp extends SearchPageController {
  bool? isSearch = false;
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
  goToBusinessPage() {
    Get.toNamed(AppRoutes.businessPage);
  }
}
