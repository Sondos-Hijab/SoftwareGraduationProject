import 'package:flutter/material.dart';
import 'package:get/get_state_manager/get_state_manager.dart';
import 'package:software_grad_project/controller/onboarding/onboarding_controller.dart';
import 'package:software_grad_project/core/constants/colors.dart';
import 'package:software_grad_project/data/datasource/static/static.dart';

class CustomDotsControllerOnBoarding extends StatelessWidget {
  const CustomDotsControllerOnBoarding({super.key});

  @override
  Widget build(BuildContext context) {
    return GetBuilder<OnBoardingControllerImp>(
      builder: (controller) => Container(
        margin: const EdgeInsets.symmetric(vertical: 30),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            ...List.generate(
              onBoardingList.length,
              (index) => AnimatedContainer(
                margin: const EdgeInsets.only(right: 5),
                duration: const Duration(milliseconds: 800),
                width: controller.currentPage == index ? 20 : 5,
                height: 6,
                decoration: BoxDecoration(
                    color: AppColors.primaryBlue,
                    borderRadius: BorderRadius.circular(10)),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
