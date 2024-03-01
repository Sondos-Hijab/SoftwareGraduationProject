import 'package:flutter/material.dart';
import 'package:software_grad_project/view/widgets/home-page/feedback-view/feedback-image.dart';
import 'package:software_grad_project/view/widgets/home-page/feedback-view/feedback-info.dart';
import 'package:software_grad_project/view/widgets/home-page/feedback-view/userinfo.dart';

class MainFeedbackWidget extends StatelessWidget {
  final String userImage;
  final String username;
  final String feedbackImage;
  final String busineessName;
  final String feedbackText;
  final int customerServiceRating;
  final int valueOfMoneyRating;
  final int productQualityRating;

  const MainFeedbackWidget(
      {super.key,
      required this.userImage,
      required this.username,
      required this.feedbackImage,
      required this.busineessName,
      required this.customerServiceRating,
      required this.valueOfMoneyRating,
      required this.productQualityRating,
      required this.feedbackText});

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(8.0),
        border: Border.all(
          color: Colors.white,
          width: 1.0,
        ),
        boxShadow: [
          BoxShadow(
            color: Colors.grey.withOpacity(0.1),
            spreadRadius: 1,
            blurRadius: 4,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      margin: const EdgeInsets.only(top: 10, left: 20, right: 20),
      child: Container(
        margin: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            UserInfo(userImage: userImage, username: username),
            FeedbackImage(feedbackImage: feedbackImage),
            FeedbackInfo(
                busineessName: busineessName,
                feedbackText: feedbackText,
                customerServiceRating: customerServiceRating,
                valueOfMoneyRating: valueOfMoneyRating,
                productQualityRating: productQualityRating)
          ],
        ),
      ),
    );
  }
}
