import 'package:flutter/material.dart';
import 'package:software_grad_project/core/constants/colors.dart';
import 'package:software_grad_project/data/model/followers_model.dart';
import 'package:software_grad_project/view/widgets/followers/follower_view.dart';

class BusinessFollowers extends StatelessWidget {
  final int? numberOfFollowers;
  final List<FollowerModel>? businessFollowers;
  final void Function(String username) goToFollowerPage;
  const BusinessFollowers({
    super.key,
    required this.numberOfFollowers,
    required this.businessFollowers,
    required this.goToFollowerPage,
  });

  @override
  Widget build(BuildContext context) {
    return ListView(
      children: [
        const SizedBox(
          height: 20,
        ),
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 30.0),
          child: Text(
            "Number of followers: $numberOfFollowers",
            textAlign: TextAlign.center,
            style: const TextStyle(
                color: AppColors.primaryBlue,
                fontWeight: FontWeight.bold,
                fontSize: 20),
          ),
        ),
        ...List.generate(
            businessFollowers!.length,
            (index) => FollowerView(
                  follower: businessFollowers![index],
                  onTap: () {
                    goToFollowerPage(businessFollowers![index].followerName!);
                  },
                )),
      ],
    );
  }
}
