import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:software_grad_project/controller/auth/forgot_password/success_reset_password_controller.dart';
import 'package:software_grad_project/core/constants/colors.dart';
import 'package:software_grad_project/view/widgets/auth/custom_button_auth.dart';

class SuccessResetPassword extends StatelessWidget {
  const SuccessResetPassword({super.key});

  @override
  Widget build(BuildContext context) {
    Get.lazyPut(() => SuccessResetPasswordControllerImp());
    return Scaffold(
        appBar: AppBar(
          centerTitle: true,
          backgroundColor: AppColors.appWhite,
          elevation: 0.0,
          title: Text(
            'Success',
            style: Theme.of(context).textTheme.headlineSmall,
          ),
        ),
        body: GetBuilder<SuccessResetPasswordControllerImp>(
          builder: (controller) => Container(
            padding: const EdgeInsets.all(15),
            margin: const EdgeInsets.symmetric(vertical: 30),
            child: Column(
              children: [
                const Center(
                  child: Icon(
                    Icons.check_circle_outline,
                    size: 200,
                    color: AppColors.primaryBlue,
                  ),
                ),
                Text(
                  "Success resetting password!",
                  style: Theme.of(context).textTheme.headlineLarge,
                  textAlign: TextAlign.center,
                ),
                const SizedBox(
                  height: 25,
                ),
                Text(
                  "You can sign in to your account using your new password now",
                  style: Theme.of(context).textTheme.bodyMedium,
                  textAlign: TextAlign.center,
                ),
                const Spacer(),
                SizedBox(
                  width: double.infinity,
                  child: CustomButtonAuth(
                    text: "Sign in",
                    onPressed: () {
                      controller.goToLoginPage();
                    },
                  ),
                ),
              ],
            ),
          ),
        ));
  }
}
