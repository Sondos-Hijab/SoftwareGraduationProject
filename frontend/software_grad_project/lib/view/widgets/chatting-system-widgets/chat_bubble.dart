import 'package:flutter/material.dart';
import 'package:software_grad_project/core/constants/colors.dart';
import 'package:software_grad_project/data/model/message_model.dart';

class ChatBubble extends StatelessWidget {
  final MessageModel message;

  const ChatBubble({
    required this.message,
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Align(
      alignment:
          message.sender == 0 ? Alignment.centerRight : Alignment.centerLeft,
      child: Container(
        margin: const EdgeInsets.symmetric(vertical: 4.0, horizontal: 8.0),
        padding: const EdgeInsets.all(12.0),
        decoration: BoxDecoration(
          color: message.sender == 0
              ? AppColors.primaryBlue
              : Colors.grey.shade200,
          borderRadius: BorderRadius.circular(12.0),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            if (message.text != null && message.text != "undefined")
              Text(
                message.text!,
                style: TextStyle(
                  color:
                      message.sender == 0 ? AppColors.appWhite : Colors.black,
                ),
              ),
            if (message.photo != null)
              SizedBox(
                height: 250,
                width: 250,
                child: ClipRRect(
                  borderRadius: BorderRadius.circular(12.0), // Rounded corners
                  child: Image.memory(
                    message.photo!,
                    fit: BoxFit.cover,
                  ),
                ),
              ),
          ],
        ),
      ),
    );
  }
}
