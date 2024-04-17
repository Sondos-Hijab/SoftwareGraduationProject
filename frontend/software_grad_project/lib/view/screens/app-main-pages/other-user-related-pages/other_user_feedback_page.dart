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
              Container(
                margin: const EdgeInsets.only(
                    left: 20, right: 20, top: 10, bottom: 5),
                child: TextFormField(
                  controller: controller.search,
                  decoration: InputDecoration(
                    hintText: "Search",
                    hintStyle: const TextStyle(
                        fontSize: 14, color: AppColors.lightGrey),
                    floatingLabelBehavior: FloatingLabelBehavior.always,
                    contentPadding:
                        const EdgeInsets.symmetric(horizontal: 30, vertical: 5),
                    label: Container(
                      margin: const EdgeInsets.symmetric(horizontal: 10),
                      child: const Text(
                        "Enter a business name",
                        style: TextStyle(color: AppColors.lightGrey),
                      ),
                    ),
                    suffixIcon: InkWell(
                      onTap: () {
                        controller.filterFeedbackBasedOnBusinessName();
                      },
                      child: const Icon(Icons.search_rounded),
                    ),
                    suffixIconColor: AppColors.lightGrey,
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(5),
                    ),
                  ),
                ),
              ),
              Container(
                margin:
                    const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
                decoration: BoxDecoration(
                  border: Border.all(
                    color: AppColors.lightGrey,
                  ),
                  borderRadius: BorderRadius.circular(5),
                ),
                child: DropdownButton<String>(
                  padding: const EdgeInsets.symmetric(horizontal: 20),
                  value: controller.feedbackSortType,
                  onChanged: (String? value) {
                    controller.setFeedbackSortType(value!);
                  },
                  isExpanded: true, // Make the dropdown button full width
                  items: <String>['Newest to oldest', 'Oldest to newest']
                      .map((String value) {
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
              Container(
                margin: const EdgeInsets.only(left: 20, right: 20, bottom: 5),
                decoration: BoxDecoration(
                  border: Border.all(
                    color: AppColors.lightGrey,
                  ),
                  borderRadius: BorderRadius.circular(5),
                ),
                child: DropdownButton<String>(
                  padding: const EdgeInsets.symmetric(horizontal: 20),
                  value: controller.selectedCategory,
                  onChanged: (String? value) {
                    controller.setSelectedCategory(value!);
                  },
                  isExpanded: true,
                  items: <String>[
                    "All Feedback",
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
