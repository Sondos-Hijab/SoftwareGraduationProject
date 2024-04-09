import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:software_grad_project/controller/app-main-pages-controllers/other-user-controllers/other_user_feedback_controller.dart';
import 'package:software_grad_project/core/constants/colors.dart';
import 'package:software_grad_project/view/widgets/business/feedback-view/main_feedback.dart';

class OtherUserFeedbackPage extends StatelessWidget {
  const OtherUserFeedbackPage({super.key});

  @override
  Widget build(BuildContext context) {
    Get.put(OtherUserFeedbackPageControllerImp());
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
        body: GetBuilder<OtherUserFeedbackPageControllerImp>(
            builder: (controller) {
          return ListView(
            children: [
              Row(
                children: [
                  Expanded(
                    child: RadioListTile<String>(
                      title: const Text(
                        'Oldest to newest',
                        style: TextStyle(fontSize: 11),
                      ),
                      value: "Oldest to newest",
                      groupValue: controller.feedbackSortType,
                      onChanged: (String? value) {
                        controller.setFeedbackSortType(value!);
                      },
                      controlAffinity: ListTileControlAffinity.leading,
                      activeColor: AppColors.primaryGreen,
                    ),
                  ),
                  Expanded(
                    child: RadioListTile<String>(
                      title: const Text(
                        'Newest to oldest',
                        style: TextStyle(fontSize: 11),
                      ),
                      value: 'Newest to oldest',
                      groupValue: controller.feedbackSortType,
                      onChanged: (String? value) {
                        controller.setFeedbackSortType(value!);
                      },
                      controlAffinity: ListTileControlAffinity.leading,
                      activeColor: AppColors.primaryGreen,
                    ),
                  ),
                ],
              ),
              Container(
                margin: const EdgeInsets.symmetric(horizontal: 30),
                decoration: BoxDecoration(
                  border: Border.all(
                    color: AppColors.lightGrey,
                  ),
                  borderRadius: BorderRadius.circular(10),
                ),
                child: DropdownButton<String>(
                  padding: const EdgeInsets.symmetric(horizontal: 20),
                  value: controller.selectedCategory,
                  onChanged: (String? value) {
                    controller.setSelectedCategory(value!);
                  },
                  isExpanded: true,
                  items: <String>[
                    "Choose a category",
                    "gym",
                    "beauty",
                    "clothes",
                    "devices",
                    "restaurants"
                  ].map((String value) {
                    return DropdownMenuItem<String>(
                      value: value,
                      child: Text(
                        value,
                        style: const TextStyle(
                            color: AppColors.grey, fontSize: 16),
                      ),
                    );
                  }).toList(),
                  underline: const SizedBox(),
                ),
              ),
              ...List.generate(
                controller.userFeedback!.length,
                (index) => MainFeedbackWidget(
                  me: false,
                  userImage: controller.userFeedback![index].userProfilePicture,
                  username: controller.userFeedback![index].userName!,
                  feedbackImage: controller.userFeedback![index].feedbackImage,
                  busineessName: controller.userFeedback![index].businessName!,
                  customerServiceRating:
                      controller.userFeedback![index].customeServiceRate!,
                  valueOfMoneyRating:
                      controller.userFeedback![index].valueOfMoneyRate!,
                  productQualityRating:
                      controller.userFeedback![index].productQualityRate!,
                  feedbackText: controller.userFeedback![index].description!,
                  createdAt: controller.userFeedback![index].createdAt!,
                  goToUserPage: controller.goToUserPage,
                ),
              ),
            ],
          );
        }));
  }
}
