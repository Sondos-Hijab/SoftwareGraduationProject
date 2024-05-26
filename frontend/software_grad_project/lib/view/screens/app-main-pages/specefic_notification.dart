import 'package:flutter/material.dart';
import 'package:software_grad_project/core/constants/colors.dart';
import 'package:software_grad_project/data/model/notification_model.dart';
import 'package:software_grad_project/view/widgets/notifications/notitication_post.dart';

class SpeceficNotification extends StatelessWidget {
  const SpeceficNotification({super.key});

  @override
  Widget build(BuildContext context) {
    final NotificationModel notification =
        ModalRoute.of(context)!.settings.arguments as NotificationModel;
    return Scaffold(
      appBar: AppBar(
        centerTitle: true,
        backgroundColor: AppColors.appWhite,
        elevation: 0.0,
        title: Text(
          "Post Notification",
          style: Theme.of(context).textTheme.headlineSmall,
        ),
      ),
      body: NotificationPost(
        businessProfileImage: notification.businessPicture!,
        businessName: notification.businessName!,
        picture: notification.postPicture!,
        description: notification.postDescription!,
        createdAt: notification.postCreatedAt!,
      ),
    );
  }
}
