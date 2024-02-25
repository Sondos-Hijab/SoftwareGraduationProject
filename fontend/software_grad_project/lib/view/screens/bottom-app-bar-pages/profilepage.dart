import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:software_grad_project/controller/profile_page_controller.dart';
import 'package:software_grad_project/core/constants/colors.dart';
import 'package:software_grad_project/core/constants/imagesassets.dart';
import 'package:software_grad_project/core/services/service.dart';

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
              margin: const EdgeInsets.symmetric(vertical: 20),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  Stack(alignment: Alignment.bottomRight, children: [
                    controller.selectedImage != null
                        ? CircleAvatar(
                            radius: 120,
                            backgroundImage:
                                FileImage(controller.selectedImage!),
                          )
                        : const CircleAvatar(
                            radius: 120,
                            backgroundImage:
                                AssetImage(AppImageAssets.profileImage),
                          ),
                    InkWell(
                      onTap: () {
                        controller.uploadImage();
                        //here i will allow the user to upload a picture
                      },
                      child: const CircleAvatar(
                        radius: 25,
                        backgroundColor: AppColors.primaryGreen,
                        child: Icon(
                          Icons.edit,
                          size: 20,
                          color: Colors.white,
                        ),
                      ),
                    )
                  ]),
                  Padding(
                    padding: const EdgeInsets.all(5.0),
                    child: Text(username!),
                  ),
                  Container(
                    width: double.infinity,
                    padding: const EdgeInsets.all(20.0),
                    child: Container(
                      decoration: BoxDecoration(
                        border: Border.all(
                          color: AppColors.lightGrey,
                        ),
                        borderRadius: BorderRadius.circular(5.0),
                      ),
                      padding: const EdgeInsets.all(10.0),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.stretch,
                        children: [
                          TextFormField(
                            readOnly: !controller.isEditingBio,
                            maxLines: 3,
                            textAlign: TextAlign.center,
                            controller: controller.bioController,
                            style: Theme.of(context).textTheme.bodyMedium,
                            decoration: const InputDecoration(
                              border: InputBorder.none,
                            ),
                          ),
                          const SizedBox(height: 10),
                          ElevatedButton(
                            onPressed: () {
                              controller.editMode();
                            },
                            style: ButtonStyle(
                              backgroundColor: MaterialStateProperty.all<Color>(
                                  AppColors.primaryDarkBlue),
                            ),
                            child: Text(
                              controller.isEditingBio ? "Save Bio" : "Edit Bio",
                              style: const TextStyle(color: Colors.white),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                  Container(
                    padding: const EdgeInsets.symmetric(
                        horizontal: 20, vertical: 10),
                    width: double.infinity,
                    child: Row(children: [
                      Expanded(
                        child: InkWell(
                          onTap: () {
                            controller.goToFeedbackPage();
                          },
                          child: Container(
                            decoration: BoxDecoration(
                              color: AppColors.primaryBlue,
                              borderRadius: BorderRadius.circular(15.0),
                            ),
                            padding: const EdgeInsets.all(20),
                            child: const Column(
                              children: [
                                Icon(
                                  Icons.feedback_outlined,
                                  size: 40,
                                  color: AppColors.appWhite,
                                ),
                                Text(
                                  "Feedback",
                                  style: TextStyle(color: AppColors.appWhite),
                                )
                              ],
                            ),
                          ),
                        ),
                      ),
                      const SizedBox(
                        width: 10,
                      ),
                      Expanded(
                        child: InkWell(
                          onTap: () {
                            controller.goToBusinessesPage();
                          },
                          child: Container(
                            decoration: BoxDecoration(
                              color: AppColors.primaryBlue,
                              borderRadius: BorderRadius.circular(15.0),
                            ),
                            padding: const EdgeInsets.all(20),
                            child: const Column(
                              children: [
                                Icon(
                                  Icons.business_outlined,
                                  size: 40,
                                  color: AppColors.appWhite,
                                ),
                                Text(
                                  "Businesses",
                                  style: TextStyle(color: AppColors.appWhite),
                                )
                              ],
                            ),
                          ),
                        ),
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
