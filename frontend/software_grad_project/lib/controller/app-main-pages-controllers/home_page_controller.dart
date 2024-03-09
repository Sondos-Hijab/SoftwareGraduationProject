import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:software_grad_project/core/constants/routes_names.dart';

abstract class HomePageController extends GetxController {
  nextPageSlider();
  previousPageSlider();
  goToBusinessPage();
}

class HomePageControllerImp extends HomePageController {
  late PageController pageController;

  @override
  void onInit() {
    super.onInit();
    pageController = PageController(initialPage: 0);
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
  goToBusinessPage() {
    Get.toNamed(AppRoutes.businessPage);
  }
}
