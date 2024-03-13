import 'dart:io';
import 'dart:typed_data';

import 'package:flutter/material.dart';
import 'package:software_grad_project/core/constants/colors.dart';

import 'package:software_grad_project/view/widgets/business/posts-view/businessinfo.dart';
import 'package:software_grad_project/view/widgets/business/posts-view/postimage.dart';

class MainPostWidget extends StatelessWidget {
  final File? businessProfileImage;
  final String? businessName;
  final String? description;
  final Uint8List? picture;
  final String? createdAt;

  const MainPostWidget({
    super.key,
    required this.businessName,
    required this.description,
    required this.picture,
    required this.createdAt,
    required this.businessProfileImage,
  });

  @override
  Widget build(BuildContext context) {
    DateTime dateTime = DateTime.parse(createdAt!);
    String date =
        '${dateTime.year}-${_formatNumber(dateTime.month)}-${_formatNumber(dateTime.day)}';
    String time =
        '${_formatNumber(dateTime.hour)}:${_formatNumber(dateTime.minute)}:${_formatNumber(dateTime.second)}';

    return Container(
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(8.0),
        border: Border.all(
          color: Colors.white,
          width: 1.0,
        ),
        boxShadow: [
          BoxShadow(
            color: Colors.grey.withOpacity(0.1),
            spreadRadius: 1,
            blurRadius: 4,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      margin: const EdgeInsets.only(top: 10, left: 20, right: 20),
      child: Container(
        margin: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            BusinessInfo(
                businessImage: businessProfileImage,
                businessName: businessName!),
            if (picture != null)
              PostImage(
                postImage: picture,
              ),
            Text(description!),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  'Date: $date',
                  style: TextStyle(color: AppColors.primaryGreen),
                ),
                Text(
                  'Time: $time',
                  style: TextStyle(color: AppColors.primaryGreen),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  String _formatNumber(int number) {
    return number < 10 ? '0$number' : '$number';
  }
}
