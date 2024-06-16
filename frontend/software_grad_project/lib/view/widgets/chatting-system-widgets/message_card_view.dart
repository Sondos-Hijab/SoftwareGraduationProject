import 'package:flutter/material.dart';
import 'dart:typed_data';
import 'package:software_grad_project/core/constants/images_assets.dart';

class MessageCardView extends StatelessWidget {
  final String? businessName;
  final Uint8List? picture;
  final Function()? onTap;
  final int? unseenMessagesCount;

  const MessageCardView(
      {super.key,
      this.businessName,
      this.picture,
      this.onTap,
      this.unseenMessagesCount});

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.only(top: 20, left: 20, right: 20),
      color: Colors.white,
      child: InkWell(
        onTap: onTap,
        child: Padding(
          padding: const EdgeInsets.all(10),
          child: Row(
            children: [
              picture != null
                  ? CircleAvatar(
                      radius: 30, backgroundImage: MemoryImage(picture!))
                  : const CircleAvatar(
                      radius: 30,
                      backgroundImage: AssetImage(AppImageAssets.noUserImage),
                    ),
              Padding(
                padding: const EdgeInsets.only(left: 20),
                child: Text(
                  businessName!,
                  style: Theme.of(context).textTheme.bodyMedium,
                ),
              ),
              const Spacer(),
              if (unseenMessagesCount != null && unseenMessagesCount! > 0)
                Container(
                  margin: const EdgeInsets.only(right: 10),
                  padding:
                      const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
                  decoration: BoxDecoration(
                    color: Colors.red,
                    borderRadius: BorderRadius.circular(10),
                  ),
                  child: Text(
                    '$unseenMessagesCount new',
                    style: const TextStyle(color: Colors.white, fontSize: 12),
                  ),
                ),
            ],
          ),
        ),
      ),
    );
  }
}
