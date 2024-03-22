import 'dart:typed_data';

import 'package:flutter/material.dart';
import 'package:software_grad_project/data/model/fetched_post_model.dart';
import 'package:software_grad_project/view/widgets/business/posts-view/mainpostwidget.dart';

class BusinessPosts extends StatelessWidget {
  final List<FetchedPostModel>? businessesPosts;
  final Uint8List? businessImage;
  const BusinessPosts({super.key, required this.businessesPosts, required this.businessImage});

  @override
  Widget build(BuildContext context) {
    return ListView(
      children: [
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
