import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:software_grad_project/controller/app-main-pages-controllers/home_screen_controller.dart';
import 'package:software_grad_project/core/constants/colors.dart';
import 'package:software_grad_project/view/widgets/home-screen/custom_buttom_app_bar_item.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    Get.put(HomeScreenControllerImp());

    return GetBuilder<HomeScreenControllerImp>(builder: (controller) {
      return Scaffold(
        bottomNavigationBar: BottomAppBar(
          child: Row(
            children: List.generate(
              controller.listPage.length,
              (indexPage) => buildBottomNavBarItem(
                indexPage,
                controller.currentPage,
                controller.changePage,
              ),
            ),
          ),
        ),
        body: controller.listPage.elementAt(controller.currentPage),
      );
    });
  }

  Widget buildBottomNavBarItem(
    int indexPage,
    int currentPage,
    void Function(int) changePage,
  ) {
    final List<IconData> icons = [
      Icons.search_rounded,
      Icons.message_outlined,
      Icons.home_outlined,
      Icons.person_2_outlined,
    ];

    final List<String> titles = [
      "Search",
      "Messages",
      "Home",
      "Profile",
    ];

    return CustomButtomAppBarItem(
      textButton: titles[indexPage],
      iconData: icons[indexPage],
      onPressed: () {
        changePage(indexPage);
      },
      color: indexPage == currentPage ? AppColors.primaryBlue : AppColors.grey,
    );
  }
}
