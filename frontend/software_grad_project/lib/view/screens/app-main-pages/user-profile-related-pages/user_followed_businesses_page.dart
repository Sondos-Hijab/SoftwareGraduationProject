import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:software_grad_project/controller/app-main-pages-controllers/other-user-controllers/other_user_followed_businesses_controller.dart';
import 'package:software_grad_project/core/constants/colors.dart';
import 'package:software_grad_project/view/widgets/home-page/business-view/business_view.dart';

class FollowedBusinessesPage extends StatelessWidget {
  const FollowedBusinessesPage({super.key});

  @override
  Widget build(BuildContext context) {
    Get.put(OtherUserFollowedbusinessesPageControllerImp());
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
        body: GetBuilder<OtherUserFollowedbusinessesPageControllerImp>(
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
