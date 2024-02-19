import 'package:flutter/material.dart';
import 'package:software_grad_project/view/screens/auth/success_signup.dart';
import 'package:software_grad_project/view/screens/onboarding.dart';
import 'package:software_grad_project/core/constants/routesnames.dart';
import 'package:software_grad_project/view/screens/auth/forgot-password/forgotpassword.dart';
import 'package:software_grad_project/view/screens/auth/login.dart';
import 'package:software_grad_project/view/screens/auth/forgot-password/resetpassword.dart';
import 'package:software_grad_project/view/screens/auth/signup.dart';
import 'package:software_grad_project/view/screens/auth/forgot-password/success_reset_password.dart';

Map<String, Widget Function(BuildContext)> routes = {
  //authentication
  AppRoutes.login: (context) => const Login(),
  AppRoutes.signup: (context) => const SignUp(),
  AppRoutes.forgotPassword: (context) => const ForgotPassword(),
  AppRoutes.resetPassword: (context) => const ResetPassword(),
  AppRoutes.successPageAfterReset: (context) => const SuccessResetPassword(),
  AppRoutes.successPageAfterSignUp: (context) => const SuccessSignUp(),
  //onboarding
  AppRoutes.onBoarding: (context) => const OnBoarding(),
};
