import 'package:flutter/material.dart';
import 'package:software_grad_project/core/constants/colors.dart';

class QuickLinkButton extends StatelessWidget {
  final String internalText;
  final IconData iconData;
  final void Function()? onTap;
  const QuickLinkButton(
      {super.key,
      required this.internalText,
      required this.iconData,
      required this.onTap});

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: InkWell(
        onTap: onTap,
        child: Container(
          decoration: BoxDecoration(
            color: AppColors.primaryBlue,
            borderRadius: BorderRadius.circular(15.0),
          ),
          padding: const EdgeInsets.all(20),
          child: Column(
            children: [
              Icon(
                iconData,
                size: 40,
                color: AppColors.appWhite,
              ),
              Text(
                internalText,
                style: const TextStyle(color: AppColors.appWhite),
              )
            ],
          ),
        ),
      ),
    );
  }
}
