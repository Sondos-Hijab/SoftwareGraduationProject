import 'package:flutter/material.dart';

class SliderItem extends StatelessWidget {
  final List sliderList;
  final int index;
  const SliderItem({super.key, required this.sliderList, required this.index});

  @override
  Widget build(BuildContext context) {
    return ClipRRect(
      borderRadius: BorderRadius.circular(20),
      child: Stack(
        children: [
          Image.asset(
            sliderList[index].image!,
            fit: BoxFit.cover,
            width: double.infinity,
            height: double.infinity,
          ),
          Positioned.fill(
            child: Container(
              color: Colors.black.withOpacity(0.3), // Adjust opacity as needed
            ),
          ),
          Positioned.fill(
            child: Center(
              child: Text(
                sliderList[index].title!,
                style: const TextStyle(
                  color: Colors.white,
                  fontSize: 25,
                  fontFamily: "Anton",
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
