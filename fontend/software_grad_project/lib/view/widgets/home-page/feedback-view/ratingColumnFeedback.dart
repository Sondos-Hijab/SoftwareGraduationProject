import 'package:flutter/material.dart';
import 'package:software_grad_project/core/constants/colors.dart';

class RatingColumnFeedback extends StatelessWidget {
  final String title;
  final int rating;
  const RatingColumnFeedback(
      {super.key, required this.title, required this.rating});

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Text(
            title,
            style: const TextStyle(color: AppColors.primaryGreen, fontSize: 12),
            textAlign: TextAlign.center,
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(
                "$rating/5",
                style: const TextStyle(color: AppColors.grey, fontSize: 12),
              ),
              const SizedBox(width: 4),
              const Icon(
                Icons.star,
                size: 18,
                color: AppColors.primaryYellow,
              ),
            ],
          ),
        ],
      ),
    );
  }
}
