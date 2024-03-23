import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:software_grad_project/controller/app-main-pages-controllers/user-profile-realted-controllers/user_feedback_page_controller.dart';
import 'package:software_grad_project/core/constants/colors.dart';

class UserFeedbackPage extends StatelessWidget {
  const UserFeedbackPage({super.key});

  @override
  Widget build(BuildContext context) {
    Get.put(UserFeedbackPageControllerImp());
    return Scaffold(
        appBar: AppBar(
          centerTitle: true,
          backgroundColor: AppColors.appWhite,
          elevation: 0.0,
          title: Text(
            "My Feedback",
            style: Theme.of(context).textTheme.headlineSmall,
          ),
        ),
        body: GetBuilder<UserFeedbackPageControllerImp>(builder: (controller) {
          return ListView(
            children: const [
              // ...List.generate(
              //   feedbackData.length,
              //   (index) => MainFeedbackWidget(
              //     userImage: feedbackData[index].userProfileImage,
              //     username: feedbackData[index].username!,
              //     feedbackImage: feedbackData[index].feedbackImage,
              //     busineessName: feedbackData[index].businessName!,
              //     customerServiceRating: feedbackData[index].customerService!,
              //     valueOfMoneyRating: feedbackData[index].valueOfMoney!,
              //     productQualityRating: feedbackData[index].productQuality!,
              //     feedbackText: feedbackData[index].feedbackText!,
              //   ),
              // ),
            ],
          );
        }));
  }
}
