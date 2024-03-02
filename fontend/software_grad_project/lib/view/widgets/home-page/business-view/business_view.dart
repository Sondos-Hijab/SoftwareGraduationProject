import 'package:flutter/material.dart';
import 'package:software_grad_project/core/constants/images_assets.dart';
import 'package:software_grad_project/data/datasource/static/static.dart';

class BusinessViewItem extends StatelessWidget {
  final int index;
  final Function()? onTap;
  const BusinessViewItem({super.key, required this.index, required this.onTap});

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.only(top: 20, left: 20, right: 20),
      color: Colors.white,
      child: InkWell(
        onTap: onTap,
        child: Padding(
          padding: const EdgeInsets.all(10),
          child: Row(
            children: [
              businessViewList[index].imageFile != null
                  ? CircleAvatar(
                      radius: 30,
                      backgroundImage:
                          FileImage(businessViewList[index].imageFile!),
                    )
                  : const CircleAvatar(
                      radius: 30,
                      backgroundImage: AssetImage(AppImageAssets.noUserImage),
                    ),
              Padding(
                padding: const EdgeInsets.all(20),
                child: Text(
                  businessViewList[index].businessName!,
                  style: Theme.of(context).textTheme.bodyMedium,
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}
