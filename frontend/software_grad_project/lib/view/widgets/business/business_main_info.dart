import 'dart:async';
import 'dart:typed_data';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:software_grad_project/view/widgets/business/average_rates_summary_widget.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:software_grad_project/core/constants/colors.dart';
import 'package:software_grad_project/core/constants/images_assets.dart';
import 'package:software_grad_project/core/constants/routes_names.dart';
import 'package:software_grad_project/view/widgets/business/business_location.dart';

class BusinessMainInfoWidget extends StatelessWidget {
  final String? businessName;
  final Uint8List? businessImage;

  final List<Marker>? markers;
  final int? phoneNumber;
  final String? category;
  final String? description;
  final String? email;

  final Completer<GoogleMapController> gmController;
  final bool? isFollowing;

  final void Function()? onPressFollowing;
  final void Function()? onTapAddFeedback;

  const BusinessMainInfoWidget({
    super.key,
    required this.businessImage,
    required this.gmController,
    required this.markers,
    required this.isFollowing,
    required this.onPressFollowing,
    required this.businessName,
    required this.onTapAddFeedback,
    required this.phoneNumber,
    required this.category,
    required this.description,
    required this.email,
  });

  @override
  Widget build(BuildContext context) {
    return ListView(
      children: [
        Container(
          decoration: BoxDecoration(
            border: Border.all(
              color: AppColors.lightGrey,
              width: 0.3, // Adjust border width as needed
            ),
            shape: BoxShape.circle,
          ),
          child: businessImage == null
              ? const CircleAvatar(
                  radius: 100,
                  backgroundImage: AssetImage(AppImageAssets.noUserImage),
                )
              : CircleAvatar(
                  radius: 100,
                  backgroundImage: MemoryImage(businessImage!),
                ),
        ),
        Container(
          margin: const EdgeInsets.all(20),
          child: Column(
            children: [
              Text(
                textAlign: TextAlign.center,
                businessName!,
                style: Theme.of(context)
                    .textTheme
                    .headlineSmall
                    ?.copyWith(color: AppColors.primaryBlue, fontSize: 24),
              ),
              const SizedBox(
                height: 20,
              ),
              Row(
                children: [
                  const Text("Phone number:"),
                  Expanded(
                    child: Text(
                      "$phoneNumber",
                      textAlign: TextAlign.right,
                    ),
                  )
                ],
              ),
              const SizedBox(
                height: 20,
              ),
              Row(
                children: [
                  const Text("Category:"),
                  Expanded(
                    child: Text(
                      "$category",
                      textAlign: TextAlign.right,
                    ),
                  )
                ],
              ),

              const SizedBox(
                height: 20,
              ),
              Row(
                children: [
                  const Text("Admin email:"),
                  Expanded(
                    child: Text(
                      email!,
                      textAlign: TextAlign.right,
                    ),
                  )
                ],
              ),
              const SizedBox(
                height: 20,
              ),
              // Follow/Unfollow Button
              ElevatedButton(
                onPressed: onPressFollowing,
                style: ElevatedButton.styleFrom(
                  padding: const EdgeInsets.symmetric(
                      vertical: 15.0, horizontal: 100.0),
                  backgroundColor: isFollowing!
                      ? AppColors.primaryYellow
                      : AppColors.primaryBlue,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(15.0),
                  ),
                ),
                child: Text(
                  isFollowing! ? 'Unfollow' : 'Follow',
                  textAlign: TextAlign.center,
                  style: const TextStyle(
                    color: AppColors.appWhite,
                    fontSize: 16,
                  ),
                ),
              ),

              const SizedBox(
                height: 20,
              ),
              Text(
                textAlign: TextAlign.center,
                "Description",
                style: Theme.of(context)
                    .textTheme
                    .headlineSmall
                    ?.copyWith(color: AppColors.primaryDarkBlue, fontSize: 20),
              ),
              Container(
                margin: const EdgeInsets.symmetric(vertical: 20),
                padding: const EdgeInsets.all(10),
                decoration: BoxDecoration(
                  border: Border.all(color: Colors.grey.shade200),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Text(description!,
                    textAlign: TextAlign.justify,
                    style: Theme.of(context)
                        .textTheme
                        .bodyMedium!
                        .copyWith(fontSize: 16)),
              ),
              const AverageRatesSummaryWidget(),

              Text(
                textAlign: TextAlign.center,
                "Location",
                style: Theme.of(context)
                    .textTheme
                    .headlineSmall
                    ?.copyWith(color: AppColors.primaryDarkBlue, fontSize: 20),
              ),
              const SizedBox(
                height: 20,
              ),
              BusinessLocation(markers: markers!, gmController: gmController),
              const SizedBox(
                height: 20,
              ),

              Container(
                padding:
                    const EdgeInsets.symmetric(horizontal: 10, vertical: 10),
                width: double.infinity,
                child: Row(
                  children: [
                    Expanded(
                      child: InkWell(
                        onTap: onTapAddFeedback,
                        child: Container(
                          decoration: BoxDecoration(
                            color: AppColors.primaryBlue,
                            borderRadius: BorderRadius.circular(15.0),
                          ),
                          padding: const EdgeInsets.all(20),
                          child: const Column(
                            children: [
                              Icon(
                                Icons.add_a_photo_rounded,
                                size: 40,
                                color: AppColors.appWhite,
                              ),
                              Text(
                                "Add a Feedback",
                                textAlign: TextAlign.center,
                                style: TextStyle(
                                    color: AppColors.appWhite, fontSize: 14),
                              )
                            ],
                          ),
                        ),
                      ),
                    ),
                    const SizedBox(
                      width: 10,
                    ),
                    Expanded(
                      child: InkWell(
                        onTap: () {
                          Get.toNamed(AppRoutes.messagesPage);
                        },
                        child: Container(
                          decoration: BoxDecoration(
                            color: AppColors.primaryBlue,
                            borderRadius: BorderRadius.circular(15.0),
                          ),
                          padding: const EdgeInsets.all(20),
                          child: const Column(
                            children: [
                              Icon(
                                Icons.message_rounded,
                                size: 40,
                                color: AppColors.appWhite,
                              ),
                              Text(
                                "Send a Message",
                                textAlign: TextAlign.center,
                                style: TextStyle(
                                    color: AppColors.appWhite, fontSize: 14),
                              )
                            ],
                          ),
                        ),
                      ),
                    )
                  ],
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }
}
