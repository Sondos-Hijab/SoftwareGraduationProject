import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:software_grad_project/core/constants/colors.dart';
import 'package:software_grad_project/core/constants/images_assets.dart';
import 'package:software_grad_project/core/constants/routes_names.dart';
import 'package:software_grad_project/core/functions/format_number_created_at.dart';
import 'package:software_grad_project/data/model/notification_model.dart';

class NotificationCard extends StatelessWidget {
  final NotificationModel notification;

  const NotificationCard({
    Key? key,
    required this.notification,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    DateTime dateTime = DateTime.parse(notification.postCreatedAt!);
    String date =
        '${dateTime.year}-${formatNumber(dateTime.month)}-${formatNumber(dateTime.day)}';
    String time =
        '${formatNumber(dateTime.hour)}:${formatNumber(dateTime.minute)}:${formatNumber(dateTime.second)}';

    return InkWell(
      onTap: () {
        Get.toNamed(AppRoutes.speceficNotificationPage,
            arguments: notification);
      },
      child: Card(
        child: ListTile(
          leading: notification.businessPicture != null
              ? CircleAvatar(
                  radius: 30,
                  backgroundImage: MemoryImage(notification.businessPicture!))
              : const CircleAvatar(
                  radius: 30,
                  backgroundImage: AssetImage(AppImageAssets.noUserImage),
                ),
          title: Text(
            "${notification.businessName}",
            style: TextStyle(color: AppColors.primaryDarkBlue),
          ),
          subtitle: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text("Has made a new post!"),
              Text(
                "Date: $date Time: $time",
                style: TextStyle(color: Colors.grey),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
