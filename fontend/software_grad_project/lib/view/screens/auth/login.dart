import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:software_grad_project/controller/auth/login_controller.dart';
import 'package:software_grad_project/core/constants/colors.dart';
import 'package:software_grad_project/core/functions/alert_exit_app.dart';
import 'package:software_grad_project/core/functions/valid_input.dart';
import 'package:software_grad_project/view/widgets/auth/customdescriptiontextauth.dart';
import 'package:software_grad_project/view/widgets/auth/customebuttonauth.dart';
import 'package:software_grad_project/view/widgets/auth/customtexttitleauth.dart';
import 'package:software_grad_project/view/widgets/auth/customtextformauth.dart';
import 'package:software_grad_project/view/widgets/auth/logoauth.dart';
import 'package:software_grad_project/view/widgets/auth/textsignuplogin.dart';

class Login extends StatelessWidget {
  const Login({super.key});

  @override
  Widget build(BuildContext context) {
    LoginControllerImp controller = Get.put(LoginControllerImp());
    return Scaffold(
      appBar: AppBar(
        centerTitle: true,
        backgroundColor: AppColors.appWhite,
        elevation: 0.0,
        title: Text(
          'Sign In',
          style: Theme.of(context).textTheme.headlineSmall,
        ),
      ),
      // ignore: deprecated_member_use
      body: WillPopScope(
        onWillPop: alertExitApp,
        child: Container(
          padding: const EdgeInsets.symmetric(horizontal: 30),
          child: Form(
            key: controller.formState,
            child: ListView(
              children: [
                const CustomTextTitleAuth(
                  titleText: "Welcome Back!",
                ),
                const LogoAuth(),
                const CustomDescriptionTextAuth(
                    description: "Sign in to access personalized experiences!"),
                CustomeTextFormAuth(
                  hintText: "Enter your username",
                  labelText: "Username",
                  iconData: Icons.person_2_outlined,
                  mycontroller: controller.username,
                  valid: (val) {
                    return validInput(val!, 4, 10, "username");
                  },
                ),
                GetBuilder<LoginControllerImp>(builder: (controller) {
                  return CustomeTextFormAuth(
                    hintText: "Enter your password",
                    labelText: "Password",
                    iconData: Icons.lock_outline,
                    obscureText: controller.showPassword,
                    onTapIcon: () {
                      controller.showPasswordFunction();
                    },
                    mycontroller: controller.password,
                    valid: (val) {
                      return validInput(val!, 6, 12, "password");
                    },
                  );
                }),
                InkWell(
                  onTap: () => controller.goToForgotPassword(),
                  child: Text(
                    "Forgot password?",
                    textAlign: TextAlign.end,
                    style: Theme.of(context).textTheme.bodySmall,
                  ),
                ),
                CustomButtonAuth(
                  text: "Sign In",
                  onPressed: () {
                    controller.login();
                  },
                ),
                Container(
                  margin: const EdgeInsets.only(top: 15),
                  child: CustomTextSignUpOrLogin(
                    leftText: "Don't have an account? ",
                    rightText: "Sign Up",
                    onTap: () {
                      controller.goToSignUp();
                    },
                  ),
                )
              ],
            ),
          ),
        ),
      ),
    );
  }
}
