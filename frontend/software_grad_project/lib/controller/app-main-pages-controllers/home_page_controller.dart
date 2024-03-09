import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:software_grad_project/core/constants/routes_names.dart';
import 'package:software_grad_project/data/datasource/static/static.dart';
import 'package:software_grad_project/data/model/businesses_info_model.dart';

abstract class HomePageController extends GetxController {
  nextPageSlider();
  previousPageSlider();
  goToBusinessPage(String businessName);
}

class HomePageControllerImp extends HomePageController {
  late PageController pageController;

  late List<BusinessViewModel> businessesList;

  @override
  void onInit() {
    super.onInit();
    pageController = PageController(initialPage: 0);
    businessesList = businessViewList;
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
  goToBusinessPage(String businessName) {
    Get.toNamed(AppRoutes.businessPage, arguments: businessName);
  }
}
