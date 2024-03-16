import 'dart:io';

import 'package:flutter/material.dart';
import 'package:software_grad_project/core/constants/colors.dart';

class FeedbackImageUploud extends StatelessWidget {
  final File? selectedImage;
  final void Function()? onTap;

  const FeedbackImageUploud(
      {super.key, required this.selectedImage, this.onTap});

  @override
  Widget build(BuildContext context) {
    return Container(
        height: 200,
        margin: const EdgeInsets.only(bottom: 20, right: 20, left: 20),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(20),
          border: Border.all(color: AppColors.lightGrey),
        ),
        child: InkWell(
          onTap: onTap,
          child: selectedImage != null
              ? Image.file(
                  selectedImage!,
                  fit: BoxFit.contain,
                )
              : Image.asset(
                  "assets/images/upload.gif",
                  fit: BoxFit.contain,
                ),
        ));
  }
}
