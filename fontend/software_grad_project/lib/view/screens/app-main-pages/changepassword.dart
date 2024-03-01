import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:lottie/lottie.dart';
import 'package:software_grad_project/controller/app-main-pages-controllers/changing_password_controller.dart';
import 'package:software_grad_project/core/classes/status_request.dart';
import 'package:software_grad_project/core/constants/colors.dart';
import 'package:software_grad_project/core/constants/imagesassets.dart';
import 'package:software_grad_project/core/functions/valid_confirm_pass.dart';
import 'package:software_grad_project/core/functions/valid_input.dart';
import 'package:software_grad_project/view/widgets/auth/customdescriptiontextauth.dart';
import 'package:software_grad_project/view/widgets/auth/customebuttonauth.dart';
import 'package:software_grad_project/view/widgets/auth/customtexttitleauth.dart';
import 'package:software_grad_project/view/widgets/auth/customtextformauth.dart';

class ChangingPasswordPage extends StatelessWidget {
  const ChangingPasswordPage({super.key});

  @override
  Widget build(BuildContext context) {
    Get.put(ChangePasswordControllerImp());
    return Scaffold(
        appBar: AppBar(
          centerTitle: true,
          backgroundColor: AppColors.appWhite,
          elevation: 0.0,
          title: Text(
            'Change Password',
            style: Theme.of(context).textTheme.headlineSmall,
          ),
        ),
        body: GetBuilder<ChangePasswordControllerImp>(
          builder: (controller) => controller.statusRequest ==
                  StatusRequest.loading
              ? Center(
                  child: Lottie.asset(AppImageAssets.loading,
                      width: 250, height: 250))
              : Container(
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
                          obscureText: controller.showPassword,
                          onTapIcon: () {
                            controller.showPasswordFunction();
                          },
                          valid: (val) {
                            return validInput(val!, 6, 12, "password");
                          },
                        ),
                        CustomeTextFormAuth(
                          hintText: "Confirm your password",
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
                        CustomButtonAuth(
                          text: "Reset Password",
                          onPressed: () {
                            //resetting password in backend
                            controller.resetPassword();
                          },
                        ),
                      ],
                    ),
                  ),
                ),
        ));
  }
}
