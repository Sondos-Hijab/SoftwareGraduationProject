import 'dart:io';

import 'package:flutter/material.dart';
import 'package:software_grad_project/core/constants/colors.dart';

class BusinessInfo extends StatelessWidget {
  final File? businessImage;
  final String businessName;
  const BusinessInfo(
      {super.key, required this.businessImage, required this.businessName});

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        ClipOval(
          child: businessImage != null
              ? Image.file(
                  File(businessImage!.path),
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
            businessName,
            style: const TextStyle(color: AppColors.primaryBlue),
          ),
        ),
      ],
    );
  }
}
