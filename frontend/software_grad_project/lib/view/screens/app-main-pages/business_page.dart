import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:software_grad_project/controller/app-main-pages-controllers/business_page_controller.dart';
import 'package:software_grad_project/core/constants/colors.dart';
import 'package:software_grad_project/view/widgets/business/business_feedback.dart';
import 'package:software_grad_project/view/widgets/business/business_main_info.dart';
import 'package:software_grad_project/view/widgets/business/business_posts.dart';

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
            child: TabBarView(
              children: [
                BusinessMainInfoWidget(
                  businessImage: controller.businessImage,
                  gmController: controller.gmController,
                  businessLocation: controller.businessLocation,
                  markers: controller.markers,
                ),
                const BusinessFeedback(),
                const BusinessPosts()
              ],
            ),
          ),
        ),
      );
    });
  }
}
