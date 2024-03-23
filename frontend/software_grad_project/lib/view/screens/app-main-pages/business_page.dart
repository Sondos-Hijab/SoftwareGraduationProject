import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:software_grad_project/controller/app-main-pages-controllers/business_page_controller.dart';
import 'package:software_grad_project/core/constants/colors.dart';
import 'package:software_grad_project/data/datasource/static/static.dart';
import 'package:software_grad_project/view/widgets/business/business_feedback.dart';
import 'package:software_grad_project/view/widgets/business/business_main_info.dart';
import 'package:software_grad_project/view/widgets/business/business_posts.dart';
import 'package:software_grad_project/view/widgets/followers/business_followers.dart';

class BusinessPage extends StatelessWidget {
  const BusinessPage({super.key});

  @override
  Widget build(BuildContext context) {
    Get.put(BusinessPagesControllerImp());
    return GetBuilder<BusinessPagesControllerImp>(builder: (controller) {
      return DefaultTabController(
        length: 4,
        child: Scaffold(
          key: controller.scaffoldKey,
          appBar: AppBar(
            bottom: TabBar(tabs: [
              Tab(
                child: Text(
                  "Profile",
                  style: Theme.of(context)
                      .textTheme
                      .bodyMedium
                      ?.copyWith(color: Colors.black, fontSize: 14),
                ),
              ),
              Tab(
                child: Text(
                  "Feedback",
                  style: Theme.of(context)
                      .textTheme
                      .bodyMedium
                      ?.copyWith(color: Colors.black, fontSize: 14),
                ),
              ),
              Tab(
                child: Text(
                  "Posts",
                  style: Theme.of(context)
                      .textTheme
                      .bodyMedium
                      ?.copyWith(color: Colors.black, fontSize: 14),
                ),
              ),
              Tab(
                child: Text(
                  "Followers",
                  style: Theme.of(context)
                      .textTheme
                      .bodyMedium
                      ?.copyWith(color: Colors.black, fontSize: 14),
                ),
              )
            ]),
            centerTitle: true,
            backgroundColor: AppColors.appWhite,
            elevation: 0.0,
            title: Text(
              controller.businessName!,
              style: Theme.of(context).textTheme.headlineSmall,
            ),
          ),
          body: Container(
            padding: const EdgeInsets.all(10),
            child: TabBarView(
              children: [
                BusinessMainInfoWidget(
                  businessName: controller.businessName!,
                  businessImage: controller.businessImage!,
                  gmController: controller.gmController,
                  businessLocation:
                      controller.fetchedBusinessInfo!.cameraPosition,
                  markers: controller.fetchedBusinessInfo!.markers,
                  category: controller.fetchedBusinessInfo!.category,
                  description: controller.fetchedBusinessInfo!.description,
                  phoneNumber: controller.fetchedBusinessInfo!.phoneNumber,
                  email: controller.fetchedBusinessInfo!.email,
                  isFollowing: controller.isFollowing,
                  onPressFollowing: () {
                    controller.pressFollowUnfollow();
                    Get.snackbar(
                      'Notification',
                      controller.isFollowing
                          ? 'You followed this business!'
                          : 'You unfollowed this business!',
                      snackPosition: SnackPosition.BOTTOM,
                      duration: const Duration(seconds: 2),
                    );
                  },
                  onTapAddFeedback: () {
                    controller.goToAddFeedbackPage();
                  },
                ),
                BusinessFeedback(
                  businessFeedback: controller.businessFeedback,
                ),
                BusinessPosts(
                  businessImage: controller.businessImage,
                  businessesPosts: controller.businessesPosts,
                ),
                BusinessFollowers(
                  followers: followers,
                )
              ],
            ),
          ),
        ),
      );
    });
  }
}


//recieve the images as controller.businessesPosts[2].picture!