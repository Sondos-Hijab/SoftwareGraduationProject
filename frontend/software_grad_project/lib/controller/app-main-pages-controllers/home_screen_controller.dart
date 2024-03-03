import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:software_grad_project/view/screens/app-main-pages/home_page.dart';
import 'package:software_grad_project/view/screens/app-main-pages/chatting-system-pages/messages_page.dart';
import 'package:software_grad_project/view/screens/app-main-pages/user-profile-related-pages/profile_page.dart';
import 'package:software_grad_project/view/screens/app-main-pages/search_page.dart';

abstract class HomeScreenController extends GetxController {
  changePage(int pageIndex);
}

class HomeScreenControllerImp extends HomeScreenController {
  int currentPage = 3;

  List<Widget> listPage = [
    const SearchPage(),
    const MessagesPage(),
    const HomePage(),
    const ProfilePage()
  ];
  @override
  changePage(int pageIndex) {
    currentPage = pageIndex;
    update();
  }
}
