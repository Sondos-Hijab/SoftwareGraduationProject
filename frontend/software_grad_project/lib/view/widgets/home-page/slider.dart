import 'package:flutter/material.dart';
import 'package:software_grad_project/view/widgets/home-page/slider_Item.dart';

class HomePageSlider extends StatelessWidget {
  final List sliderList;
  final PageController pageController;
  final void Function() onPressedPrevious;
  final void Function() onPressedNext;
  const HomePageSlider(
      {super.key,
      required this.sliderList,
      required this.pageController,
      required this.onPressedPrevious,
      required this.onPressedNext});

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 200,
      margin: const EdgeInsets.symmetric(horizontal: 15, vertical: 15),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(20),
      ),
      child: Stack(
        children: [
          PageView.builder(
            controller: pageController,
            itemCount: sliderList.length,
            itemBuilder: (context, index) {
              return SliderItem(sliderList: sliderList, index: index);
            },
          ),
          Positioned(
            left: 10,
            top: 80,
            child: IconButton(
              icon: const Icon(
                Icons.arrow_back_ios_rounded,
                size: 40,
                color: Colors.white,
              ),
              onPressed: onPressedPrevious,
            ),
          ),
          Positioned(
            right: 10,
            top: 80,
            child: IconButton(
              icon: const Icon(
                Icons.arrow_forward_ios_rounded,
                size: 40,
                color: Colors.white,
              ),
              onPressed: onPressedNext,
            ),
          ),
        ],
      ),
    );
  }
}
