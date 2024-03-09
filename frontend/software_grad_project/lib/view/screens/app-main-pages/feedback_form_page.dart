// ignore_for_file: avoid_print
import 'package:flutter/material.dart';
import 'package:software_grad_project/core/constants/colors.dart';
import 'package:software_grad_project/view/widgets/feedback-form/feedback_button.dart';
import 'package:software_grad_project/view/widgets/feedback-form/feedback_description.dart';
import 'package:software_grad_project/view/widgets/feedback-form/feedback_image.dart';
import 'package:software_grad_project/view/widgets/feedback-form/feedback_rating.dart';

class FeedbackFormPage extends StatelessWidget {
  const FeedbackFormPage({super.key});

  @override
  Widget build(BuildContext context) {
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
      body: ListView(
        children: [
          const SizedBox(
            height: 20,
          ),
          const FeedbackDescriptionTextArea(),
          Container(
            margin: const EdgeInsets.only(top: 20),
            child: const Column(
              children: [
                FeedbackRatingBar(title: "Customer Service:"),
                FeedbackRatingBar(title: "Value of Money:"),
                FeedbackRatingBar(title: "Quality:"),
              ],
            ),
          ),
          const FeedbackImageUploud(),
          const FeedbackFormButton()
        ],
      ),
    );
  }
}
