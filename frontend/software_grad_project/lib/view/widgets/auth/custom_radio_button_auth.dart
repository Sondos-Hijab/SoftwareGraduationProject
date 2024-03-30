import 'package:flutter/material.dart';
import 'package:software_grad_project/core/constants/colors.dart';

class CustomRadioButton extends StatelessWidget {
  final String? gender;
  final void Function(String value)? setSelectedValue;

  const CustomRadioButton({Key? key, this.gender, this.setSelectedValue})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Padding(
          padding: EdgeInsets.only(bottom: 8.0),
          child: Text(
            'Select your gender',
            style: TextStyle(
              fontSize: 16,
              color: AppColors.lightGrey,
            ),
          ),
        ),
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 10),
          decoration: BoxDecoration(
            border: Border.all(
              color: AppColors.lightGrey,
            ),
            borderRadius: BorderRadius.circular(30),
          ),
          child: DropdownButton<String>(
            padding: const EdgeInsets.symmetric(horizontal: 20),
            value: gender,
            onChanged: (String? value) {
              if (setSelectedValue != null) {
                setSelectedValue!(value!);
              }
            },
            isExpanded: true, // Make the dropdown button full width
            items: <String>['Male', 'Female'].map((String value) {
              return DropdownMenuItem<String>(
                value: value,
                child: Text(
                  value,
                  style: const TextStyle(color: AppColors.grey, fontSize: 16),
                ),
              );
            }).toList(),
            underline: const SizedBox(),
          ),
        ),
      ],
    );
  }
}
