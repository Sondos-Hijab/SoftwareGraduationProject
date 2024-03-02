import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:software_grad_project/controller/app-main-pages-controllers/user-profile-realted-controllers/user_feedback_controller.dart';
import 'package:software_grad_project/core/constants/colors.dart';
import 'package:software_grad_project/data/datasource/static/static.dart';
import 'package:software_grad_project/view/widgets/business/feedback-view/main_feedback.dart';

class UserFeedbackPage extends StatelessWidget {
  const UserFeedbackPage({super.key});

  @override
  Widget build(BuildContext context) {
    Get.put(UserFeedbackControllerImp());
    return Scaffold(
        appBar: AppBar(
          centerTitle: true,
          backgroundColor: AppColors.appWhite,
          elevation: 0.0,
          title: Text(
            "User Feedback",
            style: Theme.of(context).textTheme.headlineSmall,
          ),
        ),
        body: GetBuilder<UserFeedbackControllerImp>(builder: (controller) {
          return ListView(
            children: [
              ...List.generate(
                feedbackData.length,
                (index) => MainFeedbackWidget(
                  userImage: feedbackData[index].userProfileImage,
                  username: feedbackData[index].username!,
                  feedbackImage: feedbackData[index].feedbackImage,
                  busineessName: feedbackData[index].businessName!,
                  customerServiceRating: feedbackData[index].customerService!,
                  valueOfMoneyRating: feedbackData[index].valueOfMoney!,
                  productQualityRating: feedbackData[index].productQuality!,
                  feedbackText: feedbackData[index].feedbackText!,
                ),
              ),
            ],
          );
        }));
  }
}
