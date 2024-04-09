import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:software_grad_project/controller/app-main-pages-controllers/user-profile-realted-controllers/user_followed_businesses_page_controller.dart';
import 'package:software_grad_project/core/constants/colors.dart';
import 'package:software_grad_project/view/widgets/home-page/business-view/business_view.dart';

class OtherUserFollowedBusinessesPage extends StatelessWidget {
  const OtherUserFollowedBusinessesPage({super.key});

  @override
  Widget build(BuildContext context) {
    Get.put(FollowedbusinessesPageControllerImp());
    return Scaffold(
        appBar: AppBar(
          centerTitle: true,
          backgroundColor: AppColors.appWhite,
          elevation: 0.0,
          title: Text(
            "Followed Businesses",
            style: Theme.of(context).textTheme.headlineSmall,
          ),
        ),
        body: GetBuilder<FollowedbusinessesPageControllerImp>(
            builder: (controller) {
          return ListView(
            children: [
              ...List.generate(
                  controller.followingBusinesses!.length,
                  (index) => BusinessViewItem(
                        businessName:
                            controller.followingBusinesses![index].businessName,
                        picture: controller
                            .followingBusinesses![index].businessImage,
                        onTap: () {
                          controller.goToBusinessPage(
                              controller
                                  .followingBusinesses![index].businessName!,
                              controller
                                  .followingBusinesses![index].businessImage!);
                        },
                      ))
            ],
          );
        }));
  }
}
