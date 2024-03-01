import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:software_grad_project/controller/app-main-pages-controllers/home_page_controller.dart';
import 'package:software_grad_project/core/constants/imagesassets.dart';
import 'package:software_grad_project/core/services/service.dart';
import 'package:software_grad_project/data/datasource/static/static.dart';
import 'package:software_grad_project/view/widgets/home-page/categories.dart';
import 'package:software_grad_project/view/widgets/home-page/feedback-view/main-feedback.dart';
import 'package:software_grad_project/view/widgets/home-page/header.dart';
import 'package:software_grad_project/view/widgets/home-page/slider.dart';

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    final List<Map<String, dynamic>> feedbackData = [
      {
        "userImage": "assets/images/profileImage.jpg",
        "username": "Sondos Hijab",
        "feedbackImage": "assets/images/feedbackImages/cafe.jpg",
        "busineessName": "Doe's Cafe",
        "customerServiceRating": 4,
        "valueOfMoneyRating": 3,
        "productQualityRating": 5,
        "feedbackText":
            "I had a wonderful experience at Doe's Cafe! The ambiance was cozy, the food was delicious, and the staff was very attentive. I especially loved their signature dish, it was simply divine. I highly recommend this place to anyone looking for a great dining experience."
      },
      {
        "userImage": "assets/images/profileImage.jpg",
        "username": "Sondos Hijab",
        "feedbackImage": "assets/images/feedbackImages/cafe.jpg",
        "busineessName": "Doe's Cafe",
        "customerServiceRating": 4,
        "valueOfMoneyRating": 3,
        "productQualityRating": 5,
        "feedbackText":
            "I had a wonderful experience at Doe's Cafe! The ambiance was cozy, the food was delicious, and the staff was very attentive. I especially loved their signature dish, it was simply divine. I highly recommend this place to anyone looking for a great dining experience."
      },
      {
        "userImage": "assets/images/profileImage.jpg",
        "username": "Sondos Hijab",
        "feedbackImage": "assets/images/feedbackImages/cafe.jpg",
        "busineessName": "Doe's Cafe",
        "customerServiceRating": 4,
        "valueOfMoneyRating": 3,
        "productQualityRating": 5,
        "feedbackText":
            "I had a wonderful experience at Doe's Cafe! The ambiance was cozy, the food was delicious, and the staff was very attentive. I especially loved their signature dish, it was simply divine. I highly recommend this place to anyone looking for a great dining experience."
      },
      // Add more feedback data here if needed
    ];

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

              //feedback

              const MainFeedbackWidget(
                userImage: AppImageAssets.profileImage,
                username: "Sondos Hijab",
                feedbackImage: "assets/images/feedbackImages/cafe.jpg",
                busineessName: "Doe's Cafe",
                customerServiceRating: 4,
                valueOfMoneyRating: 3,
                productQualityRating: 5,
                feedbackText:
                    "I had a wonderful experience at Doe's Cafe! The ambiance was cozy, the food was delicious, and the staff was very attentive. I especially loved their signature dish, it was simply divine. I highly recommend this place to anyone looking for a great dining experience.",
              ),
            ],
          );
        }),
      ),
    );
  }
}
