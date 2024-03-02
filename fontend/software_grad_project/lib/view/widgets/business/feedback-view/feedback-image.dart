import 'dart:io';

import 'package:flutter/material.dart';

class FeedbackImage extends StatelessWidget {
  final File? feedbackImage;
  const FeedbackImage({super.key, required this.feedbackImage});

  @override
  Widget build(BuildContext context) {
    return Container(
        margin: const EdgeInsets.only(top: 10),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(10.0),
        ),
        child: ClipRRect(
          borderRadius: BorderRadius.circular(10.0),
          child: feedbackImage != null
              ? Image.file(
                  File(feedbackImage!.path),
                  width: double.infinity,
                  fit: BoxFit.cover,
                )
              : Image.asset(
                  'assets/images/feedbackImages/cafe.jpg',
                  width: double.infinity,
                  fit: BoxFit.cover,
                ),
        ));
  }
}
