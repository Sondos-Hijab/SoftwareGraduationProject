import 'package:flutter/material.dart';
import 'package:software_grad_project/core/constants/colors.dart';

class FeedbackDescriptionTextArea extends StatelessWidget {
  final TextEditingController feedbackTextEditingController;

  const FeedbackDescriptionTextArea(
      {super.key, required this.feedbackTextEditingController});

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(top: 20, right: 20, left: 20),
      child: TextFormField(
        maxLines: 5,
        // validator: valid,
        controller: feedbackTextEditingController,
        decoration: InputDecoration(
          hintText: "Write your feedback here",
          hintStyle: const TextStyle(fontSize: 16, color: AppColors.lightGrey),
          floatingLabelBehavior: FloatingLabelBehavior.always,
          contentPadding:
              const EdgeInsets.symmetric(horizontal: 30, vertical: 5),
          label: Container(
            margin: const EdgeInsets.symmetric(horizontal: 10),
            child: const Text(
              "Feeback description",
              style: TextStyle(color: AppColors.lightGrey, fontSize: 16),
            ),
          ),
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(20),
          ),
        ),
      ),
    );
  }
}
