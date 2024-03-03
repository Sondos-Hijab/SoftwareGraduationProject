import 'dart:async';
import 'dart:io';
import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:software_grad_project/core/constants/colors.dart';
import 'package:software_grad_project/view/widgets/business/business_location.dart';

class BusinessMainInfoWidget extends StatelessWidget {
  final Completer<GoogleMapController> gmController;

  final List<Marker> markers;
  final CameraPosition businessLocation;
  final File? businessImage;
  const BusinessMainInfoWidget(
      {super.key,
      required this.businessImage,
      required this.gmController,
      required this.markers,
      required this.businessLocation});

  @override
  Widget build(BuildContext context) {
    return ListView(
      children: [
        CircleAvatar(
          radius: 100,
          backgroundColor: Colors.transparent,
          backgroundImage:
              businessImage != null ? FileImage(businessImage!) : null,
          child: businessImage == null
              ? ClipOval(
                  child: Image.asset(
                    "assets/images/coffee_business.jpeg",
                    fit: BoxFit.cover,
                  ),
                )
              : null,
        ),
        Container(
          margin: const EdgeInsets.all(20),
          child: Column(
            children: [
              Text(
                textAlign: TextAlign.center,
                "Business Name",
                style: Theme.of(context)
                    .textTheme
                    .headlineSmall
                    ?.copyWith(color: AppColors.primaryBlue, fontSize: 24),
              ),
              const SizedBox(
                height: 20,
              ),
              const Row(
                children: [
                  Text("Phone number:"),
                  Expanded(
                    child: Text(
                      "0593907273",
                      textAlign: TextAlign.right,
                    ),
                  )
                ],
              ),
              const SizedBox(
                height: 20,
              ),
              const Row(
                children: [
                  Text("Category:"),
                  Expanded(
                    child: Text(
                      "Restaurants",
                      textAlign: TextAlign.right,
                    ),
                  )
                ],
              ),
              const SizedBox(
                height: 20,
              ),
              const Row(
                children: [
                  Text("Number of followers:"),
                  Expanded(
                    child: Text(
                      "110",
                      textAlign: TextAlign.right,
                    ),
                  )
                ],
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
                child: Text(
                    "Experience culinary delight at our restaurant, where every dish is crafted with passion and expertise.Experience culinary delight at our restaurant.",
                    textAlign: TextAlign.justify,
                    style: Theme.of(context)
                        .textTheme
                        .bodyMedium!
                        .copyWith(fontSize: 16)),
              ),
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
              BusinessLocation(
                  markers: markers,
                  businessLocation: businessLocation,
                  gmController: gmController),
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
                        onTap: () {},
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
                        onTap: () {},
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
