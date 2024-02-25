import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:software_grad_project/controller/app-main-pages-controllers/success_changing_password_controller.dart';
import 'package:software_grad_project/core/constants/colors.dart';
import 'package:software_grad_project/view/widgets/auth/customebuttonauth.dart';

class SuccessChangingPassword extends StatelessWidget {
  const SuccessChangingPassword({super.key});

  @override
  Widget build(BuildContext context) {
    Get.lazyPut(() => SuccessChangingPasswordControllerImp());
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
        body: GetBuilder<SuccessChangingPasswordControllerImp>(
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
                  "Success changing password!",
                  style: Theme.of(context).textTheme.headlineLarge,
                  textAlign: TextAlign.center,
                ),
                const SizedBox(
                  height: 25,
                ),
                Text(
                  "You can use your account with your new password now",
                  style: Theme.of(context).textTheme.bodyMedium,
                  textAlign: TextAlign.center,
                ),
                const Spacer(),
                SizedBox(
                  width: double.infinity,
                  child: CustomButtonAuth(
                    text: "Go to profile",
                    onPressed: () {
                      controller.goToProfilePage();
                    },
                  ),
                ),
              ],
            ),
          ),
        ));
  }
}
