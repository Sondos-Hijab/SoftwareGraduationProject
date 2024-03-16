import 'package:flutter/material.dart';
import 'package:software_grad_project/view/widgets/followers/follower_view.dart';

class BusinessFollowers extends StatelessWidget {
  final followers;
  const BusinessFollowers({super.key, required this.followers});

  @override
  Widget build(BuildContext context) {
    return ListView(
      children: [
        ...List.generate(
            followers.length,
            (index) => FollowerView(
                  followers: followers,
                  index: index,
                  onTap: () {},
                )),
      ],
    );
  }
}
