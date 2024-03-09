import 'package:flutter/material.dart';
import 'package:software_grad_project/core/constants/colors.dart';

class CustomTextSignUpOrLogin extends StatelessWidget {
  final String? leftText;
  final String? rightText;
  final void Function()? onTap;

  const CustomTextSignUpOrLogin(
      {super.key, required this.leftText, required this.rightText, required this.onTap});

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Text(
          leftText!,
          style: Theme.of(context).textTheme.bodySmall,
        ),
        InkWell(
          onTap: onTap,
          child: Text(
            rightText!,
            style: const TextStyle(
                color: AppColors.primaryBlue,
                fontSize: 14,
                fontWeight: FontWeight.bold),
          ),
        )
      ],
    );
  }
}
