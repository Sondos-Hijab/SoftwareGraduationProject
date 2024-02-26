import 'package:flutter/material.dart';
import 'package:software_grad_project/core/constants/colors.dart';
import 'package:software_grad_project/view/widgets/home-page/feedback-view/ratingColumnFeedback.dart';

class FeedbackInfo extends StatelessWidget {
  final String busineessName;
  final String feedbackText;
  final int customerServiceRating;
  final int valueOfMoneyRating;
  final int productQualityRating;

  const FeedbackInfo(
      {super.key,
      required this.busineessName,
      required this.feedbackText,
      required this.customerServiceRating,
      required this.valueOfMoneyRating,
      required this.productQualityRating});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Row(children: [
          Text(
            "Feedback for: $busineessName",
            style: const TextStyle(color: AppColors.primaryDarkBlue),
          )
        ]),
        Container(
          padding: const EdgeInsets.symmetric(vertical: 5),
          child:
              Text(feedbackText, style: Theme.of(context).textTheme.bodySmall),
        ),
        Row(
          children: [
            RatingColumnFeedback(
                title: "Customer Service", rating: customerServiceRating),
            RatingColumnFeedback(
                title: "Value Of Money", rating: valueOfMoneyRating),
            RatingColumnFeedback(
                title: "Product Quality", rating: productQualityRating),
          ],
        )
      ],
    );
  }
}
