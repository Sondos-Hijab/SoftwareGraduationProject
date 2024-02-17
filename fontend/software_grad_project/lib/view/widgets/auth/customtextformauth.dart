import 'package:flutter/material.dart';
import 'package:software_grad_project/core/constants/colors.dart';

class CustomeTextFormAuth extends StatelessWidget {
  final String hintText;
  final String labelText;
  final IconData iconData;
  final TextEditingController? mycontroller;

  const CustomeTextFormAuth(
      {super.key,
      required this.hintText,
      required this.labelText,
      required this.iconData,
      this.mycontroller});

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(top: 25),
      child: TextFormField(
        controller: mycontroller,
        decoration: InputDecoration(
          hintText: hintText,
          hintStyle: const TextStyle(fontSize: 14, color: AppColors.lightGrey),
          floatingLabelBehavior: FloatingLabelBehavior.always,
          contentPadding:
              const EdgeInsets.symmetric(horizontal: 30, vertical: 5),
          label: Container(
            margin: const EdgeInsets.symmetric(horizontal: 10),
            child: Text(
              labelText,
              style: const TextStyle(color: AppColors.lightGrey),
            ),
          ),
          suffixIcon: Icon(iconData),
          suffixIconColor: AppColors.lightGrey,
          border: OutlineInputBorder(
            borderSide: const BorderSide(color: AppColors.lightGrey),
            borderRadius: BorderRadius.circular(30),
          ),
        ),
      ),
    );
  }
}
