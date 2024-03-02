import 'dart:io';

import 'package:flutter/material.dart';

class PostImage extends StatelessWidget {
  final File? postImageFile;
  const PostImage({super.key, required this.postImageFile});

  @override
  Widget build(BuildContext context) {
    return Container(
        margin: const EdgeInsets.only(top: 10),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(10.0),
        ),
        child: ClipRRect(
          borderRadius: BorderRadius.circular(10.0),
          child: postImageFile != null
              ? Image.file(
                  File(postImageFile!.path),
                  width: double.infinity,
                  fit: BoxFit.cover,
                )
              : Image.asset(
                  'assets/images/feedbackImages/coffee.jpg',
                  width: double.infinity,
                  fit: BoxFit.cover,
                ),
        ));
  }
}
