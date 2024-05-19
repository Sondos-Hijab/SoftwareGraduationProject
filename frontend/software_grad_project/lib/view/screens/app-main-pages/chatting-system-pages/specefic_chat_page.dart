import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:software_grad_project/controller/app-main-pages-controllers/chat_page_controller.dart';
import 'package:software_grad_project/core/constants/colors.dart';
import 'package:software_grad_project/view/widgets/chatting-system-widgets/chat_bubble.dart';
import 'package:software_grad_project/view/widgets/chatting-system-widgets/send_message_button.dart';

class SpecificChatPage extends StatelessWidget {
  const SpecificChatPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    Get.put(ChatsPageControllerImp());
    return GetBuilder<ChatsPageControllerImp>(builder: (controller) {
      return Scaffold(
        appBar: AppBar(
          centerTitle: true,
          backgroundColor: AppColors.appWhite,
          elevation: 0.0,
          title: Text(
            controller.businessName,
            style: Theme.of(context).textTheme.headline6,
          ),
        ),
        body: Column(
          children: [
            Expanded(
              child: SingleChildScrollView(
                reverse: true,
                child: Column(
                  children: List.generate(
                    controller.messages.length,
                    (index) => ChatBubble(
                      message: controller.messages[index],
                    ),
                  ),
                ),
              ),
            ),
            SendMessageButton(
                messageTextController: controller.messageTextController,
                handleSendMessage: controller.sendMessage,
                imageFile: controller.imageFile,
                pickImage: controller.pickImage)
          ],
        ),
      );
    });
  }
}
