import 'package:flutter/material.dart';
import 'package:software_grad_project/core/constants/colors.dart';

class BioContainer extends StatelessWidget {
  final TextEditingController bioTextEditingController;
  final void Function()? onPressed;
  final bool isEditingBio;

  const BioContainer(
      {super.key,
      required this.bioTextEditingController,
      required this.onPressed,
      required this.isEditingBio});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(20.0),
      child: Container(
        decoration: BoxDecoration(
          border: Border.all(
            color: AppColors.lightGrey,
          ),
          borderRadius: BorderRadius.circular(5.0),
        ),
        padding: const EdgeInsets.all(10.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            TextFormField(
              readOnly: !isEditingBio,
              maxLines: 2,
              textAlign: TextAlign.center,
              controller: bioTextEditingController,
              style: Theme.of(context).textTheme.bodyMedium,
              decoration: const InputDecoration(
                border: InputBorder.none,
              ),
            ),
            const SizedBox(height: 10),
            ElevatedButton(
              onPressed: onPressed,
              style: ButtonStyle(
                backgroundColor:
                    MaterialStateProperty.all<Color>(AppColors.primaryDarkBlue),
              ),
              child: Text(
                isEditingBio ? "Save Bio" : "Edit Bio",
                style: const TextStyle(color: Colors.white),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
