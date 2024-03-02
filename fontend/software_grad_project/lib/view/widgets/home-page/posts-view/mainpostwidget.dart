import 'dart:io';

import 'package:flutter/material.dart';
import 'package:software_grad_project/core/constants/colors.dart';
import 'package:software_grad_project/view/widgets/home-page/feedback-view/feedback-image.dart';
import 'package:software_grad_project/view/widgets/home-page/feedback-view/feedback-info.dart';
import 'package:software_grad_project/view/widgets/home-page/feedback-view/userinfo.dart';
import 'package:software_grad_project/view/widgets/home-page/posts-view/businessinfo.dart';
import 'package:software_grad_project/view/widgets/home-page/posts-view/postimage.dart';

class MainPostWidget extends StatelessWidget {
  final File? businessProfileImage;
  final String? businessName;
  final String? postText;
  final File? postImage;
  final String? date;
  final String? time;

  const MainPostWidget({
    super.key,
    required this.businessProfileImage,
    required this.businessName,
    required this.postText,
    required this.postImage,
    required this.date,
    required this.time,
  });

  @override
  Widget build(BuildContext context) {
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
            PostImage(postImageFile: postImage),
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
            Text(postText!)
          ],
        ),
      ),
    );
  }
}
