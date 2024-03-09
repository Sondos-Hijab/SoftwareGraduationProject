import 'package:flutter/material.dart';
import 'package:software_grad_project/core/constants/colors.dart';

class CustomButtonAuth extends StatelessWidget {
  final String text;
  final void Function()? onPressed;
  const CustomButtonAuth({super.key, required this.text, this.onPressed});

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(top: 15),
      child: MaterialButton(
        padding: const EdgeInsets.symmetric(vertical: 12),
        shape: const RoundedRectangleBorder(
            borderRadius: BorderRadius.all(Radius.circular(20))),
        onPressed: onPressed,
        color: AppColors.primaryBlue,
        textColor: Colors.white,
        child: Text(
          text,
          style: const TextStyle(fontSize: 16),
        ),
      ),
    );
  }
}
