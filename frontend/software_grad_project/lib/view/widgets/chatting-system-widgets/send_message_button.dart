import 'dart:io';

import 'package:flutter/material.dart';
import 'package:software_grad_project/core/constants/colors.dart';

class SendMessageButton extends StatelessWidget {
  final TextEditingController messageTextController;
  final Function handleSendMessage;
  final File? imageFile;
  final Function pickImage;

  const SendMessageButton({
    Key? key,
    required this.messageTextController,
    required this.handleSendMessage,
    required this.imageFile,
    required this.pickImage,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(8.0),
      decoration: BoxDecoration(
        color: Colors.white,
        boxShadow: [
          BoxShadow(
            color: Colors.grey.withOpacity(0.5),
            spreadRadius: 1,
            blurRadius: 2,
            offset: const Offset(0, -1), // changes position of shadow
          ),
        ],
      ),
      child: Row(
        children: [
          Expanded(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 10.0),
              child: TextField(
                controller: messageTextController,
                decoration: const InputDecoration(
                  hintText: 'Type your message...',
                  border: InputBorder.none, // Remove border
                ),
              ),
            ),
          ),
          Stack(
            children: [
              IconButton(
                icon: const Icon(Icons.photo),
                onPressed: () {
                  pickImage();
                },
              ),
              if (imageFile != null) // Show badge if imageFile is not null
                const Positioned(
                  right: 0,
                  child: CircleAvatar(
                    radius: 8,
                    backgroundColor: Colors.red,
                    child: Text(
                      '1',
                      style: TextStyle(color: Colors.white, fontSize: 10),
                    ),
                  ),
                ),
            ],
          ),
          Material(
            borderRadius: BorderRadius.circular(20.0),
            color: AppColors.primaryBlue,
            child: InkWell(
              borderRadius: BorderRadius.circular(20.0),
              onTap: () {
                handleSendMessage();
              },
              child: const Padding(
                padding: EdgeInsets.all(10.0),
                child: Icon(
                  Icons.send,
                  color: Colors.white,
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
