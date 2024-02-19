import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:software_grad_project/controller/auth/login_controller.dart';
import 'package:software_grad_project/core/constants/colors.dart';
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
      body: Container(
          padding: const EdgeInsets.symmetric(horizontal: 30),
          child: ListView(
            children: [
              const CustomTextTitleAuth(
                titleText: "Welcome Back!",
              ),
              const LogoAuth(),
              const CustomDescriptionTextAuth(
                  description: "Sign in to access personalized experiences!"),
              CustomeTextFormAuth(
                hintText: "Enter your email",
                labelText: "Email",
                iconData: Icons.email_outlined,
                mycontroller: controller.email,
              ),
              CustomeTextFormAuth(
                  hintText: "Enter your password",
                  labelText: "Password",
                  iconData: Icons.lock_outline,
                  mycontroller: controller.password),
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
                onPressed: () {},
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
          )),
    );
  }
}
