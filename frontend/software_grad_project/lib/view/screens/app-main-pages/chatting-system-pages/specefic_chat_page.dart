import 'package:flutter/material.dart';
import 'package:software_grad_project/core/constants/colors.dart';
import 'package:software_grad_project/view/widgets/chatting-system-widgets/chat_bubble.dart';
import 'package:software_grad_project/view/widgets/chatting-system-widgets/send_message_button.dart';

class SpecificChatPage extends StatelessWidget {
  const SpecificChatPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        centerTitle: true,
        backgroundColor: AppColors.appWhite,
        elevation: 0.0,
        title: Text(
          'Business name',
          style: Theme.of(context).textTheme.headline6,
        ),
      ),
      body: Column(
        children: [
          Expanded(
            child: ListView(
              children: const [
                ChatBubble(
                  message: "Sender Message",
                  isSentByMe: true,
                ),
                ChatBubble(
                  message: "Receiver Message",
                  isSentByMe: false,
                ),
                ChatBubble(
                  message: "Sender Message",
                  isSentByMe: true,
                ),
                ChatBubble(
                  message: "Receiver Message",
                  isSentByMe: false,
                ),
                ChatBubble(
                  message: "Sender Message",
                  isSentByMe: true,
                ),
                ChatBubble(
                  message: "Receiver Message",
                  isSentByMe: false,
                ),
                ChatBubble(
                  message: "Sender Message",
                  isSentByMe: true,
                ),
                ChatBubble(
                  message: "Receiver Message",
                  isSentByMe: false,
                ),
                ChatBubble(
                  message: "Sender Message",
                  isSentByMe: true,
                ),
                ChatBubble(
                  message: "Receiver Message",
                  isSentByMe: false,
                ),
                ChatBubble(
                  message: "Sender Message",
                  isSentByMe: true,
                ),
                ChatBubble(
                  message: "Receiver Message",
                  isSentByMe: false,
                ),
                ChatBubble(
                  message: "Sender Message",
                  isSentByMe: true,
                ),
                ChatBubble(
                  message: "Receiver Message",
                  isSentByMe: false,
                ),
              ],
            ),
          ),
          const SendMessageButton(),
        ],
      ),
    );
  }
}
