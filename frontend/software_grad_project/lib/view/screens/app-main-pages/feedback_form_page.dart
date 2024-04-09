// ignore_for_file: avoid_print
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:software_grad_project/controller/app-main-pages-controllers/user-profile-realted-controllers/user_feedback_controller.dart';
import 'package:software_grad_project/core/constants/colors.dart';
import 'package:software_grad_project/view/widgets/feedback-form/feedback_button.dart';
import 'package:software_grad_project/view/widgets/feedback-form/feedback_description.dart';
import 'package:software_grad_project/view/widgets/feedback-form/feedback_image.dart';
import 'package:software_grad_project/view/widgets/feedback-form/feedback_rating.dart';

class FeedbackFormPage extends StatelessWidget {
  const FeedbackFormPage({super.key});

  @override
  Widget build(BuildContext context) {
    Get.put(UserFeedbackControllerImp());

    return Scaffold(
      appBar: AppBar(
        centerTitle: true,
        backgroundColor: AppColors.appWhite,
        elevation: 0.0,
        title: Text(
          'Feedback Form',
          style: Theme.of(context).textTheme.headlineSmall,
        ),
      ),
      body: GetBuilder<UserFeedbackControllerImp>(builder: (controller) {
        return ListView(
          children: [
            const SizedBox(
              height: 20,
            ),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20),
              child: Text(
                "Write a feedback for ${controller.businessName}",
                textAlign: TextAlign.center,
                style: const TextStyle(
                    color: AppColors.primaryDarkBlue, fontSize: 18),
              ),
            ),
            FeedbackDescriptionTextArea(
              feedbackTextEditingController:
                  controller.feedbackTextEditingController,
            ),
            Container(
              margin: const EdgeInsets.only(top: 20),
              child: Column(
                children: [
                  FeedbackRatingBar(
                    title: "Customer Service:",
                    updateRate: controller.updateCustomerServiceRate,
                  ),
                  FeedbackRatingBar(
                    title: "Value of Money:",
                    updateRate: controller.updateValueOfMoneyRate,
                  ),
                  FeedbackRatingBar(
                    title: "Quality:",
                    updateRate: controller.updateProductQualityRate,
                  ),
                ],
              ),
            ),
            FeedbackImageUploud(
              selectedImage: controller.selectedImage,
              onTap: () {
                controller.uploadImage();
              },
            ),
            FeedbackFormButton(
              onPressed: () {
                controller.handleSubmitFeedback();
              },
            )
          ],
        );
      }),
    );
  }
}
