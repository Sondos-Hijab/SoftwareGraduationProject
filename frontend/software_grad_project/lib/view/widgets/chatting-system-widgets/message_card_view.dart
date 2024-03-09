import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:software_grad_project/core/constants/routes_names.dart';

class MessageCardView extends StatelessWidget {
  const MessageCardView({super.key});

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: () {
        Get.toNamed(AppRoutes.speceficChatPage);
      },
      child: Card(
        margin: const EdgeInsets.symmetric(vertical: 1),
        child: ListTile(
          title: const Text("Business Name"),
          subtitle: const Text(
            "last message is displayed here",
            style: TextStyle(fontSize: 12),
          ),
          leading: ClipOval(
            child: Image.asset(
              "assets/images/no-user.jpg",
              width: 60,
            ),
          ),
        ),
      ),
    );
  }
}
