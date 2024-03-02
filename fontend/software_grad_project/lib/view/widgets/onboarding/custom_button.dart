import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:software_grad_project/controller/onboarding/onboarding_controller.dart';
import 'package:software_grad_project/core/constants/colors.dart';

class CustomButtonOnBoarding extends GetView<OnBoardingControllerImp> {
  const CustomButtonOnBoarding({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialButton(
      padding: const EdgeInsets.symmetric(horizontal: 100),
      onPressed: () {
        controller.next();
      },
      color: AppColors.primaryBlue,
      textColor: Colors.white,
      child: const Text(
        "Continue",
        style: TextStyle(fontSize: 18, fontWeight: FontWeight.w700),
      ),
    );
  }
}
