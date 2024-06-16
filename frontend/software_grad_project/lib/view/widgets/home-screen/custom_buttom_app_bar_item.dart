import 'package:flutter/material.dart';

class CustomButtomAppBarItem extends StatelessWidget {
  final void Function()? onPressed;
  final String textButton;
  final IconData iconData;
  final Color color;
  final String badgeContent;

  const CustomButtomAppBarItem({
    super.key,
    this.onPressed,
    required this.textButton,
    required this.iconData,
    required this.color,
    required this.badgeContent,
  });

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        MaterialButton(
          onPressed: onPressed,
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Icon(
                iconData,
                color: color,
                size: 30,
              ),
              Text(
                textButton,
                style: TextStyle(color: color),
              ),
            ],
          ),
        ),
        badgeContent.isNotEmpty
            ? Positioned(
                top: 5,
                right: 5,
                child: CircleAvatar(
                  radius: 8,
                  backgroundColor: Colors.red,
                  child: Text(
                    badgeContent,
                    style: TextStyle(
                      fontSize: 10,
                      color: Colors.white,
                    ),
                  ),
                ),
              )
            : Container(),
      ],
    );
  }
}
