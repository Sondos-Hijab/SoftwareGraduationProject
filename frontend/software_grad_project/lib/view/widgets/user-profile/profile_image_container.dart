import 'dart:io';
import 'dart:typed_data';

import 'package:flutter/material.dart';
import 'package:software_grad_project/core/constants/colors.dart';
import 'package:software_grad_project/core/constants/images_assets.dart';

class ProfileImageContainer extends StatelessWidget {
  final bool? me;
  final File? selectedImageFile;
  final Uint8List? otherUserProfileImage;
  final void Function()? onTap;

  const ProfileImageContainer(
      {super.key,
      this.selectedImageFile,
      this.onTap,
      required this.me,
      this.otherUserProfileImage});

  @override
  Widget build(BuildContext context) {
    return Stack(alignment: Alignment.bottomRight, children: [
      (me == true && selectedImageFile != null)
          ? CircleAvatar(
              radius: 120,
              backgroundImage: FileImage(selectedImageFile!),
            )
          : const Text(""),
      (me == false && otherUserProfileImage != null)
          ? CircleAvatar(
              radius: 120,
              backgroundImage: MemoryImage(otherUserProfileImage!),
            )
          : const Text(""),
      me == true
          ? InkWell(
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
          : const Text("")
    ]);
  }
}
