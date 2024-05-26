import 'dart:typed_data';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:software_grad_project/core/constants/colors.dart';
import 'package:software_grad_project/core/functions/format_number_created_at.dart';

class NotificationPost extends StatelessWidget {
  final Uint8List businessProfileImage;
  final String businessName;
  final Uint8List picture;
  final String description;
  final String createdAt;

  const NotificationPost({
    Key? key,
    required this.businessProfileImage,
    required this.businessName,
    required this.picture,
    required this.description,
    required this.createdAt,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    DateTime dateTime = DateTime.parse(createdAt);
    String date =
        '${dateTime.year}-${formatNumber(dateTime.month)}-${formatNumber(dateTime.day)}';
    String time =
        '${formatNumber(dateTime.hour)}:${formatNumber(dateTime.minute)}:${formatNumber(dateTime.second)}';

    return SingleChildScrollView(
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 20.0, vertical: 10.0),
        child: Column(
          children: [
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20.0),
              child: Row(
                children: [
                  ClipRRect(
                    borderRadius: BorderRadius.circular(12), // Circular image
                    child: Image.memory(
                      businessProfileImage,
                      width: 50,
                      height: 50,
                      fit: BoxFit.cover,
                    ),
                  ),
                  const SizedBox(
                      width: 8), // Add some space between image and name
                  Text(
                    businessName,
                    style: const TextStyle(
                      fontWeight: FontWeight.bold,
                      fontSize: 18,
                      color: AppColors.primaryBlue,
                    ),
                  ),
                ],
              ),
            ),
            // Business Profile Image and Name
            const SizedBox(height: 10.0),
            // Post Picture
            Padding(
              padding: EdgeInsets.symmetric(horizontal: 20.0),
              child: ClipRRect(
                borderRadius: BorderRadius.circular(12),
                child: Image.memory(
                  picture,
                  height: 400,
                  fit: BoxFit.cover,
                ),
              ),
            ),
            const SizedBox(height: 10),
            // Post Description
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20.0),
              child: Text(
                description.trim(),
                style: const TextStyle(
                  fontSize: 16,
                ),
              ),
            ),
            const SizedBox(height: 10),
            // Post Created Date
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20.0),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    date,
                    style: const TextStyle(
                        fontSize: 16, color: AppColors.primaryGreen),
                  ),
                  Text(
                    time,
                    style: const TextStyle(
                        fontSize: 16, color: AppColors.primaryGreen),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
