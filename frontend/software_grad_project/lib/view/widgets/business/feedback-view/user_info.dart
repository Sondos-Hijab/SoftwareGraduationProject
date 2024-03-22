import 'dart:io';
import 'dart:typed_data';
import 'package:flutter/material.dart';
import 'package:software_grad_project/core/constants/colors.dart';

class UserInfo extends StatelessWidget {
  final Uint8List? userImage;
  final String username;
  const UserInfo({super.key, required this.userImage, required this.username});

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        ClipOval(
          child: userImage != null
              ? Image.memory(
                  userImage!,
                  width: 50,
                  height: 50,
                  fit: BoxFit.cover,
                )
              : Image.asset(
                  'assets/images/no-user.jpg',
                  width: 50,
                  height: 50,
                  fit: BoxFit.cover,
                ),
        ),
        Padding(
          padding: const EdgeInsets.only(left: 10),
          child: Text(
            username,
            style: const TextStyle(color: AppColors.primaryBlue),
          ),
        ),
      ],
    );
  }
}
