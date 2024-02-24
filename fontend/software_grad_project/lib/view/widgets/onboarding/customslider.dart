import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:software_grad_project/controller/onboarding_controller.dart';
import 'package:software_grad_project/data/datasource/static/static.dart';

class CustomSliderOnBoarding extends GetView<OnBoardingControllerImp> {
  const CustomSliderOnBoarding({super.key});

  @override
  Widget build(BuildContext context) {
    return PageView.builder(
      controller: controller.pageController,
      onPageChanged: (value) {
        controller.onPageChanged(value);
      },
      itemCount: onBoardingList.length,
      itemBuilder: (context, i) => Column(
        children: [
          Text(onBoardingList[i].title!,
              style: Theme.of(context).textTheme.headlineMedium),
          Container(
            margin: const EdgeInsets.symmetric(vertical: 10),
            child: Image.asset(
              onBoardingList[i].image!,
              height: 300,
              fit: BoxFit.cover,
            ),
          ),
          Container(
            margin: const EdgeInsets.symmetric(horizontal: 30, vertical: 10),
            width: double.infinity,
            alignment: Alignment.center,
            child: Text(onBoardingList[i].body!,
                textAlign: TextAlign.center,
                style: Theme.of(context).textTheme.bodyLarge),
          ),
        ],
      ),
    );
  }
}
