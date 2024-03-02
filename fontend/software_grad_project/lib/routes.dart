import 'package:get/get.dart';
import 'package:software_grad_project/core/middleware/middleware.dart';
import 'package:software_grad_project/test-widgets-screens-controllers/testwidget.dart';
import 'package:software_grad_project/view/screens/app-main-pages/business_page.dart';
import 'package:software_grad_project/view/screens/app-main-pages/user-profile-related-pages/change_password.dart';
import 'package:software_grad_project/view/screens/app-main-pages/user-profile-related-pages/success_changing_password.dart';
import 'package:software_grad_project/view/screens/auth/forgot-password/verify_code.dart';
import 'package:software_grad_project/view/screens/auth/success_signup.dart';
import 'package:software_grad_project/view/screens/app-main-pages/home_page.dart';
import 'package:software_grad_project/view/screens/app-main-pages/messages_page.dart';
import 'package:software_grad_project/view/screens/app-main-pages/user-profile-related-pages/profile_page.dart';
import 'package:software_grad_project/view/screens/app-main-pages/search_page.dart';
import 'package:software_grad_project/view/screens/app-main-pages/home_screen.dart';
import 'package:software_grad_project/view/screens/onboarding/onboarding.dart';
import 'package:software_grad_project/core/constants/routes_names.dart';
import 'package:software_grad_project/view/screens/auth/forgot-password/forgot_password.dart';
import 'package:software_grad_project/view/screens/auth/login.dart';
import 'package:software_grad_project/view/screens/auth/forgot-password/reset_password.dart';
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

  //business page
    GetPage(name: AppRoutes.businessPage, page: () => const BusinessPage()),

  //testing purposes
  GetPage(name: AppRoutes.test, page: () => const TestWidget()),
];
