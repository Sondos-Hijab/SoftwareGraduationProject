import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:software_grad_project/controller/auth/forgot_password_controller.dart';
import 'package:software_grad_project/core/constants/colors.dart';
import 'package:software_grad_project/view/widgets/auth/customdescriptiontextauth.dart';
import 'package:software_grad_project/view/widgets/auth/customebuttonauth.dart';
import 'package:software_grad_project/view/widgets/auth/customtexttitleauth.dart';
import 'package:software_grad_project/view/widgets/auth/customtextformauth.dart';

class ForgotPassword extends StatelessWidget {
  const ForgotPassword({super.key});

  @override
  Widget build(BuildContext context) {
    ForgotPasswordControllerImp controller =
        Get.put(ForgotPasswordControllerImp());
    return Scaffold(
      appBar: AppBar(
        centerTitle: true,
        backgroundColor: AppColors.appWhite,
        elevation: 0.0,
        title: Text(
          'Forgot Password',
          style: Theme.of(context).textTheme.headlineSmall,
        ),
      ),
      body: Container(
          padding: const EdgeInsets.symmetric(horizontal: 30),
          child: ListView(
            children: [
              const CustomTextTitleAuth(
                titleText: "Check Email",
              ),
              const CustomDescriptionTextAuth(
                  description: "Enter your email to reset you password"),
              CustomeTextFormAuth(
                  hintText: "Enter your email",
                  labelText: "Email",
                  iconData: Icons.email_outlined,
                  mycontroller: controller.email),
              CustomButtonAuth(
                text: "Confirm",
                onPressed: () {
                  //checking email in backend
                  controller.goToResetPassword();
                },
              ),
            ],
          )),
    );
  }
}
