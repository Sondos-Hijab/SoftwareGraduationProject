import 'package:flutter/material.dart';
import 'package:software_grad_project/core/constants/colors.dart';

class ChatBubble extends StatelessWidget {
  final String message;
  final bool isSentByMe;

  const ChatBubble({
    required this.message,
    required this.isSentByMe,
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Align(
      alignment: isSentByMe ? Alignment.centerRight : Alignment.centerLeft,
      child: Container(
        margin: const EdgeInsets.symmetric(vertical: 4.0, horizontal: 8.0),
        padding: const EdgeInsets.all(12.0),
        decoration: BoxDecoration(
          color: isSentByMe ? AppColors.primaryBlue : AppColors.grey,
          borderRadius: BorderRadius.circular(16.0),
        ),
        child: Text(
          message,
          style: const TextStyle(color: Colors.white),
        ),
      ),
    );
  }
}
