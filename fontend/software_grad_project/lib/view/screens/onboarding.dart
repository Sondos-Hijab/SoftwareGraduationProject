import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:software_grad_project/controller/onboarding_controller.dart';
import 'package:software_grad_project/view/widgets/onboarding/custombutton.dart';
import 'package:software_grad_project/view/widgets/onboarding/customslider.dart';
import 'package:software_grad_project/view/widgets/onboarding/dotscontroller.dart';

class OnBoarding extends StatelessWidget {
  const OnBoarding({super.key});

  @override
  Widget build(BuildContext context) {
    Get.lazyPut(() => OnBoardingControllerImp());
    return Scaffold(
        body: GetBuilder<OnBoardingControllerImp>(
      builder: (controller) => SafeArea(
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
    ));
  }
}
