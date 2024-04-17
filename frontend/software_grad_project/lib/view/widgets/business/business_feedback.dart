import 'package:flutter/material.dart';
import 'package:software_grad_project/core/constants/colors.dart';
import 'package:software_grad_project/data/model/fetched_feedback_model.dart';
import 'package:software_grad_project/view/widgets/business/feedback-view/main_feedback.dart';

class BusinessFeedback extends StatelessWidget {
  final List<FetchedFeedbackModel>? businessFeedback;
  final void Function(String username) goToUserPage;
  final void Function(String sortType) setFeedbackSortType;
  final String selectedFeedbackSortType;
  final void Function() filterFeedbackBasedOnUsername;
  final TextEditingController searchController;
  const BusinessFeedback(
      {super.key,
      required this.businessFeedback,
      required this.goToUserPage,
      required this.setFeedbackSortType,
      required this.selectedFeedbackSortType,
      required this.filterFeedbackBasedOnUsername,
      required this.searchController});

  @override
  Widget build(BuildContext context) {
    return ListView(
      children: [
        Container(
          margin: const EdgeInsets.all(20),
          child: TextFormField(
            controller: searchController,
            decoration: InputDecoration(
              hintText: "Search",
              hintStyle:
                  const TextStyle(fontSize: 14, color: AppColors.lightGrey),
              floatingLabelBehavior: FloatingLabelBehavior.always,
              contentPadding:
                  const EdgeInsets.symmetric(horizontal: 30, vertical: 5),
              label: Container(
                margin: const EdgeInsets.symmetric(horizontal: 10),
                child: const Text(
                  "Enter a username",
                  style: TextStyle(color: AppColors.lightGrey),
                ),
              ),
              suffixIcon: InkWell(
                onTap: () {
                  filterFeedbackBasedOnUsername();
                },
                child: const Icon(Icons.search_rounded),
              ),
              suffixIconColor: AppColors.lightGrey,
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(5),
              ),
            ),
          ),
        ),
        Container(
          margin: const EdgeInsets.symmetric(horizontal: 20),
          decoration: BoxDecoration(
            border: Border.all(
              color: AppColors.lightGrey,
            ),
            borderRadius: BorderRadius.circular(5),
          ),
          child: DropdownButton<String>(
            padding: const EdgeInsets.symmetric(horizontal: 20),
            value: selectedFeedbackSortType,
            onChanged: (String? value) {
              setFeedbackSortType(value!);
            },
            isExpanded: true, // Make the dropdown button full width
            items: <String>['Newest to oldest', 'Oldest to newest']
                .map((String value) {
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
        ...List.generate(
          businessFeedback!.length,
          (index) => MainFeedbackWidget(
            me: false,
            userImage: businessFeedback![index].userProfilePicture,
            username: businessFeedback![index].userName!,
            feedbackImage: businessFeedback![index].feedbackImage,
            busineessName: businessFeedback![index].businessName!,
            customerServiceRating: businessFeedback![index].customeServiceRate!,
            valueOfMoneyRating: businessFeedback![index].valueOfMoneyRate!,
            productQualityRating: businessFeedback![index].productQualityRate!,
            feedbackText: businessFeedback![index].description!,
            createdAt: businessFeedback![index].createdAt!,
            goToUserPage: goToUserPage,
          ),
        ),
      ],
    );
  }
}
