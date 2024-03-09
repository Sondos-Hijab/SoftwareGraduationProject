import 'package:flutter/material.dart';
import 'package:software_grad_project/core/constants/colors.dart';

class FeedbackImageUploud extends StatelessWidget {
  const FeedbackImageUploud({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 200,
      margin: const EdgeInsets.only(bottom: 20, right: 20, left: 20),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: AppColors.lightGrey),
      ),
      child: InkWell(
          onTap: () {
            print("TAPPED");
          },
          child: Image.asset(
            "assets/images/upload.gif",
            fit: BoxFit.contain,
          )),
    );
  }
}
