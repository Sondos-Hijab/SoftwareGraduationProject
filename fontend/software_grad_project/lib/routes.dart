import 'package:flutter/material.dart';
import 'package:software_grad_project/core/constants/routesnames.dart';
import 'package:software_grad_project/view/screens/auth/forgotpassword.dart';
import 'package:software_grad_project/view/screens/auth/login.dart';
import 'package:software_grad_project/view/screens/auth/resetpassword.dart';
import 'package:software_grad_project/view/screens/auth/signup.dart';
import 'package:software_grad_project/view/screens/onboarding.dart';

Map<String, Widget Function(BuildContext)> routes = {
  //authentication
  AppRoutes.login: (context) => const Login(),
  AppRoutes.signup: (context) => const SignUp(),
  AppRoutes.forgotPassword: (context) => const ForgotPassword(),
  AppRoutes.resetPassword: (context) => const ResetPassword(),
  //onboarding
  AppRoutes.onBoarding: (context) => const OnBoarding(),
};
