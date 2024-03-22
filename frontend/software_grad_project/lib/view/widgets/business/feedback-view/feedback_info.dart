import 'package:flutter/material.dart';
import 'package:software_grad_project/core/constants/colors.dart';
import 'package:software_grad_project/core/functions/format_number_created_at.dart';
import 'package:software_grad_project/view/widgets/business/feedback-view/rating_column_feedback.dart';

class FeedbackInfo extends StatelessWidget {
  final String busineessName;
  final String feedbackText;
  final double customerServiceRating;
  final double valueOfMoneyRating;
  final double productQualityRating;
  final String? createdAt;

  const FeedbackInfo(
      {super.key,
      required this.busineessName,
      required this.feedbackText,
      required this.customerServiceRating,
      required this.valueOfMoneyRating,
      required this.productQualityRating,
      required this.createdAt});

  @override
  Widget build(BuildContext context) {
    DateTime dateTime = DateTime.parse(createdAt!);
    String date =
        '${dateTime.year}-${formatNumber(dateTime.month)}-${formatNumber(dateTime.day)}';
    String time =
        '${formatNumber(dateTime.hour)}:${formatNumber(dateTime.minute)}:${formatNumber(dateTime.second)}';
    return Column(
      children: [
        Row(children: [
          Text(
            "Feedback for: $busineessName",
            style: const TextStyle(color: AppColors.primaryDarkBlue),
          ),
        ]),
        const SizedBox(
          height: 5,
        ),
        Row(children: [
          Text(feedbackText,
              textAlign: TextAlign.right,
              style: Theme.of(context).textTheme.bodySmall),
        ]),
        const SizedBox(
          height: 5,
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
        ),
        const SizedBox(
          height: 10,
        ),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text('Date: $date', style: Theme.of(context).textTheme.bodySmall),
            Text('Time: $time', style: Theme.of(context).textTheme.bodySmall),
          ],
        ),
      ],
    );
  }
}
