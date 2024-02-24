import 'package:get/get.dart';
import 'package:software_grad_project/core/middleware/middleware.dart';
import 'package:software_grad_project/testwidget.dart';
import 'package:software_grad_project/view/screens/auth/forgot-password/verifycode.dart';
import 'package:software_grad_project/view/screens/auth/success_signup.dart';
import 'package:software_grad_project/view/screens/home.dart';
import 'package:software_grad_project/view/screens/onboarding.dart';
import 'package:software_grad_project/core/constants/routesnames.dart';
import 'package:software_grad_project/view/screens/auth/forgot-password/forgotpassword.dart';
import 'package:software_grad_project/view/screens/auth/login.dart';
import 'package:software_grad_project/view/screens/auth/forgot-password/resetpassword.dart';
import 'package:software_grad_project/view/screens/auth/signup.dart';
import 'package:software_grad_project/view/screens/auth/forgot-password/success_reset_password.dart';
// import 'package:software_grad_project/view/testview.dart';

List<GetPage<dynamic>>? routes = [
  GetPage(
      name: AppRoutes.onBoarding,
      page: () => const OnBoarding(),
      middlewares: [MyMiddleWare()]),
  //authentication
  GetPage(name: AppRoutes.login, page: () => const Login()),
  GetPage(name: AppRoutes.signup, page: () => const SignUp()),
  GetPage(name: AppRoutes.forgotPassword, page: () => const ForgotPassword()),
  GetPage(name: AppRoutes.resetPassword, page: () => const ResetPassword()),
  GetPage(name: AppRoutes.verifyCode, page: () => const VerfiyCode()),

  GetPage(
      name: AppRoutes.successPageAfterReset,
      page: () => const SuccessResetPassword()),
  GetPage(
      name: AppRoutes.successPageAfterSignUp,
      page: () => const SuccessSignUp()),

  GetPage(name: AppRoutes.homePage, page: () => const HomePage()),

  //OnBoarding
  // GetPage(name: AppRoutes.onBoarding, page: () => const OnBoarding())
  GetPage(name: AppRoutes.test, page: () => const TestWidget()),
];
