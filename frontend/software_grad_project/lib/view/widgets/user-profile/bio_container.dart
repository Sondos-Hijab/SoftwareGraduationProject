import 'package:flutter/material.dart';
import 'package:software_grad_project/core/constants/colors.dart';

class BioContainer extends StatelessWidget {
  final bool me;
  final TextEditingController bioTextEditingController;
  final void Function()? onPressed;
  final bool? isEditingBio;

  const BioContainer(
      {super.key,
      required this.bioTextEditingController,
      this.onPressed,
      this.isEditingBio,
      required this.me});

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
              readOnly: (me == true && isEditingBio != null)
                  ? !(isEditingBio!)
                  : false,
              maxLines: 2,
              textAlign: TextAlign.center,
              controller: bioTextEditingController,
              style: Theme.of(context).textTheme.bodyMedium,
              decoration: const InputDecoration(
                border: InputBorder.none,
              ),
            ),
            const SizedBox(height: 10),
            (me == true && isEditingBio != null)
                ? ElevatedButton(
                    onPressed: onPressed,
                    style: ButtonStyle(
                      backgroundColor: MaterialStateProperty.all<Color>(
                          AppColors.primaryDarkBlue),
                    ),
                    child: Text(
                      isEditingBio! ? "Save Bio" : "Edit Bio",
                      style: const TextStyle(color: Colors.white),
                    ),
                  )
                : const Text(""),
          ],
        ),
      ),
    );
  }
}
