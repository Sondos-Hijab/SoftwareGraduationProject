import 'package:flutter/material.dart';

class CustomDescriptionTextAuth extends StatelessWidget {
  final String description;
  const CustomDescriptionTextAuth({super.key, required this.description});

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 5),
      child: Text(
        description,
        style: Theme.of(context).textTheme.bodyMedium,
        textAlign: TextAlign.center,
      ),
    );
  }
}
