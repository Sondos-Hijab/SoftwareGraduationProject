import 'package:flutter/material.dart';
import 'package:software_grad_project/core/constants/colors.dart';
import 'package:software_grad_project/view/widgets/auth/customdescriptiontextauth.dart';
import 'package:software_grad_project/view/widgets/auth/customtexttitleauth.dart';
import 'package:software_grad_project/view/widgets/auth/customtextformauth.dart';

class Login extends StatelessWidget {
  const Login({super.key});

  @override
  Widget build(BuildContext context) {
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
          padding: const EdgeInsets.symmetric(horizontal: 30, vertical: 15),
          child: ListView(
            children: const [
              CustomTextTitleAuth(
                titleText: "Welcome Back",
              ),
              CustomDescriptionTextAuth(
                  description:
                      "Unlock a world of possibilities. Sign in to access exclusive features and personalized experiences!"),
              SizedBox(
                height: 20,
              ),
              CustomeTextFormAuth(
                hintText: "Enter your email",
                labelText: "Email",
                iconData: Icons.email_outlined,
                //mycontroller:
              ),
              CustomeTextFormAuth(
                hintText: "Enter your password",
                labelText: "Password",
                iconData: Icons.lock_outline,
                //mycontroller:
              ),
            ],
          )),
    );
  }
}
