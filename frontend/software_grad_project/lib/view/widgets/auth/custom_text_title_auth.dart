import 'package:flutter/material.dart';

class CustomTextTitleAuth extends StatelessWidget {
  final String titleText;
  const CustomTextTitleAuth({super.key, required this.titleText});

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(top: 15, bottom: 10),
      child: Text(
        titleText,
        textAlign: TextAlign.center,
        style: Theme.of(context).textTheme.headlineLarge,
      ),
    );
  }
}
