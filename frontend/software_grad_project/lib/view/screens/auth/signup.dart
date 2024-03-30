import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:software_grad_project/controller/auth/signup_controller.dart';
import 'package:software_grad_project/core/constants/colors.dart';
import 'package:software_grad_project/core/functions/alert_exit_app.dart';
import 'package:software_grad_project/core/functions/valid_confirm_pass.dart';
import 'package:software_grad_project/core/functions/valid_input.dart';
import 'package:software_grad_project/view/widgets/auth/custom_description_text_auth.dart';
import 'package:software_grad_project/view/widgets/auth/custom_button_auth.dart';
import 'package:software_grad_project/view/widgets/auth/custom_radio_button_auth.dart';
import 'package:software_grad_project/view/widgets/auth/custom_text_title_auth.dart';
import 'package:software_grad_project/view/widgets/auth/custom_text_form_auth.dart';
import 'package:software_grad_project/view/widgets/auth/text_signup_login.dart';

class SignUp extends StatelessWidget {
  const SignUp({super.key});

  @override
  Widget build(BuildContext context) {
    Get.lazyPut(() => SignUpControllerImp());
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
        // ignore: deprecated_member_use
        body: WillPopScope(
            onWillPop: alertExitApp,
            child: GetBuilder<SignUpControllerImp>(
              builder: (controller) => Container(
                  padding: const EdgeInsets.symmetric(horizontal: 30),
                  margin: const EdgeInsets.symmetric(vertical: 20),
                  child: Form(
                    key: controller.formState,
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
                          mycontroller: controller.username,
                          valid: (val) {
                            return validInput(val!, 4, 30, "username");
                          },
                        ),
                        CustomeTextFormAuth(
                          hintText: "Enter your email",
                          labelText: "Email",
                          iconData: Icons.email_outlined,
                          mycontroller: controller.email,
                          valid: (val) {
                            return validInput(val!, 8, 30, "email");
                          },
                        ),
                        CustomeTextFormAuth(
                          hintText: "Enter your password",
                          labelText: "Password",
                          iconData: Icons.lock_outline,
                          obscureText: controller.showPassword,
                          onTapIcon: () {
                            controller.showPasswordFunction();
                          },
                          mycontroller: controller.password,
                          valid: (val) {
                            return validInput(val!, 6, 20, "password");
                          },
                        ),
                        CustomeTextFormAuth(
                          hintText: "Confirm password",
                          labelText: "Password",
                          iconData: Icons.lock_outline,
                          obscureText: controller.showConfirmPassword,
                          onTapIcon: () {
                            controller.showConfirmPasswordFunction();
                          },
                          mycontroller: controller.confirmPassword,
                          valid: (val) {
                            return validPass(controller.password.text, val!);
                          },
                        ),
                        CustomeTextFormAuth(
                          hintText: "Age",
                          labelText: "Age",
                          iconData: Icons.date_range_rounded,
                          mycontroller: controller.age,
                          valid: (val) {
                            return validInput(val!, 1, 3, "age");
                          },
                        ),
                        CustomRadioButton(
                          gender: controller.selectedGender,
                          setSelectedValue: controller.setSelectedGender,
                        ),
                        CustomButtonAuth(
                          text: "Sign Up",
                          onPressed: () {
                            controller.signup();
                          },
                        ),
                        Container(
                            margin: const EdgeInsets.only(top: 15),
                            child: CustomTextSignUpOrLogin(
                              leftText: "Already have an account?",
                              rightText: "Sign In",
                              onTap: () => controller.goToLogin(),
                            ))
                      ],
                    ),
                  )),
            )));
  }
}
