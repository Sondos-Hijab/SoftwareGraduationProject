import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:software_grad_project/controller/app-main-pages-controllers/notifications_page_controller.dart';
import 'package:software_grad_project/core/constants/colors.dart';
import 'package:software_grad_project/view/widgets/notifications/notification_card.dart';

class NotificationsPage extends StatelessWidget {
  const NotificationsPage({super.key});

  @override
  Widget build(BuildContext context) {
    Get.put(NotificationsPageControllerImp());
    return GetBuilder<NotificationsPageControllerImp>(builder: (controller) {
      return Scaffold(
        appBar: AppBar(
          centerTitle: true,
          backgroundColor: AppColors.appWhite,
          elevation: 0.0,
          title: Text(
            'Notifications Page',
            style: Theme.of(context).textTheme.headlineSmall,
          ),
        ),
        body: ListView.builder(
          itemCount: controller.notifications?.length,
          itemBuilder: (context, index) {
            return NotificationCard(
                notification: controller.notifications![index],
                decreaseNotificationsCount:
                    controller.decreaseNotificationsCount);
          },
        ),
      );
    });
  }
}
