import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:software_grad_project/controller/app-main-pages-controllers/home_page_controller.dart';
import 'package:software_grad_project/core/services/service.dart';
import 'package:software_grad_project/data/datasource/static/static.dart';
import 'package:software_grad_project/view/widgets/home-page/business-view/business_view.dart';
import 'package:software_grad_project/view/widgets/home-page/categories.dart';
import 'package:software_grad_project/view/widgets/home-page/header.dart';
import 'package:software_grad_project/view/widgets/home-page/slider.dart';

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    final myServices = Get.find<MyServices>();
    String? username = myServices.sharedPreferences.getString("username");

    Get.put(HomePageControllerImp());

    return Scaffold(
      body: SafeArea(
        child: GetBuilder<HomePageControllerImp>(builder: (controller) {
          return ListView(
            children: [
              const SizedBox(
                height: 40,
              ),
              HomePageHeader(
                  username: username, onPressedNotificationButton: () {}),

              HomePageSlider(
                sliderList: sliderList,
                pageController: controller.pageController,
                onPressedNext: () {
                  controller.nextPageSlider();
                },
                onPressedPrevious: () {
                  controller.previousPageSlider();
                },
              ),

              //categories
              const CategoriesButtons(),

              //business view depending on selected category
              ...List.generate(
                  businessViewList.length,
                  (index) => BusinessViewItem(
                        index: index,
                        onTap: () {
                          controller.goToBusinessPage();
                        },
                      )),
            ],
          );
        }),
      ),
    );
  }
}
