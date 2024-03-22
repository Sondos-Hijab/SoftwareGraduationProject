import 'dart:io';
import 'dart:typed_data';

import 'package:flutter/material.dart';

class FeedbackImage extends StatelessWidget {
  final Uint8List? feedbackImage;
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
              ? Image.memory(
                  feedbackImage!,
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
