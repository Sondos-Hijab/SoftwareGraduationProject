import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:software_grad_project/core/constants/routes_names.dart';
import 'package:software_grad_project/core/services/service.dart';
import 'package:software_grad_project/data/datasource/static/static.dart';

abstract class OnBoardingController extends GetxController {
  next();
  onPageChanged(int index);
}

class OnBoardingControllerImp extends OnBoardingController {
  //controllers
  late PageController pageController;

  //myServices to get step
  MyServices myServices = Get.find();

  //variables
  int currentPage = 0;

  @override
  void onInit() {
    pageController = PageController();
    super.onInit();
  }

  @override
  onPageChanged(int index) {
    currentPage = index;
    update();
  }

  @override
  next() {
    currentPage++;
    if (currentPage >= onBoardingList.length) {
      myServices.sharedPreferences.setString("step", "1");
      Get.offNamed(AppRoutes.login);
    } else {
      pageController.animateToPage(currentPage,
          duration: const Duration(milliseconds: 800), curve: Curves.easeInOut);
    }
  }
}
