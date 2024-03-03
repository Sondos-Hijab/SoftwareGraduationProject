import 'package:flutter/material.dart';
import 'package:software_grad_project/core/constants/colors.dart';

class FeedbackFormButton extends StatelessWidget {
  const FeedbackFormButton({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.all(20),
      child: MaterialButton(
        padding: const EdgeInsets.symmetric(vertical: 12),
        shape: const RoundedRectangleBorder(
            borderRadius: BorderRadius.all(Radius.circular(20))),
        onPressed: () {},
        color: AppColors.primaryBlue,
        textColor: Colors.white,
        child: const Text(
          "Submit Feedback",
          style: TextStyle(fontSize: 16),
        ),
      ),
    );
  }
}
