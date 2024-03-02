import 'package:flutter/material.dart';
import 'package:software_grad_project/data/datasource/static/static.dart';
import 'package:software_grad_project/view/widgets/business/feedback-view/main_feedback.dart';

class BusinessFeedback extends StatelessWidget {
  const BusinessFeedback({super.key});

  @override
  Widget build(BuildContext context) {
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
  }
}
