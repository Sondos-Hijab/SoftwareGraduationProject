import 'package:flutter/material.dart';
import 'package:software_grad_project/data/model/fetched_post_model.dart';
import 'package:software_grad_project/view/widgets/business/posts-view/mainpostwidget.dart';

class BusinessPosts extends StatelessWidget {
  final List<FetchedPostModel>? businessesPosts;

  const BusinessPosts({super.key, required this.businessesPosts});

  @override
  Widget build(BuildContext context) {
    return ListView(
      children: [
        ...List.generate(
            businessesPosts!.length,
            (index) => MainPostWidget(
                  businessProfileImage: null,
                  businessName: businessesPosts?[index].businessName,
                  picture: businessesPosts?[index].picture,
                  description: businessesPosts?[index].description,
                  createdAt: businessesPosts?[index].createdAt,
                )),
      ],
    );
  }
}
