import 'package:get/get.dart';
import 'package:software_grad_project/core/middleware/middleware.dart';
import 'package:software_grad_project/testwidget.dart';
import 'package:software_grad_project/view/screens/app-main-pages/changepassword.dart';
import 'package:software_grad_project/view/screens/app-main-pages/successchangingpassword.dart';
import 'package:software_grad_project/view/screens/auth/forgot-password/verifycode.dart';
import 'package:software_grad_project/view/screens/auth/success_signup.dart';
import 'package:software_grad_project/view/screens/app-main-pages/homepage.dart';
import 'package:software_grad_project/view/screens/app-main-pages/messagespage.dart';
import 'package:software_grad_project/view/screens/app-main-pages/profilepage.dart';
import 'package:software_grad_project/view/screens/app-main-pages/searchpage.dart';
import 'package:software_grad_project/view/screens/app-main-pages/homescreen.dart';
import 'package:software_grad_project/view/screens/onboarding.dart';
import 'package:software_grad_project/core/constants/routesnames.dart';
import 'package:software_grad_project/view/screens/auth/forgot-password/forgotpassword.dart';
import 'package:software_grad_project/view/screens/auth/login.dart';
import 'package:software_grad_project/view/screens/auth/forgot-password/resetpassword.dart';
import 'package:software_grad_project/view/screens/auth/signup.dart';
import 'package:software_grad_project/view/screens/auth/forgot-password/success_reset_password.dart';
// import 'package:software_grad_project/view/testview.dart';

List<GetPage<dynamic>>? routes = [
  //OnBoarding
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

  //bottom app bar pages
  GetPage(name: AppRoutes.homeScreen, page: () => const HomeScreen()),
  GetPage(name: AppRoutes.homePage, page: () => const HomePage()),
  GetPage(name: AppRoutes.profilePage, page: () => const ProfilePage()),
  GetPage(name: AppRoutes.messagesPage, page: () => const MessagesPage()),
  GetPage(name: AppRoutes.searchPage, page: () => const SearchPage()),

  //changing password
  GetPage(
      name: AppRoutes.changePassword, page: () => const ChangingPasswordPage()),
  GetPage(
      name: AppRoutes.successAfterChangePassword,
      page: () => const SuccessChangingPassword()),

  //testing purposes
  GetPage(name: AppRoutes.test, page: () => const TestWidget()),
];
