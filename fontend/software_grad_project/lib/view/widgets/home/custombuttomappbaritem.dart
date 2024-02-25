import 'package:flutter/material.dart';

class CustomButtomAppBarItem extends StatelessWidget {
  final void Function()? onPressed;
  final String textButton;
  final IconData iconData;
  final Color color;
  const CustomButtomAppBarItem(
      {super.key,
      this.onPressed,
      required this.textButton,
      required this.iconData,
      required this.color});

  @override
  Widget build(BuildContext context) {
    return MaterialButton(
      onPressed: onPressed,
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(iconData, color: color),
          Text(
            textButton,
            style: TextStyle(color: color),
          )
        ],
      ),
    );
  }
}
