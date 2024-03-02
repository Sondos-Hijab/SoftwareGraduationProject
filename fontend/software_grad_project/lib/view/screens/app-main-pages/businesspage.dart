import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:get/get.dart';
import 'package:software_grad_project/controller/app-main-pages-controllers/business-page-controller.dart';
import 'package:software_grad_project/core/constants/colors.dart';
import 'package:software_grad_project/core/constants/imagesassets.dart';
import 'package:software_grad_project/data/datasource/static/static.dart';
import 'package:software_grad_project/view/widgets/home-page/feedback-view/main-feedback.dart';

class BusinessPage extends StatelessWidget {
  const BusinessPage({super.key});

  @override
  Widget build(BuildContext context) {
    Get.put(BusinessPagesControllerImp());
    return GetBuilder<BusinessPagesControllerImp>(builder: (controller) {
      return DefaultTabController(
        length: 3,
        child: Scaffold(
          key: controller.scaffoldKey,
          appBar: AppBar(
            bottom: TabBar(tabs: [
              Tab(
                child: Text(
                  "Profile Page",
                  style: Theme.of(context)
                      .textTheme
                      .bodyMedium
                      ?.copyWith(color: Colors.black),
                ),
              ),
              Tab(
                child: Text(
                  "Feedback",
                  style: Theme.of(context)
                      .textTheme
                      .bodyMedium
                      ?.copyWith(color: Colors.black),
                ),
              ),
              Tab(
                child: Text(
                  "Posts",
                  style: Theme.of(context)
                      .textTheme
                      .bodyMedium
                      ?.copyWith(color: Colors.black),
                ),
              )
            ]),
            centerTitle: true,
            backgroundColor: AppColors.appWhite,
            elevation: 0.0,
            title: Text(
              "Business Page",
              style: Theme.of(context).textTheme.headlineSmall,
            ),
          ),
          body: Container(
              padding: const EdgeInsets.all(10),
              child: TabBarView(children: [
                ListView(
                  children: [
                    Container(
                      width: 160,
                      height: 160,
                      decoration: BoxDecoration(
                        shape: BoxShape.circle,
                        border: Border.all(
                          color: Colors.grey.shade200,
                          width: 2,
                        ),
                      ),
                      child: Center(
                        child: controller.businessImage != null
                            ? CircleAvatar(
                                radius: 80,
                                backgroundImage:
                                    FileImage(controller.businessImage!),
                              )
                            : const Icon(
                                Icons.business,
                                size: 80,
                                color: Colors.black,
                              ),
                      ),
                    ),
                    Container(
                      margin: EdgeInsets.all(20),
                      child: Column(
                        children: [
                          Text(
                            textAlign: TextAlign.center,
                            "Business Name",
                            style: Theme.of(context)
                                .textTheme
                                .headlineSmall
                                ?.copyWith(
                                    color: AppColors.primaryBlue, fontSize: 24),
                          ),
                          SizedBox(
                            height: 20,
                          ),
                          Row(
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
                          SizedBox(
                            height: 20,
                          ),
                          Row(
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
                          SizedBox(
                            height: 20,
                          ),
                          Row(
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
                          SizedBox(
                            height: 20,
                          ),
                          Text(
                            textAlign: TextAlign.center,
                            "Description",
                            style: Theme.of(context)
                                .textTheme
                                .headlineSmall
                                ?.copyWith(
                                    color: AppColors.primaryDarkBlue,
                                    fontSize: 20),
                          ),
                          Container(
                            margin: EdgeInsets.symmetric(vertical: 20),
                            padding: EdgeInsets.all(10),
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
                                ?.copyWith(
                                    color: AppColors.primaryDarkBlue,
                                    fontSize: 20),
                          ),
                        ],
                      ),
                    )
                  ],
                ),
                ListView(
                  children: [
                    ...List.generate(
                      feedbackData.length,
                      (index) => MainFeedbackWidget(
                        userImage: feedbackData[index].userProfileImage,
                        username: feedbackData[index].username!,
                        feedbackImage: feedbackData[index].feedbackImage,
                        busineessName: feedbackData[index].businessName!,
                        customerServiceRating:
                            feedbackData[index].customerService!,
                        valueOfMoneyRating: feedbackData[index].valueOfMoney!,
                        productQualityRating:
                            feedbackData[index].productQuality!,
                        feedbackText: feedbackData[index].feedbackText!,
                      ),
                    ),
                  ],
                ),
                Text("Posts")
              ])),
        ),
      );
    });
  }
}
