import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:software_grad_project/controller/auth/forgot_password_controller.dart';
import 'package:software_grad_project/controller/auth/reset_password_controller.dart';
import 'package:software_grad_project/core/constants/colors.dart';
import 'package:software_grad_project/core/functions/valid_input.dart';
import 'package:software_grad_project/view/widgets/auth/customdescriptiontextauth.dart';
import 'package:software_grad_project/view/widgets/auth/customebuttonauth.dart';
import 'package:software_grad_project/view/widgets/auth/customtexttitleauth.dart';
import 'package:software_grad_project/view/widgets/auth/customtextformauth.dart';

class ResetPassword extends StatelessWidget {
  const ResetPassword({super.key});

  @override
  Widget build(BuildContext context) {
    ResetPasswordControllerImp controller =
        Get.put(ResetPasswordControllerImp());
    return Scaffold(
      appBar: AppBar(
        centerTitle: true,
        backgroundColor: AppColors.appWhite,
        elevation: 0.0,
        title: Text(
          'Reset Password',
          style: Theme.of(context).textTheme.headlineSmall,
        ),
      ),
      body: Container(
          padding: const EdgeInsets.symmetric(horizontal: 30),
          child: Form(
            key: controller.formState,
            child: ListView(
              children: [
                const CustomTextTitleAuth(
                  titleText: "New Password",
                ),
                const CustomDescriptionTextAuth(
                    description: "Please enter the new password"),
                CustomeTextFormAuth(
                  hintText: "Enter your password",
                  labelText: "Password",
                  iconData: Icons.lock_outline,
                  mycontroller: controller.password,
                  valid: (val) {
                    return validInput(val!, 6, 12, "password");
                  },
                ),
                CustomeTextFormAuth(
                  hintText: "Confirm your password",
                  labelText: "Password",
                  iconData: Icons.lock_outline,
                  mycontroller: controller.confirmPassword,
                  valid: (val) {
                    return validInput(val!, 6, 12, "password");
                  },
                ),
                CustomButtonAuth(
                  text: "Reset Password",
                  onPressed: () {
                    //resetting password in backend
                    controller.resetPassword();
                  },
                ),
              ],
            ),
          )),
    );
  }
}
