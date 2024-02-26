import 'package:flutter/material.dart';

class FeedbackImage extends StatelessWidget {
  final String feedbackImage;
  const FeedbackImage({super.key, required this.feedbackImage});

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(top: 10),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(10.0),
      ),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(10.0), // Same value as above
        child: Image.asset(
          feedbackImage,
          width: double.infinity,
          fit: BoxFit.cover,
        ),
      ),
    );
  }
}
