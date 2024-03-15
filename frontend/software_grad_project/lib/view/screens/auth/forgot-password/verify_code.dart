import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:lottie/lottie.dart';
import 'package:software_grad_project/controller/auth/forgot_password/verify_code_controller.dart';
import 'package:software_grad_project/core/classes/status_request.dart';
import 'package:software_grad_project/core/constants/colors.dart';
import 'package:software_grad_project/core/constants/images_assets.dart';
import 'package:software_grad_project/view/widgets/auth/custom_description_text_auth.dart';
import 'package:software_grad_project/view/widgets/auth/custom_text_title_auth.dart';
import 'package:flutter_otp_text_field/flutter_otp_text_field.dart';

class VerfiyCode extends StatelessWidget {
  const VerfiyCode({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    Get.put(VerifyCodeControllerImp());
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
        body: GetBuilder<VerifyCodeControllerImp>(
          builder: (controller) => controller.statusRequest ==
                  StatusRequest.loading
              ? Center(
                  child: Lottie.asset(AppImageAssets.loading,
                      width: 250, height: 250))
              : Container(
                  padding:
                      const EdgeInsets.symmetric(vertical: 15, horizontal: 30),
                  child: ListView(children: [
                    const SizedBox(height: 20),
                    const CustomTextTitleAuth(titleText: "Check code"),
                    const SizedBox(height: 10),
                    CustomDescriptionTextAuth(
                        description:
                            "Please Enter The Digit Code Sent To  ${controller.email}"),
                    const SizedBox(height: 15),
                    OtpTextField(
                      fieldWidth: 50.0,
                      borderRadius: BorderRadius.circular(20),
                      numberOfFields: 5,
                      borderColor: AppColors.primaryGreen,
                      //set to true to show as box or false to show as dash
                      showFieldAsBox: true,
                      //runs when a code is typed in
                      onCodeChanged: (String code) {
                        //handle validation or checks here
                      },
                      //runs when every textfield is filled
                      onSubmit: (String verificationCode) {
                        controller.goToResetPassword(verificationCode);
                      }, // end onSubmit
                    ),
                    const SizedBox(height: 40),
                  ]),
                ),
        ));
  }
}
