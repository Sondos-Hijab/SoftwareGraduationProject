import 'package:flutter/material.dart';
import 'package:software_grad_project/data/datasource/static/static.dart';
import 'package:software_grad_project/view/widgets/business/posts-view/mainpostwidget.dart';

class BusinessPosts extends StatelessWidget {
  const BusinessPosts({super.key});

  @override
  Widget build(BuildContext context) {
    return ListView(
      children: [
        ...List.generate(
            postsList.length,
            (index) => MainPostWidget(
                  businessProfileImage: postsList[index].businessProfileImage,
                  businessName: postsList[index].businessName,
                  postText: postsList[index].postText,
                  postImage: postsList[index].postImage,
                  date: postsList[index].date,
                  time: postsList[index].time,
                )),
      ],
    );
  }
}
