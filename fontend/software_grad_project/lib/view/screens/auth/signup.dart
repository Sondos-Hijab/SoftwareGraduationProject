import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:software_grad_project/controller/auth/signup_controller.dart';
import 'package:software_grad_project/core/constants/colors.dart';
import 'package:software_grad_project/view/widgets/auth/customdescriptiontextauth.dart';
import 'package:software_grad_project/view/widgets/auth/customebuttonauth.dart';
import 'package:software_grad_project/view/widgets/auth/customtexttitleauth.dart';
import 'package:software_grad_project/view/widgets/auth/customtextformauth.dart';
import 'package:software_grad_project/view/widgets/auth/textsignuplogin.dart';

class SignUp extends StatelessWidget {
  const SignUp({super.key});

  @override
  Widget build(BuildContext context) {
    SignUpControllerImp controller = Get.put(SignUpControllerImp());
    return Scaffold(
      appBar: AppBar(
        centerTitle: true,
        backgroundColor: AppColors.appWhite,
        elevation: 0.0,
        title: Text(
          'Sign Up',
          style: Theme.of(context).textTheme.headlineSmall,
        ),
      ),
      body: Container(
          padding: const EdgeInsets.symmetric(horizontal: 30),
          margin: const EdgeInsets.symmetric(vertical: 40),
          child: ListView(
            children: [
              const CustomTextTitleAuth(
                titleText: "Welcome!",
              ),
              const CustomDescriptionTextAuth(
                  description: "Sign up to get an account!"),
              CustomeTextFormAuth(
                  hintText: "Enter your username",
                  labelText: "Username",
                  iconData: Icons.person_2_outlined,
                  mycontroller: controller.username),
              CustomeTextFormAuth(
                  hintText: "Enter your email",
                  labelText: "Email",
                  iconData: Icons.email_outlined,
                  mycontroller: controller.email),
              CustomeTextFormAuth(
                  hintText: "Enter your password",
                  labelText: "Password",
                  iconData: Icons.lock_outline,
                  mycontroller: controller.password),
              CustomeTextFormAuth(
                  hintText: "Confirm password",
                  labelText: "Password",
                  iconData: Icons.lock_outline,
                  mycontroller: controller.confirmPassword),
              CustomButtonAuth(
                text: "Sign Up",
                onPressed: () {},
              ),
              Container(
                  margin: const EdgeInsets.only(top: 15),
                  child: CustomTextSignUpOrLogin(
                    leftText: "Already have an account?",
                    rightText: "Sign In",
                    onTap: () => controller.goToLogin(),
                  ))
            ],
          )),
    );
  }
}
