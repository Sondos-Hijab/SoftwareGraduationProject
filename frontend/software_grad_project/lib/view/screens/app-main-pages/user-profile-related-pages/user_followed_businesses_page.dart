import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:software_grad_project/controller/app-main-pages-controllers/user-profile-realted-controllers/user_followed_businesses_page_controller.dart';
import 'package:software_grad_project/core/constants/colors.dart';
import 'package:software_grad_project/data/datasource/static/static.dart';
import 'package:software_grad_project/view/widgets/home-page/business-view/business_view.dart';

class FollowedBusinessesPage extends StatelessWidget {
  const FollowedBusinessesPage({super.key});

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
              // ...List.generate(
              //     businessViewList.length,
              //     (index) => BusinessViewItem(
              //           index: index,
              //           onTap: () {
              //             controller.goToBusinessPage(
              //                 businessViewList[index].businessName!);
              //           },
              //         ))
            ],
          );
        }));
  }
}
