import 'package:flutter/material.dart';
import 'package:software_grad_project/core/constants/colors.dart';
import 'package:software_grad_project/core/functions/fixedDouble.dart';

class AverageRatesSummaryWidget extends StatelessWidget {
  final double rate1;
  final double rate2;
  final double rate3;

  const AverageRatesSummaryWidget(
      {super.key,
      required this.rate1,
      required this.rate2,
      required this.rate3});

  @override
  Widget build(BuildContext context) {
    return Container(
        padding: const EdgeInsets.only(left: 20, right: 20, bottom: 20),
        color: Colors.white,
        child: Column(
          children: [
            Text(
              "Business Rates Average",
              style: Theme.of(context)
                  .textTheme
                  .headlineSmall
                  ?.copyWith(color: AppColors.primaryDarkBlue, fontSize: 20),
            ),
            const SizedBox(
              height: 10,
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text(
                  "Customer Service Rate ",
                  style: TextStyle(fontSize: 12, color: AppColors.grey),
                ),
                Row(
                  children: [
                    SizedBox(
                      width: 130,
                      child: LinearProgressIndicator(
                        backgroundColor: AppColors.grey,
                        color: AppColors.primaryYellow,
                        value: (rate1 /
                            5.0), // Set the progress value between 0.0 to 1.0
                      ),
                    ),
                    Text(
                      " ${convertToFixedDouble(rate1)}",
                      style:
                          const TextStyle(fontSize: 12, color: AppColors.grey),
                    ),
                  ],
                )
              ],
            ),
            const SizedBox(
              height: 10,
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text(
                  "Value of money Rate ",
                  style: TextStyle(fontSize: 12, color: AppColors.grey),
                ),
                Row(
                  children: [
                    SizedBox(
                      width: 130,
                      child: LinearProgressIndicator(
                        backgroundColor: AppColors.grey,
                        color: AppColors.primaryYellow,
                        value: (rate2 /
                            5.0), // Set the progress value between 0.0 to 1.0
                      ),
                    ),
                    Text(
                      " ${convertToFixedDouble(rate2)}",
                      style:
                          const TextStyle(fontSize: 12, color: AppColors.grey),
                    ),
                  ],
                )
              ],
            ),
            const SizedBox(
              height: 10,
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text(
                  "Product Service Rate",
                  style: TextStyle(fontSize: 12, color: AppColors.grey),
                ),
                Row(
                  children: [
                    SizedBox(
                      width: 130,
                      child: LinearProgressIndicator(
                        backgroundColor: AppColors.grey,
                        color: AppColors.primaryYellow,
                        value: (rate3 /
                            5.0), // Set the progress value between 0.0 to 1.0
                      ),
                    ),
                    Text(
                      " ${convertToFixedDouble(rate3)}",
                      style:
                          const TextStyle(fontSize: 12, color: AppColors.grey),
                    ),
                  ],
                )
              ],
            )
          ],
        ));
  }
}
