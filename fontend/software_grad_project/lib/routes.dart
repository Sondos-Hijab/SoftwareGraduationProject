import 'package:flutter/material.dart';
import 'package:software_grad_project/core/constants/routesnames.dart';
import 'package:software_grad_project/view/screens/auth/login.dart';

Map<String, Widget Function(BuildContext)> routes = {
  AppRoutes.login: (context) => const Login(),
};
