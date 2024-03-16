import 'package:flutter/material.dart';
import 'package:software_grad_project/core/constants/images_assets.dart';

class FollowerView extends StatelessWidget {
  final followers;
  final int index;
  final Function()? onTap;

  const FollowerView({super.key, required this.index, required this.onTap, this.followers});

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
              followers[index].followerImage != null
                  ? CircleAvatar(
                      radius: 30,
                      backgroundImage:
                          FileImage(followers[index].followerImage!),
                    )
                  : const CircleAvatar(
                      radius: 30,
                      backgroundImage: AssetImage(AppImageAssets.noUserImage),
                    ),
              Padding(
                padding: const EdgeInsets.all(20),
                child: Text(
                  followers[index].followerName!,
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
