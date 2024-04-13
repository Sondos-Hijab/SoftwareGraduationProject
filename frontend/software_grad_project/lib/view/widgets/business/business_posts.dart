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
        Container(
          margin: const EdgeInsets.symmetric(horizontal: 20),
          decoration: BoxDecoration(
            border: Border.all(
              color: AppColors.lightGrey,
            ),
            borderRadius: BorderRadius.circular(5),
          ),
          child: DropdownButton<String>(
            padding: const EdgeInsets.symmetric(horizontal: 20),
            value: "Newest to oldest",
            onChanged: (String? value) {
              setPostsSortType(value!);
            },
            isExpanded: true, // Make the dropdown button full width
            items: <String>['Newest to oldest', 'Oldest to newest']
                .map((String value) {
              return DropdownMenuItem<String>(
                value: value,
                child: Text(
                  value,
                  style: const TextStyle(color: AppColors.grey, fontSize: 16),
                ),
              );
            }).toList(),
            underline: const SizedBox(),
          ),
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
