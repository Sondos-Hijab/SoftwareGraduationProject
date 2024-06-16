import 'package:flutter/material.dart';
import 'package:software_grad_project/core/constants/colors.dart';

class HomePageHeader extends StatelessWidget {
  final String? username;
  final void Function()? onPressedNotificationButton;
  final int notificationCount;

  const HomePageHeader({
    super.key,
    required this.username,
    required this.onPressedNotificationButton,
    required this.notificationCount,
  });

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
          Stack(
            children: [
              IconButton(
                onPressed: onPressedNotificationButton,
                icon: Icon(
                  Icons.notifications_active_outlined,
                  size: 35,
                  color: Colors.grey.shade700,
                ),
              ),
              Stack(
                children: [
                  IconButton(
                    onPressed: onPressedNotificationButton,
                    icon: Icon(
                      Icons.notifications_active_outlined,
                      size: 35,
                      color: Colors.grey.shade700,
                    ),
                  ),
                  notificationCount != 0
                      ? Positioned(
                          top: 5,
                          right: 5,
                          child: Container(
                            width: 20,
                            height: 20,
                            decoration: const BoxDecoration(
                              color: Colors.red,
                              shape: BoxShape.circle,
                            ),
                            child: Center(
                              child: FittedBox(
                                fit: BoxFit.scaleDown,
                                child: Text(
                                  notificationCount > 9
                                      ? '9+'
                                      : '$notificationCount',
                                  style: const TextStyle(
                                    color: Colors.white,
                                  ),
                                ),
                              ),
                            ),
                          ),
                        )
                      : Text(""),
                ],
              ),
            ],
          ),
        ],
      ),
    );
  }
}
