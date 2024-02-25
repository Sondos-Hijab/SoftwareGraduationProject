import 'dart:io';

import 'package:flutter/material.dart';
import 'package:software_grad_project/core/constants/colors.dart';
import 'package:software_grad_project/core/constants/imagesassets.dart';

class ProfileImageContainer extends StatelessWidget {
  final File? selectedImageFile;
  final void Function()? onTap;

  const ProfileImageContainer(
      {super.key, required this.selectedImageFile, this.onTap});

  @override
  Widget build(BuildContext context) {
    return Stack(alignment: Alignment.bottomRight, children: [
      selectedImageFile != null
          ? CircleAvatar(
              radius: 120,
              backgroundImage: FileImage(selectedImageFile!),
            )
          : const CircleAvatar(
              radius: 120,
              backgroundImage: AssetImage(AppImageAssets.profileImage),
            ),
      InkWell(
        onTap: onTap,
        child: const CircleAvatar(
          radius: 25,
          backgroundColor: AppColors.primaryGreen,
          child: Icon(
            Icons.edit,
            size: 20,
            color: Colors.white,
          ),
        ),
      )
    ]);
  }
}
