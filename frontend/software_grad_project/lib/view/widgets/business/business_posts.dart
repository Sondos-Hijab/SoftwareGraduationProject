import 'dart:typed_data';

import 'package:flutter/material.dart';
import 'package:software_grad_project/core/constants/colors.dart';
import 'package:software_grad_project/data/model/fetched_post_model.dart';
import 'package:software_grad_project/view/widgets/business/posts-view/mainpostwidget.dart';

class BusinessPosts extends StatelessWidget {
  final List<FetchedPostModel>? businessesPosts;
  final Uint8List? businessImage;
  final void Function(String sortType) setPostsSortType;
  final String selectedPostsSortType;
  const BusinessPosts(
      {super.key,
      required this.businessesPosts,
      required this.businessImage,
      required this.setPostsSortType,
      required this.selectedPostsSortType});

  @override
  Widget build(BuildContext context) {
    return ListView(
      children: [
        Row(
          children: [
            Expanded(
              child: RadioListTile<String>(
                title: const Text(
                  'Oldest to newest',
                  style: TextStyle(fontSize: 11), // Adjust font size here
                ),
                value: "Oldest to newest",
                groupValue: selectedPostsSortType,
                onChanged: (String? value) {
                  setPostsSortType(value!);
                },
                controlAffinity: ListTileControlAffinity.leading,
                activeColor: AppColors.primaryGreen,
              ),
            ),
            Expanded(
              child: RadioListTile<String>(
                title: const Text(
                  'Newest to oldest',
                  style: TextStyle(fontSize: 11), // Adjust font size here
                ),
                value: 'Newest to oldest',
                groupValue: selectedPostsSortType,
                onChanged: (String? value) {
                  setPostsSortType(value!);
                },
                controlAffinity: ListTileControlAffinity.leading,
                activeColor: AppColors.primaryGreen,
              ),
            ),
          ],
        ),
        ...List.generate(
            businessesPosts!.length,
            (index) => MainPostWidget(
                  businessProfileImage: businessImage,
                  businessName: businessesPosts?[index].businessName,
                  picture: businessesPosts?[index].picture,
                  description: businessesPosts?[index].description,
                  createdAt: businessesPosts?[index].createdAt,
                )),
      ],
    );
  }
}
