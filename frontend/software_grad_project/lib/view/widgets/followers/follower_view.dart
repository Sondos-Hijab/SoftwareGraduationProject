import 'package:flutter/material.dart';
import 'package:software_grad_project/core/constants/images_assets.dart';
import 'package:software_grad_project/data/model/followers_model.dart';

class FollowerView extends StatelessWidget {
  final FollowerModel follower;
  final Function()? onTap;

  const FollowerView({
    super.key,
    required this.follower,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.only(top: 20, left: 20, right: 20),
      color: Colors.white,
      child: InkWell(
        onTap: onTap,
        child: Padding(
          padding: const EdgeInsets.all(10),
          child: Row(
            children: [
              follower.followerImage != null
                  ? CircleAvatar(
                      radius: 30,
                      backgroundImage: MemoryImage(follower.followerImage!),
                    )
                  : const CircleAvatar(
                      radius: 30,
                      backgroundImage: AssetImage(AppImageAssets.noUserImage),
                    ),
              Padding(
                padding: const EdgeInsets.all(20),
                child: Text(
                  follower.followerName!,
                  style: Theme.of(context).textTheme.bodyMedium,
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}
