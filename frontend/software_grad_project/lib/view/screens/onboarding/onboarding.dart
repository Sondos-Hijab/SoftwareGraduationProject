import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:software_grad_project/controller/onboarding/onboarding_controller.dart';
import 'package:software_grad_project/view/widgets/onboarding/custom_button.dart';
import 'package:software_grad_project/view/widgets/onboarding/custom_slider.dart';
import 'package:software_grad_project/view/widgets/onboarding/dots_controller.dart';

class OnBoarding extends StatelessWidget {
  const OnBoarding({super.key});

  @override
  Widget build(BuildContext context) {
    Get.put(OnBoardingControllerImp());
    return Scaffold(
      body: SafeArea(
        child: Container(
          margin: const EdgeInsets.symmetric(vertical: 50),
          child: const Column(
            children: [
              Expanded(flex: 4, child: CustomSliderOnBoarding()),
              Expanded(
                flex: 1,
                child: Column(
                  children: [
                    CustomDotsControllerOnBoarding(),
                    CustomButtonOnBoarding(),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
