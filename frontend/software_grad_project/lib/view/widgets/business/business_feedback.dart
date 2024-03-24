import 'package:flutter/material.dart';
import 'package:software_grad_project/data/model/fetched_feedback_model.dart';
import 'package:software_grad_project/view/widgets/business/feedback-view/main_feedback.dart';

class BusinessFeedback extends StatelessWidget {
  final List<FetchedFeedbackModel>? businessFeedback;
  final void Function(String username) goToUserPage;
  const BusinessFeedback(
      {super.key, required this.businessFeedback, required this.goToUserPage});

  @override
  Widget build(BuildContext context) {
    return ListView(
      children: [
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
