import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:software_grad_project/controller/app-main-pages-controllers/user-profile-realted-controllers/user_feedback_page_controller.dart';
import 'package:software_grad_project/core/constants/colors.dart';
import 'package:software_grad_project/view/widgets/business/feedback-view/main_feedback.dart';

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
            children: [
              ...List.generate(
                controller.userFeedback!.length,
                (index) => MainFeedbackWidget(
                    me: true,
                    userImage:
                        controller.userFeedback![index].userProfilePicture,
                    username: controller.userFeedback![index].userName!,
                    feedbackImage:
                        controller.userFeedback![index].feedbackImage,
                    busineessName:
                        controller.userFeedback![index].businessName!,
                    customerServiceRating:
                        controller.userFeedback![index].customeServiceRate!,
                    valueOfMoneyRating:
                        controller.userFeedback![index].valueOfMoneyRate!,
                    productQualityRating:
                        controller.userFeedback![index].productQualityRate!,
                    feedbackText: controller.userFeedback![index].description!,
                    createdAt: controller.userFeedback![index].createdAt!,
                    onDelete: () {
                      controller.deleteUserFeedback(
                          controller.userFeedback![index].feedbackID!);
                    },
                    goToUserPage: controller.goToUserPage),
              ),
            ],
          );
        }));
  }
}
