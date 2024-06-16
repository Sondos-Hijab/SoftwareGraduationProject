import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:software_grad_project/controller/app-main-pages-controllers/messages_page_controller.dart';
import 'package:software_grad_project/core/constants/colors.dart';
import 'package:software_grad_project/core/constants/routes_names.dart';
import 'package:software_grad_project/view/widgets/chatting-system-widgets/message_card_view.dart';

class MessagesPage extends StatelessWidget {
  const MessagesPage({super.key});

  @override
  Widget build(BuildContext context) {
    Get.put(MessagesPageControllerImp());
    return GetBuilder<MessagesPageControllerImp>(builder: (controller) {
      return Scaffold(
          appBar: AppBar(
            centerTitle: true,
            backgroundColor: AppColors.appWhite,
            elevation: 0.0,
            title: Text(
              'Messages Page',
              style: Theme.of(context).textTheme.headlineSmall,
            ),
            actions: [
              IconButton(
                icon: const Icon(Icons.refresh),
                onPressed: () {
                  controller.refreshChatPartnersList();
                },
              ),
            ],
          ),
          body: Column(
            children: List.generate(
              controller.businessesList!.length,
              (index) => MessageCardView(
                businessName: controller.businessesList![index].businessName,
                picture: controller.businessesList![index].picture,
                unseenMessagesCount: controller.unseenMessagesCount[index],
                onTap: () {
                  controller.resetNewMessagesCount(
                      controller.businessesList![index].businessName ?? "");

                  Get.toNamed(
                    AppRoutes.chatPage,
                    arguments: {
                      'businessName':
                          controller.businessesList![index].businessName
                    },
                  );
                },
              ),
            ),
          ));
    });
  }
}
