import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:software_grad_project/controller/app-main-pages-controllers/other-user-controllers/other_user_profile_controller.dart';
import 'package:software_grad_project/core/constants/colors.dart';
import 'package:software_grad_project/view/widgets/user-profile/bio_container.dart';
import 'package:software_grad_project/view/widgets/user-profile/profile_image_container.dart';
import 'package:software_grad_project/view/widgets/user-profile/profile_quick_link_button.dart';

class OtherUserProfilePage extends StatelessWidget {
  const OtherUserProfilePage({super.key});

  @override
  Widget build(BuildContext context) {
    Get.put(OtherUserProfilePageControllerImp());
    return GetBuilder<OtherUserProfilePageControllerImp>(builder: (controller) {
      return Scaffold(
        appBar: AppBar(
          centerTitle: true,
          backgroundColor: AppColors.appWhite,
          elevation: 0.0,
          title: Text(
            "User Profile",
            style: Theme.of(context).textTheme.headlineSmall,
          ),
        ),
        body: ListView(
          children: [
            Container(
              margin: const EdgeInsets.symmetric(vertical: 10),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  ProfileImageContainer(
                      me: false,
                      otherUserProfileImage: controller.otherUserProfileImage),
                  Padding(
                    padding: const EdgeInsets.all(5.0),
                    child: Text(
                      controller.username!,
                      style: const TextStyle(
                          fontSize: 20, color: AppColors.primaryDarkBlue),
                    ),
                  ),
                  BioContainer(
                    me: false,
                    bioTextEditingController: controller.bioController!,
                  ),
                  Container(
                    padding: const EdgeInsets.symmetric(
                        horizontal: 20, vertical: 10),
                    width: double.infinity,
                    child: Row(children: [
                      QuickLinkButton(
                        internalText: "Feedback",
                        iconData: Icons.feedback_outlined,
                        onTap: () {
                          controller.goToFeedbackPage();
                        },
                      ),
                      const SizedBox(
                        width: 10,
                      ),
                      QuickLinkButton(
                        internalText: "Businesses",
                        iconData: Icons.business_outlined,
                        onTap: () {},
                      ),
                    ]),
                  ),
                ],
              ),
            ),
          ],
        ),
      );
    });
  }
}
