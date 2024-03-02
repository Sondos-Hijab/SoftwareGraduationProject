import 'package:flutter/material.dart';
import 'package:software_grad_project/core/constants/colors.dart';

class HomePageHeader extends StatelessWidget {
  final String? username;
  final void Function()? onPressedNotificationButton;

  const HomePageHeader(
      {super.key,
      required this.username,
      required this.onPressedNotificationButton});

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 10),
      padding: const EdgeInsets.symmetric(horizontal: 15),
      child: Row(
        children: [
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  "Welcome Back",
                  style: Theme.of(context).textTheme.headlineSmall!.copyWith(
                        fontSize: 20,
                      ),
                ),
                Text(
                  "$username",
                  style: Theme.of(context).textTheme.headlineSmall!.copyWith(
                      fontSize: 25,
                      color: AppColors.primaryBlue,
                      fontWeight: FontWeight.w700),
                ),
              ],
            ),
          ),
          IconButton(
              onPressed: onPressedNotificationButton,
              icon: Icon(
                Icons.notifications_active_outlined,
                size: 35,
                color: Colors.grey.shade700,
              ))
        ],
      ),
    );
  }
}
