import 'package:flutter/material.dart';
import 'dart:typed_data';
import 'package:software_grad_project/core/constants/images_assets.dart';

class MessageCardView extends StatelessWidget {
  final String? businessName;
  final Uint8List? picture;
  final Function()? onTap;

  const MessageCardView(
      {super.key, this.businessName, this.picture, this.onTap});

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
                padding: const EdgeInsets.all(20),
                child: Text(
                  businessName!,
                  style: Theme.of(context).textTheme.bodyMedium,
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}
