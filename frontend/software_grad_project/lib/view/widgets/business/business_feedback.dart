import 'package:flutter/material.dart';
import 'package:software_grad_project/core/constants/colors.dart';
import 'package:software_grad_project/data/model/fetched_feedback_model.dart';
import 'package:software_grad_project/view/widgets/business/feedback-view/main_feedback.dart';

class BusinessFeedback extends StatelessWidget {
  final List<FetchedFeedbackModel>? businessFeedback;
  final void Function(String username) goToUserPage;
  final void Function(String sortType) setFeedbackSortType;
  final String selectedFeedbackSortType;
  const BusinessFeedback(
      {super.key,
      required this.businessFeedback,
      required this.goToUserPage,
      required this.setFeedbackSortType,
      required this.selectedFeedbackSortType});

  @override
  Widget build(BuildContext context) {
    return ListView(
      children: [
        Row(
          children: [
            Expanded(
              child: RadioListTile<String>(
                title: const Text(
                  'Oldest to newest',
                  style: TextStyle(fontSize: 11), // Adjust font size here
                ),
                value: "Oldest to newest",
                groupValue: selectedFeedbackSortType,
                onChanged: (String? value) {
                  setFeedbackSortType(value!);
                },
                controlAffinity: ListTileControlAffinity.leading,
                activeColor: AppColors.primaryGreen,
              ),
            ),
            Expanded(
              child: RadioListTile<String>(
                title: const Text(
                  'Newest to oldest',
                  style: TextStyle(fontSize: 11), // Adjust font size here
                ),
                value: 'Newest to oldest',
                groupValue: selectedFeedbackSortType,
                onChanged: (String? value) {
                  setFeedbackSortType(value!);
                },
                controlAffinity: ListTileControlAffinity.leading,
                activeColor: AppColors.primaryGreen,
              ),
            ),
          ],
        ),
        ...List.generate(
          businessFeedback!.length,
          (index) => MainFeedbackWidget(
            me: false,
            userImage: businessFeedback![index].userProfilePicture,
            username: businessFeedback![index].userName!,
            feedbackImage: businessFeedback![index].feedbackImage,
            busineessName: businessFeedback![index].businessName!,
            customerServiceRating: businessFeedback![index].customeServiceRate!,
            valueOfMoneyRating: businessFeedback![index].valueOfMoneyRate!,
            productQualityRating: businessFeedback![index].productQualityRate!,
            feedbackText: businessFeedback![index].description!,
            createdAt: businessFeedback![index].createdAt!,
            goToUserPage: goToUserPage,
          ),
        ),
      ],
    );
  }
}
