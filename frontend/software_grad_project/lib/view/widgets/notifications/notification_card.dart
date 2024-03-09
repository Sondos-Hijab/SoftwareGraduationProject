import 'package:flutter/material.dart';
import 'package:software_grad_project/data/model/notification_item_model.dart';

class NotificationCard extends StatelessWidget {
  final NotificationItem notification;

  const NotificationCard({super.key, required this.notification});

  @override
  Widget build(BuildContext context) {
    return Card(
      child: ListTile(
        leading: CircleAvatar(
          backgroundImage: AssetImage(notification.userPicture!),
        ),
        title: Text("${notification.username!} made a new post"),
        subtitle: Text(notification.time!),
        onTap: () {},
      ),
    );
  }
}
