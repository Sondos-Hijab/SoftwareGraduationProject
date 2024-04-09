import 'dart:typed_data';
import 'package:flutter/material.dart';
import 'package:software_grad_project/core/constants/colors.dart';

class UserInfo extends StatelessWidget {
  final Uint8List? userImage;
  final String username;
  final void Function(String username) goToUserPage;
  const UserInfo(
      {super.key,
      required this.userImage,
      required this.username,
      required this.goToUserPage});

  @override
  Widget build(BuildContext context) {
    return InkWell(
        child: Row(
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
        ),
        onTap: () {
          goToUserPage(username);
        });
  }
}
