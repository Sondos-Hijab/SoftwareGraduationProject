import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:lottie/lottie.dart';
import 'package:software_grad_project/controller/auth/forgot_password/forgot_password_controller.dart';
import 'package:software_grad_project/core/constants/colors.dart';
import 'package:software_grad_project/core/constants/imagesassets.dart';
import 'package:software_grad_project/core/functions/valid_input.dart';
import 'package:software_grad_project/view/widgets/auth/customdescriptiontextauth.dart';
import 'package:software_grad_project/view/widgets/auth/customebuttonauth.dart';
import 'package:software_grad_project/view/widgets/auth/customtexttitleauth.dart';
import 'package:software_grad_project/view/widgets/auth/customtextformauth.dart';
import 'package:software_grad_project/core/classes/status_request.dart';

class ForgotPassword extends StatelessWidget {
  const ForgotPassword({super.key});

  @override
  Widget build(BuildContext context) {
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
        body: GetBuilder<ForgotPasswordControllerImp>(
          builder: (controller) =>
              controller.statusRequest == StatusRequest.loading
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
                              titleText: "Check Email",
                            ),
                            const CustomDescriptionTextAuth(
                                description:
                                    "Enter your email to reset you password"),
                            CustomeTextFormAuth(
                              hintText: "Enter your email",
                              labelText: "Email",
                              iconData: Icons.email_outlined,
                              mycontroller: controller.email,
                              valid: (val) => validInput(val!, 8, 30, "email"),
                            ),
                            CustomButtonAuth(
                              text: "Confirm",
                              onPressed: () {
                                //checking email in backend
                                controller.checkEmailandGoToVerifyCode();
                              },
                            ),
                          ],
                        ),
                      )),
        ));
  }
}
