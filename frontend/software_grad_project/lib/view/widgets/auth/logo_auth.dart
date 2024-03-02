import 'package:flutter/material.dart';
import 'package:software_grad_project/core/constants/images_assets.dart';

class LogoAuth extends StatelessWidget {
  const LogoAuth({super.key});

  @override
  Widget build(BuildContext context) {
    return Image.asset(
      AppImageAssets.authImage,
      height: 250,
      fit: BoxFit.contain,
    );
  }
}
