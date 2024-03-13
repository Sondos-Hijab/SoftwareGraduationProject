import 'dart:typed_data';

import 'package:flutter/material.dart';

class PostImage extends StatelessWidget {
  final Uint8List? postImage;
  const PostImage({super.key,required this.postImage});

  @override
  Widget build(BuildContext context) {
    return Container(
        margin: const EdgeInsets.only(top: 10),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(10.0),
        ),
        child: ClipRRect(
          borderRadius: BorderRadius.circular(10.0),
          child: postImage != null
              ? Image.memory(
                  postImage!,
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
