import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:software_grad_project/controller/app-main-pages-controllers/user-profile-realted-controllers/profile_page_controller.dart';
import 'package:software_grad_project/core/constants/colors.dart';
import 'package:software_grad_project/core/services/service.dart';
import 'package:software_grad_project/view/widgets/user-profile/bio_container.dart';
import 'package:software_grad_project/view/widgets/user-profile/profile_image_container.dart';
import 'package:software_grad_project/view/widgets/user-profile/profile_quick_link_button.dart';

class ProfilePage extends StatelessWidget {
  const ProfilePage({super.key});

  @override
  Widget build(BuildContext context) {
    final myServices = Get.find<MyServices>();
    String? username = myServices.sharedPreferences.getString("username");

    Get.put(ProfilePageControllerImp());
    return GetBuilder<ProfilePageControllerImp>(builder: (controller) {
      return Scaffold(
        appBar: AppBar(
          centerTitle: true,
          backgroundColor: AppColors.appWhite,
          elevation: 0.0,
          title: Text(
            "My Profile",
            style: Theme.of(context).textTheme.headlineSmall,
          ),
          actions: [
            PopupMenuButton(
                onSelected: (val) {
                  if (val == "changePass") {
                    controller.goToChangePassword();
                  } else {
                    controller.logout();
                  }
                },
                itemBuilder: (context) => [
                      const PopupMenuItem(
                        value: "changePass",
                        child: Text("Change my password"),
                      ),
                      const PopupMenuItem(
                        value: "logout",
                        child: Text("Logout"),
                      ),
                    ])
          ],
        ),
        body: ListView(
          children: [
            Container(
              margin: const EdgeInsets.symmetric(vertical: 10),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  ProfileImageContainer(
                    selectedImageFile: controller.selectedImage,
                    onTap: () {
                      controller.uploadImage();
                    },
                  ),
                  Padding(
                    padding: const EdgeInsets.all(5.0),
                    child: Text(
                      username!,
                      style: const TextStyle(
                          fontSize: 20, color: AppColors.primaryDarkBlue),
                    ),
                  ),
                  BioContainer(
                    bioTextEditingController: controller.bioController!,
                    isEditingBio: controller.isEditingBio,
                    onPressed: () {
                      controller.editMode();
                    },
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
                        onTap: () {
                          controller.goToBusinessesPage();
                        },
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
