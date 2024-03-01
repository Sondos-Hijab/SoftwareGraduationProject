import 'package:flutter/material.dart';
import 'package:software_grad_project/core/constants/colors.dart';

class MessagesPage extends StatelessWidget {
  const MessagesPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        centerTitle: true,
        backgroundColor: AppColors.appWhite,
        elevation: 0.0,
        title: Text(
          'Messages Page',
          style: Theme.of(context).textTheme.headlineSmall,
        ),
      ),
    );
  }
}
