import 'package:flutter/material.dart';
import 'package:software_grad_project/core/constants/colors.dart';
import 'package:software_grad_project/view/widgets/auth/customdescriptiontextauth.dart';
import 'package:software_grad_project/view/widgets/auth/customebuttonauth.dart';
import 'package:software_grad_project/view/widgets/auth/customtexttitleauth.dart';
import 'package:software_grad_project/view/widgets/auth/customtextformauth.dart';
import 'package:software_grad_project/view/widgets/auth/logoauth.dart';

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
          padding: const EdgeInsets.symmetric(horizontal: 30),
          child: ListView(
            children: [
              const CustomTextTitleAuth(
                titleText: "Welcome Back",
              ),
              const LogoAuth(),
              const CustomDescriptionTextAuth(
                  description: "Sign in to access personalized experiences!"),
              const CustomeTextFormAuth(
                hintText: "Enter your email",
                labelText: "Email",
                iconData: Icons.email_outlined,
                //mycontroller:
              ),
              const CustomeTextFormAuth(
                hintText: "Enter your password",
                labelText: "Password",
                iconData: Icons.lock_outline,
                //mycontroller:
              ),
              Text(
                "Forgot password?",
                textAlign: TextAlign.end,
                style: Theme.of(context).textTheme.bodySmall,
              ),
              CustomButtonAuth(
                text: "Sign In",
                onPressed: () {},
              ),
              Container(
                margin: const EdgeInsets.only(top: 15),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text(
                      "Don't have an account? ",
                      style: Theme.of(context).textTheme.bodySmall,
                    ),
                    const InkWell(
                      child: Text(
                        "Sign Up",
                        style: TextStyle(
                            color: AppColors.primaryBlue,
                            fontSize: 14,
                            fontWeight: FontWeight.bold),
                      ),
                    )
                  ],
                ),
              )
            ],
          )),
    );
  }
}
